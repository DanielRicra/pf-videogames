const paymentRouter = require('express').Router()
const createSession = require('../controllers/paymentController')

paymentRouter.post('/create-checkout-session', createSession)

module.exports = paymentRouter
