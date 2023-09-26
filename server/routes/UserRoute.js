const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateUserDetails,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
  setIncharge,
  getTherWithClus,
  getFacWithClus,
} = require("../controllers/UserController");
const {
  isAuthenticatedUser,
  authorizeRoles,
  isIncharge,
  isNotUser,
} = require("../middleware/auth");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logoutUser);
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/update").put(isAuthenticatedUser, updateUserDetails);
router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);
router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, isNotUser(), getSingleUser);
router
  .route("/admin/user/update/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole);
router
  .route("/admin/user/delete/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);
router
  .route("/admin/user/setIncharge/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), setIncharge);

router
  .route("/therapists/:city")
  .get(isAuthenticatedUser, isIncharge(), getTherWithClus);
router
  .route("/facilitators/:city")
  .get(isAuthenticatedUser, isIncharge(), getFacWithClus);
module.exports = router;
