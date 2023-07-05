const { User } = require('../db');

// Obtener todos los usuarios
const getUsers = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    throw new Error('Error al obtener los usuarios');
  }
};

// Obtener un usuario por su ID
const getUserById = async (id) => {
  try {
    const user = await User.findByPk(id);
    if (!user) throw new Error('Usuario no encontrado');
    return user;
  } catch (error) {
    throw new Error('Error al obtener el usuario por ID');
  }
};

// Crear un nuevo usuario
const postUser = async (name, email, password) => {
  try {
    const newUser = await User.create({ name, email, password });
    return newUser;
  } catch (error) {
    throw new Error('Error al crear el usuario');
  }
};

// Borrar un usuario por su ID
const deleteUser = async (id) => {
    try {
      const user = await User.findByPk(id);
      if (!user) throw new Error('Usuario no encontrado');
  
      await user.destroy();
  
      return 'Usuario borrado exitosamente';
    } catch (error) {
      throw new Error('Error al borrar el usuario');
    }
  };
  
  // Modificar un usuario por su ID
  const updateUser = async (id, newData) => {
    try {
      const user = await User.findByPk(id);
      if (!user) throw new Error('Usuario no encontrado');
  
      await user.update(newData);
  
      return 'Usuario actualizado exitosamente';
    } catch (error) {
      throw new Error('Error al modificar el usuario');
    }
  };
  
  module.exports = {
    getUsers,
    getUserById,
    postUser,
    deleteUser,
    updateUser,
  };
  