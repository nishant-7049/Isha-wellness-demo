const express = require("express");
const {
  createExercise,
  getAllExercises,
  getExerciseDetail,
  editExercise,
  deleteExercise,
} = require("../controllers/exerciseController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router
  .route("/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createExercise);
router.route("/").get(getAllExercises);
router
  .route("/:id")
  .get(getExerciseDetail)
  .put(editExercise)
  .delete(deleteExercise);

module.exports = router;
