const setToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  const options = {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    // testing with secure false
    secure: false,
    sameSite: "None",
    path: "/",
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
  };
  res.cookie("token", token, options);
  res.status(statusCode).json({
    success: true,
    user,
    token,
  });
};

module.exports = setToken;
