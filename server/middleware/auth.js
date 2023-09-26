const ErrorHandler = require("../utils/ErrorHandler");
const jwt = require("jsonwebtoken");
const catchAsyncFunc = require("./catchAsyncFunc");
const User = require("../models/user");

exports.isAuthenticatedUser = catchAsyncFunc(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Login First to access data", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedData.id);
  next();
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not authorized to access this functionality`,
          403
        )
      );
    }
    next();
  };
};

exports.isIncharge = () => {
  return (req, res, next) => {
    if (req.user.role != "admin" && !req.user.isIncharge) {
      return next(
        new ErrorHandler(
          `Other than admin and Cluster Incharge no other is not authorized to access this functionality`,
          403
        )
      );
    }
    next();
  };
};

exports.isNotUser = () => {
  return (req, res, next) => {
    if (req.user.role == "user" && !req.user.isIncharge) {
      return next(
        new ErrorHandler(
          `Other than admin and Cluster Incharge no other is not authorized to access this functionality`,
          403
        )
      );
    }
    next();
  };
};
