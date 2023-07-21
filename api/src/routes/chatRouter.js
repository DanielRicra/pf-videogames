const chatRouter = require('express').Router()
const { CreateChat, getChat } = require('../controllers/chatController')

chatRouter.get('/', async (req, res) => {
  /* const {} = req.body */
  try {
    const chat = await getChat(req, res)

    if (chat.error) throw new Error(chat.error)

    res.status(200).json(chat)
  } catch (error) {
    res.status(404).send(error.message)
  }
})

chatRouter.post('/', async (req, res) => {
  try {
    const chat = await CreateChat(req, res)

    if (chat.error) throw new Error(cchatart.error)

    res.status(200).json(chat)
  } catch (error) {
    res.status(404).send(error.message)
  }
})
