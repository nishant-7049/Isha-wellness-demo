const mongoose = require("mongoose");

// TOOD: add id of admin who added the package
const packageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  paymentType: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  sessions: {
    type: Number,
    required: true,
  },
  days: {
    type: Number,
    required: true,
  },
});

const packageModel = mongoose.model("packages", packageSchema);
module.exports = packageModel;
