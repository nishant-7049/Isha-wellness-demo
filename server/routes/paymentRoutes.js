const express = require("express");
const router = express.Router();
const {
  checkout,
  getPaymentKey,
  paymentVerification,
  getPaymentDetails,
  getAllPayment,
  getPaymentDetailsForUser,
} = require("../controllers/paymentController");
const {
  isAuthenticatedUser,
  authorizeRoles,
  isIncharge,
  isNotUser,
} = require("../middleware/auth");

router.route("/checkout").post(checkout);
router.route("/getkey").get(getPaymentKey);
router.route("/verification").post(isAuthenticatedUser, paymentVerification);
router
  .route("/")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllPayment);
router.route("/:id").get(isAuthenticatedUser, isNotUser(), getPaymentDetails);
router
  .route("/user/:bookingId")
  .get(isAuthenticatedUser, getPaymentDetailsForUser);
module.exports = router;
