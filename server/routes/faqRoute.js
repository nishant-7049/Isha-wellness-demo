const express = require("express");
const {
  getFaq,
  getFaqDetail,
  editFaq,
  deleteFaq,
  createFaq,
} = require("../controllers/faqController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/").get(getFaq);
router
  .route("/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getFaqDetail)
  .put(isAuthenticatedUser, authorizeRoles("admin"), editFaq)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteFaq);
router
  .route("/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createFaq);

module.exports = router;
