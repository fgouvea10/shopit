const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/CatchAsyncErrors");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment = catchAsyncErrors(async (request, response, next) => {
  const paymentIntent = await stripe.paymentIntent.create({
    amount: request.body.amount,
    currency: "usd",
    metadata: {
      integration_check: "accept_a_payment",
    },
  });

  response.status(200).json({
    success: true,
    client_Secret: paymentIntent.client_Secret,
  });
});
