const express = require("express");
const {
  createBooking,
  getAllBookings,
  deleteBooking,
  getBookingDetail,
  setTherapist,
  setFacilitator,
  getBookingsForTherapist,
  setBookingStatus,
  getBookingsForFacilitator,
  getUserBookings,
  getBookingDetailForUser,
  setScheduledTime,
} = require("../controllers/bookingController");
const {
  isAuthenticatedUser,
  authorizeRoles,
  isIncharge,
  isNotUser,
} = require("../middleware/auth");
const router = express.Router();

router.route("/new").post(isAuthenticatedUser, createBooking);
router.route("/all").get(isAuthenticatedUser, isIncharge(), getAllBookings);
router
  .route("/delete/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteBooking);
router
  .route("/detail/:id")
  .get(isAuthenticatedUser, isNotUser(), getBookingDetail);
router
  .route("/user/detail/:id")
  .get(isAuthenticatedUser, getBookingDetailForUser);
router
  .route("/setTherapist")
  .put(isAuthenticatedUser, isIncharge(), setTherapist);
router
  .route("/setFacilitator")
  .put(isAuthenticatedUser, isIncharge(), setFacilitator);
router
  .route("/therapist/bookings")
  .get(
    isAuthenticatedUser,
    authorizeRoles("therapist"),
    getBookingsForTherapist
  );
router
  .route("/facilitator/bookings")
  .get(
    isAuthenticatedUser,
    authorizeRoles("facilitator"),
    getBookingsForFacilitator
  );
router.route("/user/bookings").get(isAuthenticatedUser, getUserBookings);
router
  .route("/status/:id")
  .put(isAuthenticatedUser, isNotUser, setBookingStatus);
router
  .route("/reschedule/:bookingId")
  .put(isAuthenticatedUser, setScheduledTime);
module.exports = router;
