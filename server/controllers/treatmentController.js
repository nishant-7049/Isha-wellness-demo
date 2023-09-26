const Treatment = require("../models/treatment");
const catchAsyncError = require("../middleware/catchAsyncFunc");
const ErrorHandler = require("../utils/ErrorHandler");

exports.createTreatment = catchAsyncError(async (req, res, next) => {
  const { createdBy, booking } = req.body;
  const options = {
    createdBy,
    booking,
    createdAt: new Date(Date.now()),
  };
  const treatment = await Treatment.create(options);
  res.status(200).json({
    success: true,
    treatment,
  });
});

exports.getTreatment = catchAsyncError(async (req, res, next) => {
  const treatment = await Treatment.findById(req.params.id);
  if (!treatment) {
    return next(new ErrorHandler("Treatment not found", 404));
  }
  res.status(200).json({
    success: true,
    treatment,
  });
});

exports.getTreatmentByBooking = catchAsyncError(async (req, res, next) => {
  const treatments = await Treatment.find(
    { booking: req.params.bookingID },
    {},
    { sort: { createdAt: -1 } }
  );
  res.status(200).json({
    success: true,
    treatments,
  });
});

exports.updateTreatmentExercise = catchAsyncError(async (req, res, next) => {
  const treatment = await Treatment.findById(req.params.id);
  if (!treatment) {
    return next(new ErrorHandler("Treatment with ID not found.", 404));
  }
  treatment.exercises = req.body.exercises;
  await treatment.save();
  res.status(200).json({
    success: true,
    treatment,
  });
});

exports.deleteTreatment = catchAsyncError(async (req, res, next) => {
  const treatment = await Treatment.findById(req.params.id);
  if (!treatment) {
    return next(new ErrorHandler("Treatment with ID not found.", 404));
  }
  await Treatment.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    message: "Treatment Deleted Successfully.",
  });
});
