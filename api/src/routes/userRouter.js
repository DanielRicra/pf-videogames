const express = require('express');
const userRouter = express.Router();
const {
  getUsers,
  getUserById,
  postUser,
  deleteUser,
  updateUser,
} = require('../controllers/userController');

// Obtener todos los usuarios
userRouter.get('/', async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// Obtener un usuario por su ID
userRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// Crear un nuevo usuario
userRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await postUser(name, email, password);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Borrar un usuario por su ID
userRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const message = await deleteUser(id);
    res.status(200).send(message);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// Modificar un usuario por su ID
userRouter.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const newData = { name, email, password };
    const message = await updateUser(id, newData);
    res.status(200).send(message);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = userRouter;
