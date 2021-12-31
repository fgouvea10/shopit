const express = require("express");
const router = express.Router();

const {
  getProducts,
  newProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/ProductController");

const { isAuthenticated } = require("../middlewares/auth");

router.route("/products").get(isAuthenticated, getProducts);
router.route("/product/:id").get(getProduct);
router
  .route("/admin/product/:id")
  .put(isAuthenticated, updateProduct)
  .delete(isAuthenticated, deleteProduct);
router.route("/admin/product/new").post(isAuthenticated, newProduct);
router.route("/admin/product/").post(newProduct);

module.exports = router;
