const express = require("express");
const router = express.Router();

const {
  getProducts,
  newProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/ProductController");

router.route("/products").get(getProducts);
router.route("/product/:id").get(getProduct);
router.route("/admin/product/:id").put(updateProduct).delete(deleteProduct);
router.route("/admin/product/new").post(newProduct);
router.route("/admin/product/").post(newProduct);

module.exports = router;
