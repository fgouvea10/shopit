const User = require("../models/User");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/CatchAsyncErrors");

exports.registerUser = catchAsyncErrors(async (request, response, next) => {
  const { name, email, password } = request.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "avatars/kuhbasfbnkasikl",
      url: "https://villyo.com.br/assets/img/user.png",
    },
  });

  const token = user.getJwtToken();

  response.status(201).json({
    success: true,
    token,
  });
});

exports.loginUser = catchAsyncErrors(async (request, response, next) => {
  const { email, password } = request.body;

  if (!email || !password)
    return next(
      new ErrorHandler("User email or password must be provided", 400)
    );

  const user = await User.findOne({ email }).select("+password");

  if (!user) return next(new ErrorHandler("Invalid email or password", 401));

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched)
    return next(new ErrorHandler("Invalid email or password", 401));

  const token = user.getJwtToken();

  response.status(200).json({
    success: true,
    token,
  });
});
