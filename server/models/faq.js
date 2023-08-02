const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema({
  question: {
    type: String,
    requried: [true, "Enter Question."],
  },
  answer: {
    type: String,
    required: [true, "Enter Answer"],
  },
});

const faqModel = mongoose.model("faqs", faqSchema);
module.exports = faqModel;
