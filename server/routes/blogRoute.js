const express = require("express");
const router = express.Router();

const {
  createBlog,
  getBlogs,
  getBlogDetail,
  deleteBlog,
  editBlog,
} = require("../controllers/blogController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router
  .route("/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createBlog);
router.route("/details/:id").get(getBlogDetail);
router.route("/:itemsPerPage").get(getBlogs);
router
  .route("/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteBlog)
  .put(isAuthenticatedUser, authorizeRoles("admin"), editBlog);

module.exports = router;
