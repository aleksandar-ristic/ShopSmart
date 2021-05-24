const catchAsyncErrors = require('../middleware/catchAsyncErrors')

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

// Process stripe payments => /api/v1/payment/process
exports.processPayment = catchAsyncErrors( async( req, res, next) => {
  const paymentIntent = await stripe.paymentIntent.create({
    amount: req.body.amount,
    currency: 'usd',
    metadata: { integration_check: 'accept_a_payment'}
  });

  res.status(200).json({
    success: true,
    client_Secret: paymentIntent.client_Secret
  });
})

// Send stripe API Key => /api/v1/stripeapi
exports.sendStripeApi = catchAsyncErrors( async( req, res, next) => {
  

  res.status(200).json({
    clientApiKey: proess.env.STRIPE_API_KEY
  });
})