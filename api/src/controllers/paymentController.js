require('dotenv').config()
const Stripe = require('stripe')
const { STRIPE_PRIVATE_KEY, STRIPE_WEB_HOOK } = process.env
const stripe = new Stripe(STRIPE_PRIVATE_KEY)

const createSession = async (req, res) => {
  const customer = await stripe.customers.create({
    metadata: {
      userId: req.body.userId,
      cart: JSON.stringify(req.body),
    },
  })
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
      customer: customer.id,
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    })

    return res.json({ url: session.url })
  } catch (error) {
    return res.status(500).json({ message: error.message })
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
        console.log(
          '🚀 ~ file: paymentController.js:80 ~ .then ~ customer:',
          customer
        )
        console.log(
          '🚀 ~ file: paymentController.js:80 ~ .then ~ customer:',
          data
        )
        /* try {
          // CREATE ORDER
          createOrder(customer, data)
        } catch (err) {
          console.log(typeof createOrder)
          console.log(err)
        } */
      })
      .catch((err) => console.log(err.message))
  }

  res.status(200).end()
}

module.exports = { createSession, webhook }
