const { Cart, Videogame, User } = require('../db'); // Importa los modelos necesarios

const addToCart = async (req, res) => {
  try {
    const { videogameId } = req.params;
    const { userEmail } = req.body;

    // Verificar si el videojuego existe
    const videogame = await Videogame.findByPk(videogameId);

    if (!videogame) {
      return res.status(404).json({ error: 'Videojuego no encontrado' });
    }

    // Verificar si el usuario existe
    const user = await User.findOne({ where: { email: userEmail } });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Obtener el carrito del usuario o crear uno nuevo si no existe
    let cart = await Cart.findOne({ where: { userId: user.id , status: true } });

    if (!cart) {
      cart = await Cart.create({ userId: user.id });
    }

    await cart.addVideogame(videogame);

    return res.status(200).json({ message: 'Videojuego agregado al carrito' });
  } catch (error) {
    console.error('Error al agregar videojuego al carrito:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { userEmail } = req.body;
    const { videogameId } = req.params;

    // Verificar si el usuario y el videojuego existen
    const user = await User.findOne({ where: { email: userEmail } });
    const cart = await Cart.findOne({ where: { userId: user.id , status: true } });
    const videogame = await Videogame.findByPk(videogameId);

    if (!cart || !videogame) {
      return res.status(404).json({ error: 'Usuario o videojuego no encontrado' });
    }

    // Eliminar el videojuego del carrito
    await cart.removeVideogame(videogame);

    return res.status(200).json({ message: 'Videojuego eliminado del carrito' });
  } catch (error) {
    console.error('Error al eliminar videojuego del carrito:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const associateCart = async (req,res) =>{
  try{

    const { userEmail, videogamesId } =req.body

    const user = await User.findOne({ where: { email: userEmail } });
    const cart = await Cart.findOne({ where: { userId: user.id, status: true } });

    if (!cart) {
      cart = await Cart.create({ userId: user.id });
    }

    videogamesId.map( async videogame =>{
      await cart.addVideogame(videogame)
    })

    return res.status(200).json({ message: 'Carrito asociado al user con email' + userEmail });

  }catch(error){
    console.error('Error al asociar el carrito')
    return res.status(500).json({error: 'Error interno del servidor'})
  }
}

module.exports = {
  addToCart,
  removeFromCart
};
