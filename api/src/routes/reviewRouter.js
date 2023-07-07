const express = require('express');
const router = express.Router();
const { getReviews, getReviewById, postReview, deleteReview, updateReview } = require('../controllers/reviewController');

// Obtener todas las reseñas
router.get('/', (req, res) => getReviews(req, res));

// Obtener una reseña por su ID
router.get('/:id', (req, res) => getReviewById(req, res));

// Crear una nueva reseña
router.post('/:videogameId', (req, res) => postReview(req, res));

// Borrar una reseña
router.delete('/:id', (req, res) => deleteReview(req, res));

// Modificar una reseña
router.put('/:id', (req, res) => updateReview(req, res));

module.exports = router;
