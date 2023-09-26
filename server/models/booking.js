const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  mobile: {
    type: Number,
    required: true,
  },
  whatsapp: {
    type: Number,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  problem: {
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
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  part: {
    type: String,
    required: true,
  },
  education: {
    type: String,
    required: true,
  },
  package: {
    type: String,
    required: true,
  },
  work: {
    type: String,
    required: true,
  },
  gettoknow: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  batch: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(Date.now()),
  },
  status: {
    type: String,
    default: "Assigning Staff...",
  },
  bookedBy: mongoose.Schema.Types.ObjectId,
  payment: mongoose.Schema.Types.ObjectId,
  assignTherapist: mongoose.Schema.Types.ObjectId,
  assignFacilitator: mongoose.Schema.Types.ObjectId,
});

const bookingModel = mongoose.model("bookings", bookingSchema);

module.exports = bookingModel;
