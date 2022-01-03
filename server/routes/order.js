const express = require("express");
const router = express.Router();

const { newOrder, myOrders, getSingleOrder } = require("../controllers/OrderController");
const { isAuthenticated, authorizeRoles } = require("../middlewares/Auth");

router.route("/order/new").post(isAuthenticated, newOrder);
router.route("/order/:id").get(isAuthenticated, getSingleOrder);
router.route("/orders/me").get(isAuthenticated, myOrders);

module.exports = router;
