const express = require("express");
const {
  createExercise,
  getAllExercises,
  getExerciseDetail,
  editExercise,
  deleteExercise,
} = require("../controllers/exerciseController");
const router = express.Router();

router.route("/new").post(createExercise);
router.route("/").get(getAllExercises);
router
  .route("/:id")
  .get(getExerciseDetail)
  .put(editExercise)
  .delete(deleteExercise);
