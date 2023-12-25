const Blog = require("../models/blog");
const catchAsyncError = require("../middleware/catchAsyncFunc");
const ErrorHandler = require("../utils/ErrorHandler");
const cloudinary = require("cloudinary");
const ApiFeatures = require("../utils/ApiFeatures");

exports.createBlog = catchAsyncError(async (req, res, next) => {
  const options = {
    name: req.body.name,
    description: req.body.description,
    createdBy: req.user.name,
  };
  if (req.body.image) {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
      folder: "Blogs",
    });
    options.image = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }
  const blog = await Blog.create(options);
  res.status(200).json({
    success: true,
    blog,
  });
});

exports.getBlogs = catchAsyncError(async (req, res, next) => {
  const itemsPerPage = req.params.itemsPerPage;
  const api = new ApiFeatures(Blog, req.query).Search();
  let blogs = await api.query;
  const blogsCount = blogs.length;
  const api2 = new ApiFeatures(
    Blog.find({}, {}, { sort: { createdAt: -1 } }),
    req.query
  )
    .Search()
    .Pagination(itemsPerPage);
  blogs = await api2.query;
  res.status(200).json({
    success: true,
    blogs,
    blogsCount,
  });
});

exports.getBlogDetail = catchAsyncError(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    return next(new ErrorHandler("Given Blog id is incorrect", 404));
  }
  res.status(200).json({
    success: true,
    blog,
  });
});

exports.deleteBlog = catchAsyncError(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    return next(new ErrorHandler("Given Blog id is incorrect", 404));
  }
  if (blog.image && blog.image.public_id) {
    await cloudinary.v2.uploader.destroy(blog.image.public_id);
  }
  await Blog.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
  });
});

exports.editBlog = catchAsyncError(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    return next(new ErrorHandler("Given Blog id is incorrect", 404));
  }
  const { name, description } = req.body;
  const options = {
    name,
    description,
  };
  if (req.body.image && blog.image && blog.image.public_id) {
    await cloudinary.v2.uploader.destroy(blog.image.public_id);
  }
  if (req.body.image) {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
      folder: "Blogs",
    });
    options.image = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }
  await Blog.findByIdAndUpdate(req.params.id, options);
  res.status(200).json({
    success: true,
  });
});
