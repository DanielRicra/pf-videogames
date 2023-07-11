require('dotenv').config()
const Stripe = require('stripe')
const { STRIPE_PRIVATE_KEY } = process.env
const stripe = new Stripe(STRIPE_PRIVATE_KEY)

const createSession = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            product_data: {
              name: 'Laptop',
            },
            currency: 'usd',
            unit_amount: 2000,
          },
          quantity: 1,
        },
        {
          price_data: {
            product_data: {
              name: 'TV',
            },
            currency: 'usd',
            unit_amount: 1000,
          },
          quantity: 2,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    })

    console.log(session)
    return res.json(session)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

module.exports = createSession
