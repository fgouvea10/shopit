const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, request, response, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";

  response.status(err.statusCode).json({
    success: false,
    error: err.stack,
  });
};
