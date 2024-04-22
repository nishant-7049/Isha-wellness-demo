const mongoose = require("mongoose");

const ForumAnswerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
  },
  answer: {
    type: String,
    maxlength: 300,
    required: true,
  },
  editedAnswer: {
    type: String,
    maxlength: 300,
  },
  isEdited: {
    type: Boolean,
    default: false,
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  editedAt: {
    type: Date,
  },
});

const AnswerModel = mongoose.model("AnswerModel", ForumAnswerSchema);

module.exports = AnswerModel;
