const express = require('express');
const router = express.Router();
const { getReviews, getReviewById, postReview, deleteReview, updateReview } = require('../controllers/reviewController');

// Obtener todas las reseñas
router.get('/', async (req, res) => {
  try {
    const reviews = await getReviews();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// Obtener una reseña por su ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const review = await getReviewById(id);
    res.status(200).json(review);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// Crear una nueva reseña
router.post('/', async (req, res) => {
  try {
    const { score, text } = req.body;
    const newReview = await postReview(score, text);
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Borrar una reseña
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await deleteReview(id);
    res.sendStatus(204);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// Modificar una reseña
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { score, text } = req.body;
    const updatedReview = await putReview(id, score, text);
    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
