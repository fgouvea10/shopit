const Product = require("../models/Product");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/CatchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");

exports.newProduct = catchAsyncErrors(async (request, response, next) => {
  const product = await Product.create(request.body);

  response.status(201).json({
    success: true,
    product,
  });
});

exports.getProducts = catchAsyncErrors(async (request, response, next) => {
  const resPerPage = 4;
  const productCount = await Product.countDocuments();

  const apiFeatures = new APIFeatures(Product.find(), request.query)
    .search()
    .filter()
    .pagination(resPerPage);
  const products = await apiFeatures.query;
  response.status(200).json({
    success: true,
    productCount,
    products,
  });
});

exports.getProduct = catchAsyncErrors(async (request, response, next) => {
  const product = await Product.findById(request.params.id);

  if (!product) return next(new ErrorHandler("Product not found", 404));

  response.status(200).json({
    success: true,
    product,
  });
});

exports.updateProduct = catchAsyncErrors(async (request, response, next) => {
  let product = await Product.findById(request.params.id);

  if (!product) return next(new ErrorHandler("Product not found", 404));

  product = await Product.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
    runValidators: true,
  });

  response.status(200).json({
    success: true,
    product,
  });
});

exports.deleteProduct = catchAsyncErrors(async (request, response, next) => {
  const product = await Product.findById(request.params.id);

  if (!product) return next(new ErrorHandler("Product not found", 404));

  await product.deleteOne();

  response.status(200).json({
    success: true,
    message: "Product has been deleted",
  });
});
