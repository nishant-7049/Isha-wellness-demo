const express = require("express");
const { updateQuote, getQuote } = require("../controllers/quote");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router
  .route("/update")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateQuote);
router.route("/get").get(getQuote);

module.exports = router;
