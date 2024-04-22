const Enquiry = require("../models/enquiry");
const catchAsyncError = require("../middleware/catchAsyncFunc");
const ErrorHandler = require("../utils/ErrorHandler");
const sendSms = require("../utils/sendSms");

exports.createEnquiry = catchAsyncError(async (req, res, next) => {
  req.body.createdAt = new Date();
  const enquiry = await Enquiry.findOne({
    name: req.body.name,
    phone: req.body.phone,
  });
  if (enquiry) {
    return next(
      new ErrorHandler(
        "Enquiry with this name and mobile number already exists.",
        409
      )
    );
  }
  const newEnquiry = await Enquiry.create(req.body);
  res.status(200).json({
    success: true,
    enquiry: newEnquiry,
  });
});

exports.deleteEnquiry = catchAsyncError(async (req, res, next) => {
  const enquiry = await Enquiry.findById(req.params.enquiryId);
  if (!enquiry) {
    res.status(404).json({
      success: false,
      message: "Enquiry with this Id is not found.",
    });
    return next(new ErrorHandler("Enquiry with this Id is not found.", 404));
  }
  await Enquiry.findByIdAndDelete(req.params.enquiryId);
  res.status(200).json({
    success: true,
    message: "Enquiry Deleted successfully.",
  });
});

exports.getEnquiries = catchAsyncError(async (req, res, next) => {
  const enquiries = await Enquiry.find({
    city: { $in: req.user.cluster },
  }).sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    enquiries,
  });
});

exports.getEnquiry = catchAsyncError(async (req, res, next) => {
  const enquiry = await Enquiry.findById(req.params.enquiryId);
  if (!enquiry) {
    res.status(404).json({
      success: false,
      message: "Enquiry with this Id is not found.",
    });
    return next(new ErrorHandler("Enquiry with this Id is not found.", 404));
  }
  res.status(200).json({
    success: true,
    enquiry,
  });
});

exports.resolveEnquiry = catchAsyncError(async (req, res, next) => {
  const enquiry = await Enquiry.findById(req.params.enquiryId);
  if (!enquiry) {
    res.status(404).json({
      success: false,
      message: "Enquiry with this Id is not found.",
    });
    return next(new ErrorHandler("Enquiry with this Id is not found.", 404));
  }
  enquiry.reason = req.body.reason;
  (enquiry.isResolved = true), (enquiry.resolvedBy = req.user._id);
  await enquiry.save();
  const smsOptions = {
    body: `From IWC, \n We have successfully submitted your enquiry, just to be ensure is this your enquiry (${req.body.reason}). \n For any query contact 20948204802.`,
    to: enquiry.phone,
  };
  await sendSms(smsOptions);
  res.status(200).json({
    success: true,
    message: "Enquiry has been resolved.",
  });
});
