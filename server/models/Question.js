const mongoose = require("mongoose");

const ForumQuestionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
  },
  question: {
    type: String,
    maxlength: 100,
    required: true,
  },
  editedQuestion: {
    type: String,
    maxlength: 100,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  isEdited: {
    type: Boolean,
    default: false,
  },
  editedAt: {
    type: Date,
  },
});

const QuestionModel = mongoose.model("QuestionModel", ForumQuestionSchema);

module.exports = QuestionModel;
