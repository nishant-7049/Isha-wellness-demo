const mongoose = require("mongoose");

const QuoteSchema = new mongoose.Schema({
  quote: {
    type: String,
    required: [true, "Enter Quote before submitting."],
  },
});

const quote = mongoose.model("quote", QuoteSchema);
module.exports = quote;
