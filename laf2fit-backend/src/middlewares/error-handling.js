const Errors = require("../libs/custom-errors");

module.exports = async function (err, _req, res, next) {
  let statusCode = 500;
  let message = "Server error";
  let errors = [];

  if (err instanceof Errors.HttpError) {
    if (err instanceof Errors.ValidationError) {
      errors = err.errors;
    }
    statusCode = err.statusCode;
    message = err.message;
  }

  res.status(statusCode).json({ message, errors });

  next(err);
};
