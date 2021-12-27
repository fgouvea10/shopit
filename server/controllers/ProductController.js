exports.getProducts = (request, response, next) => {
  response.status(200).json({
    success: true,
  });
};
