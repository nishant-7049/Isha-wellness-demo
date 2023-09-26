const express = require("express");
const router = express.Router();
const {
  isAuthenticatedUser,
  authorizeRoles,
  isNotUser,
} = require("../middleware/auth");
const {
  createTreatment,
  getTreatmentByBooking,
  deleteTreatment,
  updateTreatmentExercise,
  getTreatment,
} = require("../controllers/treatmentController");

router
  .route("/new")
  .post(isAuthenticatedUser, authorizeRoles("therapist"), createTreatment);

router.route("/:bookingID").get(isAuthenticatedUser, getTreatmentByBooking);

router.route("/:id").get(isAuthenticatedUser, getTreatment);
router
  .route("/:id")
  .delete(isAuthenticatedUser, authorizeRoles("therapist"), deleteTreatment);
router
  .route("/update/:id")
  .put(
    isAuthenticatedUser,
    authorizeRoles("therapist"),
    updateTreatmentExercise
  );

module.exports = router;
