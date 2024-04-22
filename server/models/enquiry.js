const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  education: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  martial: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  whatsapp: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  isResolved: {
    type: Boolean,
    default: false,
  },
  reason: {
    type: String,
  },
  resolvedBy: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

const enquiryModel = mongoose.model("enqueries", enquirySchema);

module.exports = enquiryModel;
