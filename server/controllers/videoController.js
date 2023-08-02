const Video = require("../models/video");
const catchAsyncError = require("../middleware/catchAsyncFunc");
const ApiFeatures = require("../utils/ApiFeatures");

exports.createVideo = catchAsyncError(async (req, res, next) => {
  const video = await Video.create({
    title: req.body.title,
    link: req.body.link,
  });
  res.status(200).json({
    success: true,
    video,
  });
});

exports.getVideos = catchAsyncError(async (req, res, next) => {
  let videos = await Video.find();
  const items = req.params.items === 0 ? videos.length : req.params.items;
  const videosCount = videos.length;
  const api = new ApiFeatures(Video.find(), req.query).Pagination(items);
  videos = await api.query;
  res.status(200).json({
    success: true,
    videos,
    videosCount,
  });
});

exports.getVideoDetail = catchAsyncError(async (req, res, next) => {
  const video = await Video.findById(req.params.id);
  if (!video) {
    return next(new ErrorHandler("Wrong id entered.", 404));
  }
  res.status(200).json({
    success: true,
    video,
  });
});

exports.editVideo = catchAsyncError(async (req, res, next) => {
  const video = await Video.findById(req.params.id);
  if (!video) {
    return next(new ErrorHandler("Wrong id entered.", 404));
  }
  await Video.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    link: req.body.link,
  });
  res.status(200).json({
    success: true,
  });
});

exports.deleteVideo = catchAsyncError(async (req, res, next) => {
  const video = await Video.findById(req.params.id);
  if (!video) {
    return next(new ErrorHandler("Wrong id entered.", 404));
  }
  await Video.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
  });
});
