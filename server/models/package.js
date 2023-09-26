const mongoose = require("mongoose");

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
});

const packageModel = mongoose.model("packages", packageSchema);
module.exports = packageModel;
