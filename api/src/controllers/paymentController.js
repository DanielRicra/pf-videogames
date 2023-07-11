require('dotenv').config()
const Stripe = require('stripe')
const { STRIPE_PRIVATE_KEY } = process.env
const stripe = new Stripe(STRIPE_PRIVATE_KEY)

const createSession = async (req, res) => {
  try {
    const line_items = req.body.map((item) => {
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: [item.image],
            description: item.desc,
            metadata: {
              id: item.id,
            },
          },
          unit_amount: item.price * 100,
        },
        quantity: item.cartQuantity,
      }
    })
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    })

    return res.json({ session: session.url })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

module.exports = createSession
