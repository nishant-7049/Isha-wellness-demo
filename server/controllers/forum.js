const QuestionModel = require("../models/Question");
const AnswerModel = require("../models/Answer");
const catchAsyncError = require("../middleware/catchAsyncFunc");
const ErrorHandler = require("../utils/ErrorHandler");
const User = require("../models/user");
const ApiFeatures = require("../utils/ApiFeatures");

exports.createQuestion = catchAsyncError(async (req, res, next) => {
  const options = {
    user: req.user._id,
    question: req.body.question,
    createdAt: Date.now(),
  };
  const question = await QuestionModel.create(options);

  res.status(200).json({
    success: true,
    question,
  });
});

exports.getAllQuestions = catchAsyncError(async (req, res, next) => {
  const api = new ApiFeatures(QuestionModel, req.query).SearchQuestion();
  const allQuesitons = await api.query;
  const api2 = new ApiFeatures(
    QuestionModel.find({}, {}, { sort: { createdAt: -1 } }),
    req.query
  )
    .SearchQuestion()
    .Pagination(6);
  const questions = await api2.query.lean();
  for (let question in questions) {
    const user = await User.findById(questions[question].user);
    questions[question].userDetails = user;
    const answers = await AnswerModel.find({
      questionId: questions[question]._id,
    });
    questions[question].answersCount = answers.length;
  }
  res.status(200).json({
    success: true,
    questions,
    questionsCount: allQuesitons.length,
  });
});

exports.deleteQuestion = catchAsyncError(async (req, res, next) => {
  const question = await QuestionModel.findById(req.params.id);
  if (!question) {
    return next(new ErrorHandler("Question with this id not found.", 403));
  }
  if (
    JSON.stringify(question.user) != JSON.stringify(req.user._id) &&
    req.user.role != "admin"
  ) {
    return next(
      new ErrorHandler("You are not authorized to delete this Question.", 401)
    );
  }
  await question.delete();
  res.status(200).json({
    success: true,
    message: "Question deleted successfully.",
  });
});

exports.editQuestion = catchAsyncError(async (req, res, next) => {
  const question = await QuestionModel.findById(req.params.id);
  if (!question) {
    return next(new ErrorHandler("Question with id not found", 403));
  }
  if (JSON.stringify(req.user._id) != JSON.stringify(question.user)) {
    return next(
      new ErrorHandler(
        "You are not Authorized to make changes to this question",
        401
      )
    );
  }
  if (!question.isEdited) {
    question.editedQuestion = `Edited: ${req.body.question}`;
    question.isEdited = true;
    question.editedAt = Date.now();
  }
  await question.save();
  res.status(200).json({
    success: true,
    question,
  });
});

exports.createAnswer = catchAsyncError(async (req, res, next) => {
  const answer = await AnswerModel.create({
    user: req.user._id,
    questionId: req.body.questionId,
    answer: req.body.answer,
    createdAt: Date.now(),
  });
  res.status(200).json({
    success: true,
    answer,
  });
});

exports.getAllAnswers = catchAsyncError(async (req, res, next) => {
  const answers = await AnswerModel.find();
  res.status(200).json({
    success: true,
    answers,
  });
});

exports.getAnswersByQuestion = catchAsyncError(async (req, res, next) => {
  const api = new ApiFeatures(
    AnswerModel.find(
      { questionId: req.params.questionId },
      {},
      { sort: { createdAt: -1 } }
    ),
    req.query
  ).Pagination(4);

  const answers = await api.query.lean();
  for (let a of answers) {
    const user = await User.findById(a.user);
    a.userDetails = user;
  }

  res.status(200).json({
    success: true,
    answers,
  });
});
