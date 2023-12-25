const express = require("express");
const router = express.Router();
const {
  getPatientMeterData,
  getCentreData,
  getTherapistPerformance,
  getDropoutsForTherapist,
  getTherapistAllSessions,
  getFacilitatorPerformance,
  getDropoutsForFacilitator,
  getFacilitatorAllSessions,
} = require("../controllers/dashboardController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router
  .route("/admin/patientMeter")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getPatientMeterData);

router
  .route("/admin/centreData")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getCentreData);

router
  .route("/therapist/performance")
  .get(
    isAuthenticatedUser,
    authorizeRoles("therapist"),
    getTherapistPerformance
  );
router
  .route("/facilitator/performance")
  .get(
    isAuthenticatedUser,
    authorizeRoles("facilitator"),
    getFacilitatorPerformance
  );
router
  .route("/therapist/dropout")
  .get(
    isAuthenticatedUser,
    authorizeRoles("therapist"),
    getDropoutsForTherapist
  );
router
  .route("/facilitator/dropout")
  .get(
    isAuthenticatedUser,
    authorizeRoles("facilitator"),
    getDropoutsForFacilitator
  );
router
  .route("/therapist/sessions")
  .get(
    isAuthenticatedUser,
    authorizeRoles("therapist"),
    getTherapistAllSessions
  );
router
  .route("/facilitator/sessions")
  .get(
    isAuthenticatedUser,
    authorizeRoles("facilitator"),
    getFacilitatorAllSessions
  );

module.exports = router;
