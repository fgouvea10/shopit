const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ErrorHandler = require("../utils/errorHandler");
const CatchAsyncErrors = require("./CatchAsyncErrors");

exports.isAuthenticated = CatchAsyncErrors(async (request, response, next) => {
  const { token } = request.cookies;

  if (!token)
    return next(
      new ErrorHandler("You need to login to access this resource", 401)
    );

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  request.user = await User.findById(decoded.id);

  next();
});
