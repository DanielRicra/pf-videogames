const { Cart, Videogame, User } = require('../db'); // Importa los modelos necesarios

const addToCart = async (req, res) => {
  try {
    const { videogameId } = req.params;
    const { userEmail } = req.body;

    const videogame = await Videogame.findByPk(videogameId);

    if (!videogame) {
      throw new Error('Videojuego no encontrado');
    }

    const user = await User.findOne({ where: { email: userEmail } });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    let cart = await Cart.findOne({ where: { userId: user.id , status: true } });

    if (!cart) {
      cart = await Cart.create({ userId: user.id });
    }

    await cart.addVideogame(videogame);

    return cart;
  } catch (error) {
    console.error('Error al agregar videojuego al carrito:', error);
    throw new Error('Error interno del servidor');
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { userEmail } = req.body;
    const { videogameId } = req.params;

    const user = await User.findOne({ where: { email: userEmail } });
    
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const cart = await Cart.findOne({ where: { userId: user.id , status: true } });
    const videogame = await Videogame.findByPk(videogameId);

    if (!cart || !videogame) {
      throw new Error('Usuario o videojuego no encontrado');
    }

    await cart.removeVideogame(videogame);

    return cart;
  } catch (error) {
    console.error('Error al eliminar videojuego del carrito:', error);
    throw new Error('Error interno del servidor');
  }
};

const associateCart = async (req, res) => {
  try {
    const { userEmail, videogamesId } = req.body;

    const user = await User.findOne({ where: { email: userEmail } });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    let cart = await Cart.findOne({ where: { userId: user.id, status: true } });

    if (!cart) {
      cart = await Cart.create({ userId: user.id });
    }

    await Promise.all(videogamesId.map(async videogameId => {
      const videogame = await Videogame.findByPk(videogameId);
      if (videogame) {
        await cart.addVideogame(videogame);
      }
    }));

    return cart;
  } catch (error) {
    console.error('Error al asociar el carrito:', error);
    throw new Error('Error interno del servidor');
  }
};

const getCart = async (req, res) => {
  try {
    const { userEmail } = req.body;

    const user = await User.findOne({ where: { email: userEmail } });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    let cart = await Cart.findOne({ where: { userId: user.id, status: true }, include: Videogame });

    if (!cart) {
      cart = await Cart.create({ userId: user.id });
    }

    return cart;
  } catch (error) {
    console.error('Error al buscar el carrito:', error);
    throw new Error('Error interno del servidor');
  }
};

module.exports = {
  addToCart,
  removeFromCart,
  associateCart,
  getCart
};
