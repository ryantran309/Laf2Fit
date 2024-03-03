const config = require("config");
const jwt = require("jsonwebtoken");
const Errors = require("../libs/custom-errors");

module.exports = async function (req, _res, next) {
  const token = req.header("Authorization");
  if (!token)
    throw new Errors.UnauthorizedError("Access denied. No token provided");

  try {
    const decoded = jwt.verify(token, config.get("jwt.secret"));
    req.user = decoded;
    next();
  } catch (err) {
    throw new Errors.UnauthorizedError("Invalid token");
  }
};
