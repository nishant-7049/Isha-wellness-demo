const Booking = require("../models/booking");
const catchAsyncError = require("../middleware/catchAsyncFunc");
const errorHandler = require("../utils/ErrorHandler");
const ErrorHandler = require("../utils/ErrorHandler");
const user = require("../models/user");

exports.createBooking = catchAsyncError(async (req, res, next) => {
  req.body.bookedBy = req.user._id;
  const date = new Date(Date.now());
  req.body.createdAt = date;
  const booking = await Booking.create(req.body);
  res.status(200).json({
    success: true,
    booking,
  });
});

exports.getAllBookings = catchAsyncError(async (req, res, next) => {
  const bookings = await Booking.find({}, {}, { sort: { createdAt: -1 } });

  res.status(200).json({
    success: true,
    bookings,
  });
});

exports.getBookingDetail = catchAsyncError(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    return next(new ErrorHandler("Booking with given id is not found.", 404));
  }
  res.status(200).json({
    success: true,
    booking,
  });
});

exports.getBookingDetailForUser = catchAsyncError(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    return next(new ErrorHandler("Booking with given id is not found.", 404));
  }
  if (booking.bookedBy != req.user.id) {
    return next(
      new ErrorHandler("You are not authorized to access this data.", 403)
    );
  }
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
  const bookings = await Booking.find(
    { assignTherapist: req.user.id },
    {},
    { sort: { createdAt: -1 } }
  );
  res.status(200).json({
    success: true,
    bookings,
  });
});
exports.getBookingsForFacilitator = catchAsyncError(async (req, res, next) => {
  const bookings = await Booking.find(
    { assignFacilitator: req.user.id },
    {},
    { sort: { createdAt: -1 } }
  );
  res.status(200).json({
    success: true,
    bookings,
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
