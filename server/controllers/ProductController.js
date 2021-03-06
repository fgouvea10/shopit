const cloudinary = require("cloudinary");
const Product = require("../models/Product");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/CatchAsyncErrors");
const APIFeatures = require("../utils/apiFeatures");

exports.newProduct = catchAsyncErrors(async (request, response, next) => {
  let images = [];
  let imagesLinks = [];

  if (typeof request.body.images === "string") {
    images.push(request.body.images);
  } else {
    images = request.body.images;
  }

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  request.body.images = imagesLinks;
  request.body.user = request.user.id;

  const product = await Product.create(request.body);

  response.status(201).json({
    success: true,
    product,
  });
});

exports.getProducts = catchAsyncErrors(async (request, response, next) => {
  const resPerPage = 4;
  const productsCount = await Product.countDocuments();

  const apiFeatures = new APIFeatures(Product.find(), request.query)
    .search()
    .filter();

  let products = await apiFeatures.query;
  let filteredProductsCount = products.length;

  apiFeatures.pagination(resPerPage);
  products = await apiFeatures.query.clone();

  response.status(200).json({
    success: true,
    productsCount,
    resPerPage,
    filteredProductsCount,
    products,
  });
});

exports.getAdminProducts = catchAsyncErrors(async (request, response, next) => {
  const products = await Product.find();

  response.status(200).json({
    success: true,
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

exports.createProductReview = catchAsyncErrors(
  async (request, response, next) => {
    const { rating, comment, productId } = request.body;

    const review = {
      user: request.user._id,
      name: request.user.name,
      rating: Number(rating),
      comment,
    };

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
      (r) => r.user.toString() === request.user._id.toString()
    );

    if (isReviewed) {
      product.reviews.forEach((review) => {
        if (review.user.toString() === request.user._id.toString()) {
          review.comment = comment;
          review.rating = rating;
        }
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }

    product.ratings =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save({ validateBeforeSave: false });

    response.status(200).json({
      success: true,
    });
  }
);

exports.getProductReviews = catchAsyncErrors(
  async (request, response, next) => {
    const product = await Product.findById(request.query.id);

    response.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  }
);

exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  console.log(product);

  const reviews = product.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString()
  );

  const numOfReviews = reviews.length;

  const ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
