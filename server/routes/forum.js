const express = require("express");
const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");

const {
  createQuestion,
  getAllQuestions,
  deleteQuestion,
  editQuestion,
  createAnswer,
  getAllAnswers,
  getAnswersByQuestion,
} = require("../controllers/forum");

router.route("/createQuestion").post(isAuthenticatedUser, createQuestion);
router.route("/questions").get(isAuthenticatedUser, getAllQuestions);
router.route("/:id").delete(isAuthenticatedUser, deleteQuestion);
router.route("/:id").put(isAuthenticatedUser, editQuestion);
router.route("/createAnswer").post(isAuthenticatedUser, createAnswer);
router.route("/answers").get(isAuthenticatedUser, getAllAnswers);
router.route("/answer/:questionId").get(isAuthenticatedUser, getAnswersByQuestion)

module.exports = router;
