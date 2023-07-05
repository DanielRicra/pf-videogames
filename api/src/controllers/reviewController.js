
const { Review } = require('../db');

// Obtener todas las reviews
const getReviews = async () => {
  try {
    const reviews = await Review.findAll();
    return reviews;
  } catch (error) {
    throw new Error('Error al obtener las reviews');
  }
};

// Obtener una review por su ID
const getReviewById = async (id) => {
  try {
    const review = await Review.findByPk(id);
    if (!review) {
      throw new Error('No se encontró ninguna review con ese ID');
    }
    return review;
  } catch (error) {
    throw new Error('Error al obtener la review');
  }
};

// Crear una nueva review
const postReview = async (score, text) => {
  try {
    const newReview = await Review.create({
      score,
      text,
    });
    return newReview;
  } catch (error) {
    throw new Error('Error al crear la review');
  }
};

// Borrar una review por su ID
const deleteReview = async (id) => {
  try {
    const review = await Review.findByPk(id);
    if (!review) {
      throw new Error('No se encontró ninguna review con ese ID');
    }
    await review.destroy();
    return 'Review eliminada exitosamente';
  } catch (error) {
    throw new Error('Error al borrar la review');
  }
};

// Modificar una review por su ID
const updateReview = async (id, newData) => {
  try {
    const review = await Review.findByPk(id);
    if (!review) {
      throw new Error('No se encontró ninguna review con ese ID');
    }
    await review.update(newData);
    return 'Review actualizada exitosamente';
  } catch (error) {
    throw new Error('Error al actualizar la review');
  }
};

module.exports = {
  getReviews,
  getReviewById,
  postReview,
  deleteReview,
  updateReview,
};
