const catchAsyncError = require("../middleware/catchAsyncFunc");
const Booking = require("../models/booking");

exports.getPatientMeterData = catchAsyncError(async (req, res, next) => {
  const patientsData = await Booking.aggregate([
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
      $unwind: "$session",
    },
    {
      $sort: { "session.createdAt": -1 },
    },
    {
      $group: {
        _id: {
          name: "$personal.name",
          phone: "$personal.phone",
        },
        cluster: { $last: "$personal.city" },
        location: { $last: "$personal.location" },
        problem: { $last: "$complaints.problem" },
        sessions: { $push: "$session" },
      },
    },
    {
      $project: {
        _id: 0,
        name: "$_id.name",
        phone: "$_id.phone",
        cluster: "$cluster",
        location: "$location",
        problem: "$problem",
        sessions: "$sessions",
      },
    },
  ]);
  res.status(200).json({
    success: true,
    patientsData,
  });
});

exports.getCentreData = catchAsyncError(async (req, res, next) => {
  const bookings = await Booking.aggregate([
    {
      $lookup: {
        from: "treatments",
        localField: "_id",
        foreignField: "booking",
        as: "treatments",
      },
    },
    {
      $sort: { "treatments.createdAt": -1 },
    },
    {
      $lookup: {
        from: "sessions",
        localField: "treatments._id",
        foreignField: "treatmentId",
        as: "treatmentSessions",
      },
    },
    {
      $sort: { "treatmentSessions.createdAt": -1 },
    },
    {
      $sort: { createdAt: -1 },
    },
    {
      $project: {
        _id: "$_id",
        createdAt: "$createdAt",
        paymentType: "$paymentType",
        payment: "$payment",
        sessions: "$treatmentSessions",
        price: "$price",
        location: "$personal.location",
        cluster: "$personal.city",
      },
    },
  ]);
  res.status(200).json({
    success: true,
    bookings,
  });
});

exports.getTherapistPerformance = catchAsyncError(async (req, res, next) => {
  const bookings = await Booking.aggregate([
    {
      $match: {
        assignTherapist: { $eq: req.user._id },
      },
    },
    {
      $lookup: {
        from: "treatments",
        localField: "_id",
        foreignField: "booking",
        as: "treatments",
      },
    },
    { $sort: { "treatments.createdAt": -1 } },
    {
      $lookup: {
        from: "sessions",
        localField: "treatments._id",
        foreignField: "treatmentId",
        as: "treatmentSessions",
      },
    },
    {
      $sort: { "treatmentSessions.createdAt": -1 },
    },
    {
      $project: {
        _id: "$_id",
        sessions: "$treatmentSessions",
        problem: "$complaints.problem",
      },
    },
  ]);
  res.status(200).json({
    success: true,
    bookings,
  });
});
exports.getFacilitatorPerformance = catchAsyncError(async (req, res, next) => {
  const bookings = await Booking.aggregate([
    {
      $match: {
        assignFacilitator: { $eq: req.user._id },
      },
    },
    {
      $lookup: {
        from: "treatments",
        localField: "_id",
        foreignField: "booking",
        as: "treatments",
      },
    },
    { $sort: { "treatments.createdAt": -1 } },
    {
      $lookup: {
        from: "sessions",
        localField: "treatments._id",
        foreignField: "treatmentId",
        as: "treatmentSessions",
      },
    },
    {
      $sort: { "treatmentSessions.createdAt": -1 },
    },
    {
      $project: {
        _id: "$_id",
        sessions: "$treatmentSessions",
        problem: "$complaints.problem",
      },
    },
  ]);
  res.status(200).json({
    success: true,
    bookings,
  });
});

exports.getDropoutsForTherapist = catchAsyncError(async (req, res, next) => {
  const bookings = await Booking.aggregate([
    {
      $match: {
        assignTherapist: { $eq: req.user._id },
      },
    },
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
        problem: { $first: "$complaints.problem" },
        latestTreatment: { $first: "$treatments.createdAt" },
        latestSession: { $first: "$session" },
      },
    },
    {
      $project: {
        _id: 0,
        name: "$_id.name",
        phone: "$_id.phone",
        problem: "$problem",
        latestSession: "$latestSession",
      },
    },
  ]);
  res.status(200).json({
    success: true,
    bookings,
  });
});
exports.getDropoutsForFacilitator = catchAsyncError(async (req, res, next) => {
  const bookings = await Booking.aggregate([
    {
      $match: {
        assignFacilitator: { $eq: req.user._id },
      },
    },
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
        problem: { $first: "$complaints.problem" },
        latestTreatment: { $first: "$treatments.createdAt" },
        latestSession: { $first: "$session" },
      },
    },
    {
      $project: {
        _id: 0,
        name: "$_id.name",
        phone: "$_id.phone",
        problem: "$problem",
        latestSession: "$latestSession",
      },
    },
  ]);
  res.status(200).json({
    success: true,
    bookings,
  });
});

exports.getTherapistAllSessions = catchAsyncError(async (req, res, next) => {
  const sessions = await Booking.aggregate([
    {
      $match: {
        assignTherapist: { $eq: req.user._id },
      },
    },
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
    {
      $unwind: "$treatmentSessions",
    },
    {
      $group: {
        _id: {
          name: "$personal.name",
          phone: "$personal.phone",
        },
        sessions: { $push: "$treatmentSessions" },
      },
    },
    {
      $project: {
        _id: 0,
        name: "$_id.name",
        phone: "$_id.phone",
        sessions: "$sessions",
      },
    },
  ]);
  res.status(200).json({
    success: true,
    sessions,
  });
});
exports.getFacilitatorAllSessions = catchAsyncError(async (req, res, next) => {
  const sessions = await Booking.aggregate([
    {
      $match: {
        assignFacilitator: { $eq: req.user._id },
      },
    },
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
    {
      $unwind: "$treatmentSessions",
    },
    {
      $group: {
        _id: {
          name: "$personal.name",
          phone: "$personal.phone",
        },
        sessions: { $push: "$treatmentSessions" },
      },
    },
    {
      $project: {
        _id: 0,
        name: "$_id.name",
        phone: "$_id.phone",
        sessions: "$sessions",
      },
    },
  ]);
  res.status(200).json({
    success: true,
    sessions,
  });
});
