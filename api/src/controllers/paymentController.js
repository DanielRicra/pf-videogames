require('dotenv').config()
const Stripe = require('stripe')
const { STRIPE_PRIVATE_KEY, STRIPE_WEB_HOOK, CLIENTE_URL } = process.env
const stripe = new Stripe(STRIPE_PRIVATE_KEY)
const { Transaction, User, Cart, Videogame } = require('../db')
const fs = require('fs')
const path = require('path')
const sgMail = require('@sendgrid/mail')
const Handlebars = require('handlebars')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

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
      success_url: `${CLIENTE_URL}`,
      cancel_url: `${CLIENTE_URL}`,
    })

    return res.json({ id: session.id })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}



const sendConfirmationEmail = async (email, name, cartItems) => {
  try {
    const buyEmailPath = path.join(__dirname, '../apiData/emailContent/BuyEmail.html')
    const buyEmailContent = fs.readFileSync(buyEmailPath, 'utf8')

    // Compile the BuyEmail.html template
    const template = Handlebars.compile(buyEmailContent)

    // Prepare the data for rendering the template
    const data = {
      CUSTOMER_NAME: name,
      cartItems: cartItems.map(item => ({
        name: item.name,
        image: item.image,
        price: item.price,
      })),
    }

    // Render the template with the data
    const emailContent = template(data)

    const msg = {
      to: email,
      from: 'pfvideogames@gmail.com',
      subject: '¡Gracias por tu compra!',
      html: emailContent,
    }

    await sgMail.send(msg)
    console.log('Correo electrónico de confirmación de compra enviado')
  } catch (error) {
    console.error('Error al enviar el correo electrónico de confirmación:', error)
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
      event = stripe.webhooks.constructEvent(req.body.toString(), signature, STRIPE_WEB_HOOK)
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

        const { email, name } = customer.metadata
        const cartItems = cartFound.videogames.map((game) => ({
          name: game.name,
          image: game.image,
          price: game.price,
        }))

        await sendConfirmationEmail(email, name, cartItems)
      })
      .catch((err) => console.log(err.message))
  }

  res.status(200).end()
}

module.exports = { createSession, webhook }
