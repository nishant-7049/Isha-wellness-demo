const catchAsyncError = require("../middleware/catchAsyncFunc");
const Session = require("../models/session");
const Treatment = require("../models/treatment");
const Booking = require("../models/booking");
const User = require("../models/user");
const sendSms = require("../utils/sendSms");
const crypto = require("crypto");

exports.createSession = catchAsyncError(async (req, res, next) => {
  req.body.createdAt = new Date(Date.now());
  const user = await User.findById(req.user._id);
  user.rating =
    (parseInt(req.body.questions.facilitatorRating) + user.rating) / 2;
  await user.save();
  const treatment = await Treatment.findById(req.body.treatmentId);
  const booking = await Booking.findById(treatment.booking);
  booking.packageAndDate.dateAndTime =
    booking.packageAndDate.dateAndTime.getTime() + 1 * 24 * 60 * 60 * 1000;
  let message = `IWC, Your session completed successfully. Check below data \n Session Starting time: ${req.body.startedAt}\n Session Ending time: ${req.body.endedAt} \nSession Duration: ${req.body.timeSpent.min}m ${req.body.timeSpent.sec}s \n Performed ${treatment.exercises.length} exercises. \n Your answers were \n`;

  for (let reply in req.body.questions) {
    message = message + `${reply}: ${req.body.questions[reply]}\n`;
  }
  message =
    message +
    "For any queries, complaints or feedback contact at +91-xxx-xxx-xxxx. \n Thank you for choosing us.";
  await sendSms({
    body: message,
    to: booking.personal.phone,
  });
  booking.sessions--;
  await booking.save();
  const session = await Session.create(req.body);
  res.status(200).json({
    success: true,
    session,
  });
});

exports.getSessionLengthForAUser = catchAsyncError(async (req, res, next) => {
  const booking = await Booking.findById(req.params.bookingId);
  const bookings = await Booking.find({
    "personal.name": booking.personal.name,
    "personal.phone": booking.personal.phone,
  });

  const treats = [];
  const sessions = [];
  for (let i = 0; i < bookings.length; i++) {
    const treat = await Treatment.find({ booking: bookings[i]._id });
    if (treat[0]) {
      for (let t of treat) {
        treats.push(t);
      }
    }
  }
  for (let t of treats) {
    const session = await Session.find({ treatmentId: t._id });
    if (session[0]) {
      for (let s of session) {
        sessions.push(s);
      }
    }
  }
  res.status(200).json({ success: true, sessions });
});

exports.getAllSessions = catchAsyncError(async (req, res, next) => {
  const sessions = await Session.find();
  res.status(200).json({
    success: true,
    sessions,
  });
});

exports.getLatestSession = async () => {
  const result = await Booking.aggregate([
    {
      $lookup: {
        from: "treatments",
        localField: "_id",
        foreignField: "booking",
        as: "treatments",
      },
    },
    {
      $unwind: "$treatments",
    },
    {
      $sort: { "treatments.createdAt": -1 },
    },
    {
      $lookup: {
        from: "sessions",
        localField: "treatments._id",
        foreignField: "treatmentId",
        as: "session",
      },
    },
    {
      $unwind: { path: "$session", preserveNullAndEmptyArrays: true },
    },
    {
      $sort: {
        "session.createdAt": -1,
      },
    },
    {
      $group: {
        _id: {
          name: "$personal.name",
          phone: "$personal.phone",
        },
        latestTreatment: { $first: "$treatments.createdAt" },
        latestSession: { $first: "$session.createdAt" },
        sessionId: { $first: "$session._id" },
        isOutcomeFormSent: { $first: "$session.isOutcomeFormSent" },
      },
    },
    {
      $project: {
        _id: 0,
        name: "$_id.name",
        phone: "$_id.phone",
        latestTreatment: "$latestTreatment",
        latestSession: "$latestSession",
        sessionId: "$sessionId",
        isOutcomeFormSent: "$isOutcomeFormSent",
      },
    },
  ]);
  return result;
};
exports.getLatestSession2 = async (req, res, next) => {
  const result = await Booking.aggregate([
    {
      $lookup: {
        from: "treatments",
        localField: "_id",
        foreignField: "booking",
        as: "treatments",
      },
    },
    {
      $unwind: "$treatments",
    },
    {
      $sort: { "treatments.createdAt": -1 },
    },
    {
      $lookup: {
        from: "sessions",
        localField: "treatments._id",
        foreignField: "treatmentId",
        as: "session",
      },
    },
    {
      $unwind: { path: "$session", preserveNullAndEmptyArrays: true },
    },
    {
      $sort: {
        "session.createdAt": -1,
      },
    },
    {
      $group: {
        _id: {
          name: "$personal.name",
          phone: "$personal.phone",
        },
        latestTreatment: { $first: "$treatments.createdAt" },
        latestSession: { $first: "$session.createdAt" },
        sessionId: { $first: "$session._id" },
        isOutcomeFormSent: { $first: "$session.isOutcomeFormSent" },
      },
    },
    {
      $project: {
        _id: 0,
        name: "$_id.name",
        phone: "$_id.phone",
        latestTreatment: "$latestTreatment",
        latestSession: "$latestSession",
        sessionId: "$sessionId",
        isOutcomeFormSent: "$isOutcomeFormSent",
      },
    },
  ]);
  res.status(200).json({
    success: true,
    result,
  });
};

exports.setOutcomeReason = catchAsyncError(async (req, res, next) => {
  const outcomeToken = crypto
    .createHash("sha256")
    .update(req.params.outcomeToken)
    .digest("hex");
  const session = await Session.findOne({ outcomeToken });
  if (!session) {
    return next(new ErrorHandler("Token is wrong or expired.", 403));
  }
  session.outcome.outcomeReason = req.body.outcomeReason;
  session.outcome.filledBy = "Patient";
  session.outcomeToken = undefined;
  await session.save();
  res.status(200).json({
    success: true,
    message: "session request updated successfully.",
  });
});

exports.setOutcomeReasonForStaff = catchAsyncError(async (req, res, next) => {
  const session = await Session.findById(req.params.sessionId);
  if (!session) {
    return next(new ErrorHandler("Session Id does not match.", 403));
  }
  session.outcome.outcomeReason = req.body.outcomeReason;
  session.outcome.filledBy = req.user.role;
  await session.save();
  const booking = await Booking.aggregate([
    {
      $lookup: {
        from: "treatments",
        localField: "_id",
        foreignField: "booking",
        as: "treatments",
      },
    },
    {
      $unwind: "$treatments",
    },
    {
      $lookup: {
        from: "sessions",
        localField: "treatments._id",
        foreignField: "treatmentId",
        as: "treatmentSessions",
      },
    },
    { $unwind: "$treatmentSessions" },
  ]);
  const filteredBooking = booking.filter(
    (b) => b.treatmentSessions._id == req.params.sessionId
  );
  await sendSms({
    body:
      "From IWC, \n Your Dropout form has been submitted with Dropout reason: " +
      req.body.reason,
    to: filteredBooking[0].personal.phone,
  });
  res.status(200).json({
    success: true,
    message: "session request updated successfully.",
  });
});
