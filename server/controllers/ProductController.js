const Product = require("../models/Product");
const ErrorHandler = require("../utils/errorHandler");

exports.newProduct = async (request, response, next) => {
  const product = await Product.create(request.body);

  response.status(201).json({
    success: true,
    product,
  });
};

exports.getProducts = async (request, response, next) => {
  const products = await Product.find();
  response.status(200).json({
    success: true,
    products,
  });
};

exports.getProduct = async (request, response, next) => {
  const product = await Product.findById(request.params.id);

  if (!product) return next(new ErrorHandler("Product not found", 404));

  response.status(200).json({
    success: true,
    product,
  });
};

exports.updateProduct = async (request, response, next) => {
  let product = await Product.findById(request.params.id);

  if (!product)
    return response.status(404).json({
      success: false,
      message: "Product not found",
    });

  product = await Product.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
    runValidators: true,
  });

  response.status(200).json({
    success: true,
    product,
  });
};

exports.deleteProduct = async (request, response, next) => {
  const product = await Product.findById(request.params.id);

  if (!product)
    return response.status(404).json({
      success: false,
      message: "Product not found",
    });

  await product.deleteOne();

  response.status(200).json({
    success: true,
    message: "Product has been deleted",
  });
};
