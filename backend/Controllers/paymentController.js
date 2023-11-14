const dotenv = require('dotenv')
dotenv.config()
const stripe = require('stripe')(process.env.STRIPE_KEY);


exports.payments = async (req, res) => {
  try {
    const { amount } = req.body
    const intent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'inr',
      automatic_payment_methods: {
        enabled: true
      }
    })
    res.json({ client_secret: intent.client_secret })
  }
  catch(error){
    console.log(error);
  }

}
