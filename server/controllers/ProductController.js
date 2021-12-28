const Product = require("../models/Product");

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

  if (!product)
    return response.status(404).json({
      success: false,
      message: "Product not found",
    });

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
