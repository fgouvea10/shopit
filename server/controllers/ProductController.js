const Product = require("../models/Product");

exports.newProduct = async (request, response, next) => {
  const product = await Product.create(request.body);

  response.status(201).json({
    success: true,
    product,
  });
};

exports.getProducts = (request, response, next) => {
  response.status(200).json({
    success: true,
  });
};
