const Booking = require("../models/booking");
const Package = require("../models/package");
const Enquiry = require("../models/enquiry");
const catchAsyncError = require("../middleware/catchAsyncFunc");
const errorHandler = require("../utils/ErrorHandler");
const ErrorHandler = require("../utils/ErrorHandler");
const user = require("../models/user");
const mongoose = require("mongoose");

exports.createBooking = catchAsyncError(async (req, res, next) => {
  req.body.createdAt = new Date(Date.now());
  const pac = await Package.findById(req.body.packageAndDate.package);
  if (!pac) {
    return next(
      new ErrorHandler("Package with given id is not available.", 404)
    );
  }
  req.body.price = pac.price;
  req.body.paymentType = pac.paymentType;
  const validTill =
    req.body.createdAt.getTime() + pac.days * 24 * 60 * 60 * 1000;
  req.body.validTill = new Date(validTill);

  console.log("Searching Enquiry.");
  await Enquiry.findOneAndDelete({
    name: req.body.personal.name,
    phone: req.body.personal.phone,
  });
  console.log("enquiry deleted.");
  const booking = await Booking.create(req.body);
  res.status(200).json({
    success: true,
    booking,
  });
});

exports.getClusterBooking = catchAsyncError(async (req, res, next) => {
  const { keyword, page, limit } = req.query;
  let bookingsCount = await Booking.find({
    "personal.city": { $in: req.user.cluster },
    "personal.name": { $regex: keyword, $options: "i" },
  }).count();
  console.log(req.query);
  const bookings = await Booking.find(
    {
      "personal.city": { $in: req.user.cluster },
      "personal.name": { $regex: keyword, $options: "i" },
    },
    {},
    { sort: { createdAt: -1 } }
  )
    .limit(limit)
    .skip((page - 1) * limit);

  res.status(200).json({
    success: true,
    bookings,
    bookingsCount,
  });
});

exports.getBookingDetail = catchAsyncError(async (req, res, next) => {
  let booking = await Booking.findById(req.params.id);
  if (!booking) {
    return next(new ErrorHandler("Booking with given id is not found.", 404));
  }
  booking = await Booking.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(req.params.id),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "bookedBy",
        foreignField: "_id",
        as: "bookedBy",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "assignTherapist",
        foreignField: "_id",
        as: "assignTherapist",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "assignFacilitator",
        foreignField: "_id",
        as: "assignFacilitator",
      },
    },
    {
      $lookup: {
        from: "payments",
        localField: "payment",
        foreignField: "_id",
        as: "payment",
      },
    },
  ]);
  res.status(200).json({
    success: true,
    booking: booking[0],
  });
});

exports.getBookingDetailForUser = catchAsyncError(async (req, res, next) => {
  let booking = await Booking.findById(req.params.id);
  if (!booking) {
    return next(new ErrorHandler("Booking with given id is not found.", 404));
  }
  if (booking.bookedBy != req.user.id) {
    return next(
      new ErrorHandler("You are not authorized to access this data.", 403)
    );
  }
  booking = await Booking.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(req.params.id),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "bookedBy",
        foreignField: "_id",
        as: "bookedBy",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "assignTherapist",
        foreignField: "_id",
        as: "assignTherapist",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "assignFacilitator",
        foreignField: "_id",
        as: "assignFacilitator",
      },
    },
    {
      $lookup: {
        from: "payments",
        localField: "payment",
        foreignField: "_id",
        as: "payment",
      },
    },
  ]);
  console.log(booking);
  res.status(200).json({
    success: true,
    booking,
  });
});

exports.deleteBooking = catchAsyncError(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    return next(new errorHandler("booking not found", 404));
  }
  await Booking.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    message: "Booking deleted successfully.",
  });
});

exports.setTherapist = catchAsyncError(async (req, res, next) => {
  const booking = await Booking.findById(req.body.bookingID);
  if (!booking) {
    return next(new errorHandler("booking not found", 404));
  }
  booking.assignTherapist = req.body.userID;
  booking.status = "Staff Assigned / Creating Treatment... ";

  await booking.save();
  res.status(200).json({
    success: true,
    booking,
  });
});

exports.setFacilitator = catchAsyncError(async (req, res, next) => {
  const booking = await Booking.findById(req.body.bookingID);
  if (!booking) {
    return next(new errorHandler("booking not found", 404));
  }
  booking.assignFacilitator = req.body.userID;
  await booking.save();
  res.status(200).json({
    success: true,
    booking,
  });
});

exports.getBookingsForTherapist = catchAsyncError(async (req, res, next) => {
  const { keyword, page, limit } = req.query;
  const bookingsCount = await Booking.find({
    assignTherapist: req.user.id,
    "personal.name": {
      $regex: keyword,
      $options: "i",
    },
  }).count();
  const bookings = await Booking.find(
    {
      assignTherapist: req.user.id,
      "personal.name": {
        $regex: keyword,
        $options: "i",
      },
    },
    {},
    { sort: { createdAt: -1 } }
  )
    .limit(limit)
    .skip(limit * (page - 1));
  res.status(200).json({
    success: true,
    bookings,
    bookingsCount,
  });
});
exports.getBookingsForFacilitator = catchAsyncError(async (req, res, next) => {
  const { keyword, page, limit } = req.query;
  const bookingsCount = await Booking.find({
    assignFacilitator: req.user.id,
    "personal.name": {
      $regex: keyword,
      $options: "i",
    },
  }).count();
  const bookings = await Booking.find(
    {
      assignFacilitator: req.user.id,
      "personal.name": {
        $regex: keyword,
        $options: "i",
      },
    },
    {},
    { sort: { createdAt: -1 } }
  )
    .limit(limit)
    .skip(limit * (page - 1));
  res.status(200).json({
    success: true,
    bookings,
    bookingsCount,
  });
});

exports.setBookingStatus = catchAsyncError(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    return next(new ErrorHandler("Booking with id not found.", 404));
  }
  booking.status = req.body.status;
  await booking.save();
  res.status(200).json({
    success: true,
    booking,
  });
});

exports.getUserBookings = catchAsyncError(async (req, res, next) => {
  const bookings = await Booking.find(
    { bookedBy: req.user.id },
    {},
    { sort: { createdAt: -1 } }
  );
  res.status(200).json({
    success: true,
    bookings,
  });
});

exports.setScheduledTime = catchAsyncError(async (req, res, next) => {
  const booking = await Booking.findById(req.params.bookingId);
  if (req.user.role == "user" && booking.bookedBy != req.user._id) {
    return next(
      new ErrorHandler("You are not authorized to interfare with booking.", 403)
    );
  }
  // only facilitator assigned to booking and cluster incharge and admins can change the schedule
  booking.packageAndDate.dateAndTime = req.body.dateAndTime;
  await booking.save();
  res.status(200).json({
    success: true,
    message: "Treatment is Rescheduled successfully.",
  });
});

exports.getBookingByNameAndPhone = catchAsyncError(async (req, res, next) => {
  const { name, phone } = req.body;
  if (!name || !phone) {
    return next(new ErrorHandler("Please Enter name and phone number", 400));
  }
  const booking = await Booking.findOne({ name, phone });
  if (!booking) {
    res.status(200).json({
      success: true,
      message: "No booking found with given name and phone",
    });
  }
  res.status(200).json({
    success: true,
    booking,
  });
});
