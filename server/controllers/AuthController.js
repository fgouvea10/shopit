const crypto = require("crypto");
const cloudinary = require("cloudinary");
const User = require("../models/User");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/CatchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");

exports.registerUser = catchAsyncErrors(async (request, response, next) => {
  const result = await cloudinary.v2.uploader.upload(request.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });

  const { name, email, password } = request.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: result.public_id,
      url: result.secure_url,
    },
  });

  sendToken(user, 200, response);
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

  sendToken(user, 200, response);
});

exports.forgotPassword = catchAsyncErrors(async (request, response, next) => {
  const user = await User.findOne({ email: request.body.email });

  if (!user)
    return next(new ErrorHandler("User not found with this email"), 404);

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetUrl = `${process.env.WEB_URL}/password/reset/${resetToken}`;

  const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it`;

  try {
    await sendEmail({
      email: user.email,
      subject: "ShopIT Password Recovery",
      message,
    });

    response.status(200).json({
      success: true,
      message: `Email sent to ${user.email}`,
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(err.message, 500));
  }
});

exports.resetPassword = catchAsyncErrors(async (request, response, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(request.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user)
    return next(
      new ErrorHandler(
        "Password reset token is invalid or has been expired",
        400
      )
    );
  if (request.body.password !== request.body.confirmPassword)
    return next(new ErrorHandler("Password does not match", 400));

  user.password = request.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  sendToken(user, 200, response);
});

exports.getUserProfile = catchAsyncErrors(async (request, response, next) => {
  const user = await User.findById(request.user.id);

  response.status(200).json({
    success: true,
    user,
  });
});

exports.updatePassword = catchAsyncErrors(async (request, response, next) => {
  const user = await User.findById(request.user.id).select("+password");

  const isMatched = await user.comparePassword(request.body.oldPassword);

  if (!isMatched)
    return next(new ErrorHandler("Old password is incorrect", 400));

  user.password = request.body.password;
  await user.save();

  sendToken(user, 200, response);
});

exports.updateProfile = catchAsyncErrors(async (request, response, next) => {
  const newUserData = {
    name: request.body.name,
    email: request.body.email,
  };

  const user = await User.findByIdAndUpdate(request.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  response.status(200).json({
    success: true,
  });
});

exports.logoutUser = catchAsyncErrors(async (request, response, next) => {
  response.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  response.status(200).json({
    success: true,
    message: "Logged out",
  });
});

exports.allUsers = catchAsyncErrors(async (request, response, next) => {
  const users = await User.find();

  response.status(200).json({
    success: true,
    users,
  });
});

exports.getUserDetails = catchAsyncErrors(async (request, response, next) => {
  const user = await User.findById(request.params.id);

  if (!user)
    return next(
      new ErrorHandler(`User not found with id ${request.params.id}`)
    );

  response.status(200).json({
    success: true,
    user,
  });
});

exports.updateUser = catchAsyncErrors(async (request, response, next) => {
  const newUserData = {
    name: request.body.name,
    email: request.body.email,
  };

  if (request.body.avatar !== "") {
    console.log(request.body.avatar);
    const user = await User.findById(request.user.id);

    const image_id = user.avatar.public_id;
    const res = await cloudinary.v2.uploader.destroy(image_id);

    const result = await cloudinary.v2.uploader.upload(request.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    newUserData.avatar = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(request.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  response.status(200).json({
    success: true,
  });
});

exports.deleteUser = catchAsyncErrors(async (request, response, next) => {
  const user = await User.findById(request.params.id);

  if (!user)
    return next(
      new ErrorHandler(`User not found with id ${request.params.id}`)
    );

  await user.remove();

  response.status(200).json({
    success: true,
  });
});
