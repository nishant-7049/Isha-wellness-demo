const express = require("express");
const router = express.Router();
const {
  createVideo,
  getVideos,
  deleteVideo,
  getVideoDetail,
  editVideo,
} = require("../controllers/videoController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router
  .route("/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createVideo);
router.route("/:items").get(getVideos);
router.route("/detail/:id").get(getVideoDetail);
router
  .route("/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteVideo)
  .put(isAuthenticatedUser, authorizeRoles("admin"), editVideo);

module.exports = router;
