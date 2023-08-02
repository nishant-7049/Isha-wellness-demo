const express = require("express");
const router = express.Router();

const {
  createTestimonial,
  getTestimonials,
  deleteTestimonial,
  editTestimonials,
  getSingleTestimonial,
} = require("../controllers/testimonialController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router
  .route("/create")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createTestimonial);
router.route("/:cluster/:itemsPerPage").get(getTestimonials);
router
  .route("/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteTestimonial)
  .put(isAuthenticatedUser, authorizeRoles("admin"), editTestimonials);
router.route("/:id").get(getSingleTestimonial);
module.exports = router;
