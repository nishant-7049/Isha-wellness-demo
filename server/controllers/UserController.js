const catchAsyncError = require("../middleware/catchAsyncFunc");
const User = require("../models/user");
const errorResponse = require("../utils/errorResponse");
const setToken = require("../utils/JWTToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");
const ErrorHandler = require("../utils/ErrorHandler");

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  const options = {
    name,
    email,
    password,
  };
  if (req.body.avatar) {
    const myForm = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: "150",
      crop: "scale",
    });
    options.avatar = {
      public_id: myForm.public_id,
      url: myForm.secure_url,
    };
  }

  const user = await User.create(options);
  setToken(user, 201, res);
});

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new errorResponse("Enter email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new errorResponse("Invalid Email or Password", 401));
  }

  const isPasswordCorrect = await user.checkPassword(password);
  if (!isPasswordCorrect) {
    return next(new errorResponse("Invalid Email or Password", 401));
  }

  setToken(user, 200, res);
});

exports.logoutUser = catchAsyncError(async (req, res, next) => {
  await res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "You Logged Our successfully",
  });
});

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(
      new errorResponse(`User with mail:${req.body.email} not found`, 404)
    );
  }

  const resetToken = await user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  // for production
  const resetPasswordUrl = `https://apnicompany.tech/password/reset/${resetToken}`;

  //for development
  // const resetPasswordUrl = `http://localhost:5173/password/reset/${resetToken}`;

  const message = `If you want to reset your password of GetSome than click on link below \n\n ${resetPasswordUrl} \n\n If you haven't requested for reset password link than kindly ignore the email.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "GetSome Reset Password Link",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully.`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordTime = undefined;

    await user.save({ validateBeforeSave: false });
    return next(new errorResponse(error.message, 500));
  }
});

exports.resetPassword = catchAsyncError(async (req, res, next) => {
  console.log("Token received: " + req.params.token);
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  console.log("password Hashed.");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordTime: { $gt: Date.now() },
  });

  if (!user) {
    return next(new errorResponse("invalid token or link has expired", 400));
  }
  console.log("User found.");

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new errorResponse("Passwords do not match", 400));
  }
  console.log("both passwords match.");

  user.password = req.body.newPassword;
  console.log("password set");
  user.resetPasswordTime = undefined;
  user.resetPasswordToken = undefined;

  await user.save();
  console.log("password saved");
  setToken(user, 200, res);
});

exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const IsMatched = user.checkPassword(req.body.oldPassword);

  if (!IsMatched) {
    console.log("Old Password does not match");
    return next(new errorResponse("Old Password does not match", 400));
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    console.log("new password and confirm password does not match");
    return next(
      new errorResponse("new password and confirm password does not match", 400)
    );
  }

  user.password = req.body.newPassword;
  await user.save();

  setToken(user, 200, res);
});

exports.updateUserDetails = catchAsyncError(async (req, res, next) => {
  const userDetails = {
    name: req.body.name,
    email: req.body.email,
  };

  if (req.body.avatar) {
    if (req.user.avatar && req.user.avatar.public_id) {
      await cloudinary.v2.uploader.destroy(req.user.avatar.public_id);
    }
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: "150",
      crop: "scale",
    });
    userDetails.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }
  await User.findByIdAndUpdate(req.user.id, userDetails, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

exports.getSingleUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new errorResponse(`User with ${req.params.id} not found`, 400));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

exports.updateUserRole = catchAsyncError(async (req, res, next) => {
  const userDetails = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
    cluster: req.body.cluster,
  };

  const user = await User.findByIdAndUpdate(req.params.id, userDetails);

  if (!user) {
    return next(
      new errorResponse(`User with ${user.params.id} not found`, 404)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

exports.deleteUser = catchAsyncError(async (req, res, next) => {
  let user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new errorResponse(`User with ${user.params.id} not found`, 404)
    );
  }
  if (user.avatar && user.avatar.url) {
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);
  }

  user = await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "user has been deleted",
  });
});

exports.setIncharge = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("User with given id not found.", 404));
  }
  user.isIncharge = req.body.isIncharge;
  await user.save();
  res.status(200).json({
    success: true,
    message: "Role has been assigned.",
  });
});

exports.getTherWithClus = catchAsyncError(async (req, res, next) => {
  const therapists = await User.find({
    role: "therapist",
    cluster: req.params.city,
  });

  res.status(200).json({
    success: true,
    therapists,
  });
});

exports.getFacWithClus = catchAsyncError(async (req, res, next) => {
  const facilitators = await User.find({
    role: "facilitator",
    cluster: req.params.city,
  });

  res.status(200).json({
    success: true,
    facilitators,
  });
});
