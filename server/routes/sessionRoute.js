const express = require("express");
const {
  createSession,
  getSessionLengthForAUser,
  getAllSessions,
  getLatestSession2,
  setOutcomeReason,
  setOutcomeReasonForStaff,
} = require("../controllers/sessionController");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/new").post(isAuthenticatedUser, createSession);
router.route("/getLatestSession").get(getLatestSession2);
router.route("/:outcomeToken").put(setOutcomeReason);
router
  .route("/:bookingId")
  .get(
    isAuthenticatedUser,
    authorizeRoles("facilitator"),
    getSessionLengthForAUser
  );
router
  .route("/therapist/:sessionId")
  .put(
    isAuthenticatedUser,
    authorizeRoles("therapist"),
    setOutcomeReasonForStaff
  );
router
  .route("/facilitator/:sessionId")
  .put(
    isAuthenticatedUser,
    authorizeRoles("facilitator"),
    setOutcomeReasonForStaff
  );
router.route("/").get(getAllSessions);

module.exports = router;
