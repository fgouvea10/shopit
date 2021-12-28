const express = require("express");
const router = express.Router();

const {
  getProducts,
  newProduct,
  getProduct,
  updateProduct,
} = require("../controllers/ProductController");

router.route("/products").get(getProducts);
router.route("/product/:id").get(getProduct);
router.route("/admin/product/:id").put(updateProduct);
router.route("/admin/product/new").post(newProduct);

module.exports = router;
