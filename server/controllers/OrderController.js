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

exports.updateOrder = catchAsyncErrors(async (request, response, next) => {
  const order = await Order.findById(request.params.id);

  if (order.orderStatus === "Delivered")
    return next(new ErrorHandler("You have already delivered this order", 400));

  order.orderItems.forEach(async (item) => {
    await updateStock(item.product, item.quantity);
  });

  (order.orderStatus = request.body.status), (order.deliveredAt = Date.now());

  await order.save();

  response.status(200).json({
    success: true,
  });
});

exports.deleteOrder = catchAsyncErrors(async (request, response, next) => {
  const order = await Order.findById(request.params.id);

  if (!order) return next(new ErrorHandler("No order found with this id", 400));

  await order.remove();

  response.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.stock = product.stock - quantity;

  await product.save({ validateBeforeSave: false });
}
