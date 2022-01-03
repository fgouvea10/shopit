const express = require("express");
const router = express.Router();

const { newOrder } = require("../controllers/OrderController");
const { isAuthenticated, authorizeRoles } = require("../middlewares/Auth");

router.route("/order/new").post(isAuthenticated, newOrder);

module.exports = router;
