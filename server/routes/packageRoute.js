const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const {
  createPackage,
  getAllPackages,
  getPackageDetail,
  editPackage,
  deletePackage,
  getPackageByName,
} = require("../controllers/packageController");
const router = express.Router();

router
  .route("/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createPackage);
router.route("/all").get(getAllPackages);
router.route("/name/:name").get(getPackageByName);
router.route("/:id").get(isAuthenticatedUser, getPackageDetail);
router
  .route("/edit/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), editPackage);

router
  .route("/delete/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deletePackage);

module.exports = router;
