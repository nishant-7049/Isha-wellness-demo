const { Router } = require("express");
const {
  createEnquiry,
  getEnquiry,
  getEnquiries,
  resolveEnquiry,
} = require("../controllers/enquiryController");
const { isAuthenticatedUser, isNotUser } = require("../middleware/auth");
const router = Router();

router.route("/new").post(isAuthenticatedUser, createEnquiry);
router.route("/:enquiryId").get(isAuthenticatedUser, isNotUser(), getEnquiry);
router.route("/").get(isAuthenticatedUser, isNotUser(), getEnquiries);
router
  .route("/resolve/:enquiryId")
  .put(isAuthenticatedUser, isNotUser(), resolveEnquiry);

module.exports = router;
