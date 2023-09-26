const Exercise = require("../models/exercise");
const cloudinary = require("cloudinary");
const catchAsyncError = require("../middleware/catchAsyncFunc");
const ErrorHandler = require("../utils/ErrorHandler");

exports.createExercise = catchAsyncError(async (req, res, next) => {
  const options = {
    name: req.body.name,
    description: req.body.description,
    part: req.body.part,
    duration: {
      min: req.body.min,
      sec: req.body.sec,
    },
  };
  if (req.body.gif) {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.gif, {
      folder: "exercise",
    });
    options.gif = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }
  const exercise = await Exercise.create(options);
  res.status(200).json({
    success: true,
    exercise,
  });
});

exports.getAllExercises = catchAsyncError(async (req, res, next) => {
  const exercises = await Exercise.find();
  res.status(200).json({
    success: true,
    exercises,
  });
});

exports.getExerciseDetail = catchAsyncError(async (req, res, next) => {
  const exercise = await Exercise.findById(req.params.id);
  if (!exercise) {
    return next(new ErrorHandler("Exercise with given id is not found.", 404));
  }
  res.status(200).json({
    success: true,
    exercise,
  });
});

exports.editExercise = catchAsyncError(async (req, res, next) => {
  const exercise = await Exercise.findById(req.params.id);
  if (!exercise) {
    return next(new ErrorHandler("Exercise with given id is not found.", 404));
  }
  const options = {
    name: req.body.name,
    description: req.body.description,
    part: req.body.part,
    duration: {
      min: req.body.min,
      sec: req.body.sec,
    },
  };
  if (req.body.gif) {
    await cloudinary.v2.uploader.destroy(exercise.gif.public_id);
    const myCloud = await cloudinary.v2.uploader.upload(req.body.gif, {
      folder: "exercises",
    });
    options.gif = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }
  await Exercise.findByIdAndUpdate(req.params.id, options);
  res.status(200).json({
    success: true,
  });
});

exports.deleteExercise = catchAsyncError(async (req, res, next) => {
  const exercise = await Exercise.findById(req.params.id);
  if (!exercise) {
    return next(new ErrorHandler("Exercise with given id is not found.", 404));
  }
  await Exercise.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
  });
});
