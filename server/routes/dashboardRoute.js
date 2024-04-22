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
  getUserSessions,
  getUserStats,
  getClusterProgress,
} = require("../controllers/dashboardController");
const {
  isAuthenticatedUser,
  authorizeRoles,
  notUser,
} = require("../middleware/auth");

router.route("/userStats").get(getUserStats);

router
  .route("/admin/getUserSessions")
  .get(isAuthenticatedUser, notUser, getUserSessions);

router
  .route("/admin/patientMeter")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getPatientMeterData);

router
  .route("/admin/centreData")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getCentreData);

router
  .route("/admin/clusterProgress")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getClusterProgress);

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
