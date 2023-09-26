const { instance } = require("../server.js");
const catchAsyncError = require("../middleware/catchAsyncFunc.js");
const crypto = require("crypto");
const Payment = require("../models/payment.js");
const Booking = require("../models/booking.js");
const ErrorHandler = require("../utils/ErrorHandler.js");

exports.checkout = catchAsyncError(async (req, res) => {
  const options = {
    amount: req.body.amount * 100,
    currency: "INR",
  };
  const order = await instance.orders.create(options);
  res.status(200).json({
    success: true,
    order,
  });
});

exports.getPaymentKey = catchAsyncError(async (req, res) => {
  res.status(200).json({
    success: true,
    key: process.env.RAZOR_API_KEY_ID,
  });
});

exports.paymentVerification = catchAsyncError(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZOR_API_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthenticated = generated_signature === razorpay_signature;

  if (isAuthenticated) {
    const payment = await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      booking: req.body.bookingID,
    });
    await Booking.findByIdAndUpdate(req.body.bookingID, {
      payment: payment._id,
    });
    res.status(200).json({
      success: true,
      message: "Payment send Successfully.",
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Authentication failed",
    });
  }
});

exports.getAllPayment = catchAsyncError(async (req, res, next) => {
  const payments = await Payment.find();
  res.status(200).json({
    success: true,
    payments,
  });
});

exports.getPaymentDetails = catchAsyncError(async (req, res, next) => {
  const payment = await Payment.findById(req.params.id);
  if (!payment) {
    res.status(200).json({
      success: true,
      message: "Not Paid",
    });
  }
  res.status(200).json({
    success: true,
    payment,
  });
});

exports.getPaymentDetailsForUser = catchAsyncError(async (req, res, next) => {
  const booking = await Booking.findById(req.params.bookingId);
  if (!booking) {
    return next(new ErrorHandler("booking not found.", 404));
  }
  if (booking.bookedBy != req.user.id) {
    return next(
      new ErrorHandler("You are not authorized to access this data.", 404)
    );
  }
  let payment;
  if (booking.payment) {
    payment = await Payment.findById(booking.payment);
  }
  if (!payment) {
    res.status(200).json({
      success: true,
      message: "Not Paid",
    });
  }
  res.status(200).json({
    success: true,
    payment,
  });
});
