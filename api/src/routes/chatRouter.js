const chatRouter = require('express').Router()
const {
  CreateChat,
  getChat,
  addMessages,
} = require('../controllers/chatController')

chatRouter.post('/', async (req, res) => {
  const { friendShipId } = req.query
  const { message } = req.body

  if (message) {
    try {
      const chat = addMessages({ message, friendShipId })
      res.status(200).json(chat)
    } catch (error) {
      res.status(404).send(error.message)
    }
  } else {
    try {
      const chat = await getChat(friendShipId)

      /* if (chat.error) throw new Error(chat.error) */

      res.status(200).json(chat)
    } catch (error) {
      res.status(404).send(error.message)
    }
  }
})

module.exports = chatRouter
