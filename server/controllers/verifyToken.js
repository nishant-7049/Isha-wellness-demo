const jwt = require('jsonwebtoken')
const ErrorResponse = require('../utils/errorResponse')

exports.verifyToken = async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return next(new ErrorResponse('Please provide your identity', 401))
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET)
    res.status(200).send({
      status: true,
      message: 'The user is legit',
    })
  } catch (err) {
    return next(new ErrorResponse('Not authorized', 401))
  }
}
