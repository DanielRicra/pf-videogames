
const { Review, Videogame } = require('../db');

// Obtener todas las reviews
const getReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

// Obtener una review por su ID
const getReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findByPk(id);
    if (!review) {
      throw new Error('No se encontró ninguna review con ese ID');
    }
    res.status(200).json(review);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

// Crear una nueva review
const postReview = async (req, res) => {
  try {
    const { score, text } = req.body;
    const { videogameId } = req.params;

    // Verificar si el videojuego existe
    const videogame = await Videogame.findByPk(videogameId);
    if (!videogame) {
      throw new Error('No se encontró el videojuego');
    }

    // Crear la nueva reseña y establecer la relación con el videojuego
    const newReview = await Review.create({
      score,
      text,
      videogameId,
    });

    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Borrar una review por su ID
const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findByPk(id);
    if (!review) {
      throw new Error('No se encontró ninguna review con ese ID');
    }
    await review.destroy();
    res.sendStatus(204);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

// Modificar una review por su ID
const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { score, text } = req.body;
    const review = await Review.findByPk(id);
    if (!review) {
      throw new Error('No se encontró ninguna review con ese ID');
    }
    await review.update({ score, text });
    res.status(200).json(review);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getReviews,
  getReviewById,
  postReview,
  deleteReview,
  updateReview,
};
