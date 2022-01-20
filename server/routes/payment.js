const express = require("express");
const router = express.Router();

const { processPayment } = require("../controllers/PaymentController");
const { isAuthenticated } = require("../middlewares/Auth");

router.route("/payment/process").post(isAuthenticated, processPayment);

module.exports = router;
