const express = require("express");
const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");

const {
  postQuestion,
  getForumData,
  postAnswer,
} = require("../controllers/forum");

router.route("/getForumData").get(getForumData);
router.route("/postQuestion").post(isAuthenticatedUser, postQuestion);
router.route("/postAnswer").post(isAuthenticatedUser, postAnswer);

module.exports = router;
