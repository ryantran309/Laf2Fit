class HttpError extends Error {
  constructor(message, code) {
    super(message);
    this.statusCode = code || 500;
  }
}

class BadRequestError extends HttpError {
  constructor(message = "Bad Request") {
    super(message);
    this.statusCode = 400;
  }
}

class UnauthorizedError extends HttpError {
  constructor(message = "Not Authorized") {
    super(message);
    this.statusCode = 401;
  }
}

class ForbiddenError extends HttpError {
  constructor(message = "Forbidden") {
    super(message);
    this.statusCode = 403;
  }
}

class NotFoundError extends HttpError {
  constructor(message = "Not Found") {
    super(message);
    this.statusCode = 404;
  }
}

class ValidationError extends HttpError {
  constructor(message = "Validation Failed", errors = []) {
    super(message);

    this.statusCode = 422;
    this.errors = errors;
  }
}

module.exports = {
  HttpError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ValidationError,
};
