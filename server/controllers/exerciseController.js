const Exercise = require("../models/exercise");
const cloudinary = require("cloudinary");
const catchAsyncError = require("../middleware/catchAsyncFunc");
const ErrorHandler = require("../utils/ErrorHandler");

exports.createExercise = catchAsyncError(async (req, res, next) => {
  if (req.body.gif) {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.gif, {
      folder: "exercise",
    });
    req.body.gif = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }
  const exercise = await Exercise.create(req.body);
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
    return next(new ErrorHandler(404, "Exercise with given id is not found."));
  }
  res.status(200).json({
    success: true,
    exercise,
  });
});

exports.editExercise = catchAsyncError(async (res, res, next) => {
  const exercise = await Exercise.findById(req.params.id);
  if (!exercise) {
    return next(new ErrorHandler(404, "Exercise with given id is not found."));
  }
  const options = {
    name: req.body.name,
    description: req.body.description,
    part: req.body.part,
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
    return next(new ErrorHandler(404, "Exercise with given id is not found."));
  }
  await Exercise.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
  });
});
