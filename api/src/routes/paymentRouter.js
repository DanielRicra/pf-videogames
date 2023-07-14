const express = require('express')
const { createSession, webhook } = require('../controllers/paymentController')

const paymentRouter = express.Router()

paymentRouter.post('/create-checkout-session', createSession)
paymentRouter.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  webhook
)

module.exports = paymentRouter
