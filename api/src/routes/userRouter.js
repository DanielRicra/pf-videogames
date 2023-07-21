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
  deleteFavorite
} = require('../controllers/userController')

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
userRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const user = await getUserById(id)
    res.status(200).json(user)
  } catch (error) {
    res.status(404).send(error.message)
  }
})

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
  try {
    const { id } = req.params
    const { name, email, password, banned } = req.body
    const newData = { name, email, password, banned }
    const message = await updateUser(id, newData)
    res.status(200).send(message)
  } catch (error) {
    res.status(400).send(error.message)
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
