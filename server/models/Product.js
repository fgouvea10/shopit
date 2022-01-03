const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name must be provided"],
    trim: true,
    maxlength: [100, "Product name cannot exceed 100 characters"],
  },
  price: {
    type: Number,
    required: [true, "Product price must be provided"],
    maxlength: [5, "Product price cannot exceed 5 characters"],
  },
  description: {
    type: String,
    required: [true, "Product description must be provided"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Product category must be provided"],
    enum: {
      values: [
        "Electronics",
        "Cameras",
        "Laptop",
        "Accessories",
        "Headphones",
        "Food",
        "Books",
        "Clothes/Shoes",
        "Beauty/Healthy",
        "Sports",
        "Outdoor",
        "Home",
      ],
      message: "Product category must be provided",
    },
  },
  seller: {
    type: String,
    required: [true, "Product seller must be provided"],
  },
  stock: {
    type: Number,
    required: [true, "Product stock must be provided"],
    maxlength: [5, "Product stock cannot exceed 5 characters"],
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
