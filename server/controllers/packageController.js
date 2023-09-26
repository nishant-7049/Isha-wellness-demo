const Package = require("../models/package");
const catchAsyncError = require("../middleware/catchAsyncFunc");
const errorHandler = require("../utils/ErrorHandler");

exports.createPackage = catchAsyncError(async (req, res, next) => {
  const { name, description, paymentType, price } = req.body;
  const package = await Package.create({
    name,
    description,
    paymentType,
    price,
  });
  res.status(200).json({
    success: true,
    package,
  });
});

exports.getAllPackages = catchAsyncError(async (req, res, next) => {
  const packages = await Package.find();
  res.status(200).json({
    packages,
  });
});

exports.getPackageDetail = catchAsyncError(async (req, res, next) => {
  const package = await Package.findById(req.params.id);
  if (!package) {
    return next(
      new errorHandler(`package with id(${req.params.id}) not found.`, 404)
    );
  }
  res.status(200).json({
    success: true,
    package,
  });
});

exports.editPackage = catchAsyncError(async (req, res, next) => {
  const package = await Package.findById(req.params.id);
  if (!package) {
    return next(
      new errorHandler(`package with id(${req.params.id}) not found.`, 404)
    );
  }
  const options = {
    name: req.body.name,
    description: req.body.description,
    paymentType: req.body.paymentType,
    price: req.body.price,
  };
  await Package.findByIdAndUpdate(req.params.id, options);
  res.status(200).json({
    success: true,
  });
});

exports.deletePackage = catchAsyncError(async (req, res, next) => {
  const package = await Package.findById(req.params.id);
  if (!package) {
    return next(
      new errorHandler(`package with id(${req.params.id}) not found.`, 404)
    );
  }
  await Package.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    message: "Package deleted successfully.",
  });
});

exports.getPackageByName = catchAsyncError(async (req, res, next) => {
  const package = await Package.findOne({ name: req.params.name });
  if (!package) {
    return next(
      new errorHandler(`package with name(${req.body.name}) not found.`, 404)
    );
  }
  res.status(200).json({
    success: true,
    package,
  });
});
