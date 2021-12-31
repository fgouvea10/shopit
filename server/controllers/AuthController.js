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
