const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const verifyJWT = promisify(jwt.verify);
const { jwtSecret } = require('../config')
const { AuthenticationError } = require("node-errors-factory")("User")

module.exports = (req, res, next) => {
  const { token } = req.headers;
  try {
    req.user = await verifyJWT(token,jwtSecret)
    return next()
  } catch (error) {
    console.error(error)
    throw AuthenticationError(error.message)
  }
};
