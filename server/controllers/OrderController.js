const Order = require("../models/Order");
const Product = require("../models/Product");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/CatchAsyncErrors");

exports.newOrder = catchAsyncErrors(async (request, response, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
  } = request.body;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt: Date.now(),
    user: request.user._id,
  });

  response.status(200).json({
    success: true,
    order,
  });
});

exports.getSingleOrder = catchAsyncErrors(async (request, response, next) => {
  const order = await Order.findById(request.params.id).populate(
    "user",
    "name email"
  );

  if (!order) return next(new ErrorHandler("No order found with this id", 404));

  response.status(200).json({
    success: true,
    order,
  });
});

exports.myOrders = catchAsyncErrors(async (request, response, next) => {
  const orders = await Order.find({ user: request.user.id });

  response.status(200).json({
    success: true,
    orders,
  });
});

exports.allOrders = catchAsyncErrors(async (request, response, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  response.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});
