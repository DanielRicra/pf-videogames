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

    // Obtener el carrito del usuario o crear uno nuevo si no existe
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

    // Eliminar el videojuego del carrito
    await cart.removeVideogame(videogame);

    return cart
  } catch (error) {
    console.error('Error al eliminar videojuego del carrito:', error);
    throw new Error('Error interno del servidor');
  }
};

const associateCart = async (req,res) =>{
  try{
    const { userEmail, videogameIds } = req.body

    const user = await User.findOne({ where: { email: userEmail } });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    let cart = await Cart.findOne({ where: { userId: user.id, status: true } });

    if (!cart) {
      cart = await Cart.create({ userId: user.id });
    }

    await cart.addVideogames(videogameIds)

    return cart
  } catch(error) {
    console.error('Error al asociar el carrito', error)
    return new Error('Error interno del servidor');
  }
}

const getCart = async (req,res) =>{
  try{
    const { userEmail } = req.query

    if (!userEmail) throw new Error('Bad request, userEmail required');

    const user = await User.findOne({ where: { email: userEmail } });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    let cart = await Cart.findOne({ 
      where: { userId: user.id, status: true },
      include: [{ model: Videogame, through: { attributes: [] }}] 
    });

    if (!cart) {
      cart = await Cart.create({ userId: user.id });
    }

    return cart
  } catch(error){
    throw new Error ('Internal server error')
  }
}

module.exports = {
  addToCart,
  removeFromCart,
  associateCart,
  getCart
};