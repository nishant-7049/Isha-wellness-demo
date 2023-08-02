const Faq = require("../models/faq");
const catchAsyncError = require("../middleware/catchAsyncFunc");
const ErrorHandler = require("../utils/ErrorHandler");

exports.createFaq = catchAsyncError(async (req, res, next) => {
  const faq = await Faq.create({
    question: req.body.question,
    answer: req.body.answer,
  });
  res.status(200).json({
    success: true,
    faq,
  });
});

exports.getFaq = catchAsyncError(async (req, res, next) => {
  const faqs = await Faq.find();
  res.status(200).json({
    success: true,
    faqs,
  });
});

exports.getFaqDetail = catchAsyncError(async (req, res, next) => {
  const faq = await Faq.findById(req.params.id);
  if (!faq) {
    return next(new ErrorHandler("FAQ with this id is not found.", 404));
  }
  res.status(200).json({
    success: true,
    faq,
  });
});

exports.editFaq = catchAsyncError(async (req, res, next) => {
  const faq = await Faq.findById(req.params.id);
  if (!faq) {
    return next(new ErrorHandler("FAQ with this id is not found.", 404));
  }
  await Faq.findByIdAndUpdate(req.params.id, {
    question: req.body.question,
    answer: req.body.answer,
  });
  res.status(200).json({
    success: true,
  });
});

exports.deleteFaq = catchAsyncError(async (req, res, next) => {
  const faq = await Faq.findById(req.params.id);
  if (!faq) {
    return next(new ErrorHandler("FAQ with this id is not found.", 404));
  }
  await Faq.findByIdAndRemove(req.params.id);
  res.status(200).json({
    success: true,
  });
});
