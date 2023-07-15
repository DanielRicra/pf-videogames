require('dotenv').config()
const Stripe = require('stripe')
const { STRIPE_PRIVATE_KEY, STRIPE_WEB_HOOK, CLIENTE_URL } = process.env
const stripe = new Stripe(STRIPE_PRIVATE_KEY)
const { Transaction, User, Cart, Videogame } = require('../db')
const createSession = async (req, res) => {
  const { email, cartItems } = req.body
  const customer = await stripe.customers.create({
    metadata: {
      email: email,
    },
  })
  try {
    const line_items = cartItems.map((item) => {
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: [item.image],
            description: item.description,
            metadata: {
              id: item.id,
            },
          },
          unit_amount: parseInt(item.price * 100),
        },
        quantity: 1,
      }
    })
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      customer: customer.id,
      success_url: `${CLIENTE_URL}/cart`,
      cancel_url: `${CLIENTE_URL}/cart`,
    })

    return res.json({ id: session.id })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

const webhook = (req, res) => {
  let data
  let eventType
  let webhookSecret
  // Check if webhook signing is configured.
  if (webhookSecret) {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event
    let signature = req.headers['stripe-signature']
    try {
      event = stripe.webhooks.constructEvent(
        req.body.toString(),
        signature,
        STRIPE_WEB_HOOK
      )
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed:  ${err}`)
      return res.sendStatus(400)
    }
    // Extract the object from the event.
    data = event.data.object
    eventType = event.type
    console.log('🚀 ~ file: paymentController.js:53 ~ webhook ~ event:', event)
  } else {
    // Webhook signing is recommended, but if the secret is not configured in `config.js`,
    // retrieve the event data directly from the request body.
    data = req.body.data.object
    eventType = req.body.type
  }

  // Handle the checkout.session.completed event
  if (eventType === 'checkout.session.completed') {
    stripe.customers
      .retrieve(data.customer)
      .then(async (customer) => {
        const transation = await Transaction.create()
        const userFound = await User.findOne({
          where: { email: customer.metadata.email },
        })
        const cartFound = await Cart.findOne({
          where: { userId: userFound.id, status: true },
          include: Videogame,
        })
        if (!userFound) {
          throw new Error('user not Found')
        }
        if (!cartFound) {
          throw new Error('cart not Found')
        }
        cartFound.dataValues.videogames.map(async (videogame) => {
          await userFound.addVideogame(videogame.dataValues.id)
        })

        await transation.setUser(userFound.dataValues.id)
        await transation.setCart(cartFound.dataValues.id)
        cartFound.status = false
        await cartFound.save()
      })
      .catch((err) => console.log(err.message))
  }

  res.status(200).end()
}

module.exports = { createSession, webhook }
