const Testi = require("../models/testimonials");
const catchAsyncError = require("../middleware/catchAsyncFunc");
const ErrorHandler = require("../utils/ErrorHandler");
const cloudinary = require("cloudinary");
const ApiFeatures = require("../utils/ApiFeatures");

exports.createTestimonial = catchAsyncError(async (req, res, next) => {
  const myForm = await cloudinary.v2.uploader.upload(req.body.image, {
    folder: "The Healed Speaks",
    width: "150",
    crop: "scale",
  });
  const { name, testimonial, cluster } = req.body;
  const testi = await Testi.create({
    name,
    cluster,
    testimonial,
    image: {
      public_id: myForm.public_id,
      url: myForm.secure_url,
    },
  });
  res.status(200).json({
    success: true,
    testi,
  });
});

exports.editTestimonials = catchAsyncError(async (req, res, next) => {
  const testi = await Testi.findById(req.params.id);
  if (!testi) {
    return next(ErrorHandler(404, "Testimonial id is incorrect."));
  }
  const options = {
    name: req.body.name,
    testimonial: req.body.testimonial,
    cluster: req.body.cluster,
  };
  if (req.body.image) {
    await cloudinary.v2.uploader.destroy(testi.image.public_id);
    const myForm = await cloudinary.v2.uploader.upload(req.body.image, {
      folder: "The Healed Speaks",
      width: "150",
      crop: "scale",
    });
    options.image = {
      public_id: myForm.public_id,
      url: myForm.secure_url,
    };
  }
  await Testi.findByIdAndUpdate(req.params.id, options);
  res.status(200).json({
    success: true,
  });
});

exports.getTestimonials = catchAsyncError(async (req, res, next) => {
  let testi;
  let totalTesti;
  const api = new ApiFeatures(Testi.find(), req.query).Pagination(
    req.params.itemsPerPage
  );
  const api2 = new ApiFeatures(
    Testi.find(Testi.find({ cluster: req.params.cluster })),
    req.query
  ).Pagination(req.params.itemsPerPage);
  if (req.params.cluster === "All") {
    testi = await Testi.find();
    totalTesti = testi.length;
    testi = await api.query;
  } else {
    testi = await Testi.find({ cluster: req.params.cluster });
    totalTesti = testi.length;
    testi = await api2.query;
  }
  res.status(200).json({
    success: true,
    testi,
    totalTesti,
  });
});

exports.getSingleTestimonial = catchAsyncError(async (req, res, next) => {
  const testi = await Testi.findById(req.params.id);
  if (!testi) {
    return next(
      new ErrorHandler(404, `Testionial with ${req.params.id} is not found.`)
    );
  }
  res.status(200).json({
    success: true,
    testi,
  });
});

exports.deleteTestimonial = catchAsyncError(async (req, res, next) => {
  const testi = await Testi.findById(req.params.id);
  if (!testi) {
    return next(ErrorHandler(404, "Testimonial with this id is not found."));
  }
  await cloudinary.v2.uploader.destroy(testi.image.public_id);
  await Testi.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
  });
});
