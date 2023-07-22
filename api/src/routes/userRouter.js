const express = require('express')
const userRouter = express.Router()
const {
  getUsers,
  getUserById,
  postUser,
  deleteUser,
  updateUser,
  getUserByEmail,
  postFavorite,
  deleteFavorite,
} = require('../controllers/userController')
const { validateUser } = require('../utils/helpers')

// Obtener todo los usuarios
userRouter.get('/', async (req, res) => {
  try {
    const users = await getUsers()

    res.status(200).json(users)
  } catch (error) {
    res.status(404).send(error.message)
  }
})

// Obtener un usuario por email
userRouter.get('/:email', async (req, res) => {
  let { email } = req.params
  let users
  try {
    if (isNaN(email)) {
      users = await getUserByEmail(email)
    } else {
      users = await getUserById(email)
    }

    res.status(200).json(users)
  } catch (error) {
    res.status(404).send(error.message)
  }
})

// Obtener un usuario por su ID
userRouter.get('/friend/:id', getUserById);

// Crear un nuevo usuario
userRouter.post('/', postUser)

// Borrar un usuario por su ID
userRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const message = await deleteUser(id)
    res.status(200).send(message)
  } catch (error) {
    res.status(404).send(error.message)
  }
})

// Modificar un usuario por su ID
userRouter.put('/:id', async (req, res) => {
  const { id } = req.params
  const { name, email, nickname, banned, picture } = req.body

  try {

    const error = validateUser({ name, email, nickname, banned })

    if (error) {
      return res.status(400).json({ message: error })
    }
    
    const newData = { name, email, nickname, banned, picture }
  
    const response = await updateUser(id, newData)

    res.status(response.status).send(response.data)
  } catch (error) {
    res.status(500).send(error.message ?? 'Something went wrong')
  }
})

userRouter.post('/favorites', async (req, res) => {
  try {
    const { email, videogameId } = req.query
    const favorite = await postFavorite(email, videogameId)
    res.status(201).send(favorite)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

userRouter.delete('/favorites/:id', async (req, res) => {
  try {
    const { id } = req.params
    await deleteFavorite(id)
    res.status(200).json({ message: 'Successfully deleted' })
  } catch (error) {
    res.status(500).send(error.message)
  }
})

module.exports = userRouter
