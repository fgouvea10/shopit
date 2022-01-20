const express = require("express");
const router = express.Router();

const { processPayment, sendStripeApi } = require("../controllers/PaymentController");
const { isAuthenticated } = require("../middlewares/Auth");

router.route("/payment/process").post(isAuthenticated, processPayment);
router.route("/stripeapi").get(isAuthenticated, sendStripeApi);

module.exports = router;
