const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  razorpay_order_id: String,
  razorpay_payment_id: String,
  razorpay_signature: String,
  booking: mongoose.Schema.Types.ObjectId,
});

const paymentModel = mongoose.model("payments", paymentSchema);
module.exports = paymentModel;
