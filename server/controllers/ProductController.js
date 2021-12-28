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
