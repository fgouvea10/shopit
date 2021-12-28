const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, request, response, next) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === "DEVELOPMENT") {
    response.status(err.statusCode).json({
      success: false,
      error: err,
      errMessage: err.message,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV === "PRODUCTION") {
    let error = { ...err };

    error.message = err.message;

    response.status(err.statusCode).json({
      success: false,
      message: err.message || "Internal server error",
    });
  }
};
