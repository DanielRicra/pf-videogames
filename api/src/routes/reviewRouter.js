const express = require('express');
const router = express.Router();
const { getReviews, getReviewById, postReview, deleteReview, updateReview, getReviewsByVideogameId } = require('../controllers/reviewController');

// Obtener todas las reseñas
router.get('/', (req, res) => getReviews(req, res));

// Obtener una reseña por su ID
router.get('/:id', (req, res) => getReviewById(req, res));

// Obtener todas las reseñas por videogameId
router.get('/videogame/:videogameId', (req, res) => getReviewsByVideogameId(req, res));

// Crear una nueva reseña
router.post('/', (req, res) => {
    const { score, text, videogameId, userId  } = req.body;
    postReview(score, text, videogameId, userId, req, res);
  });
  

// Borrar una reseña por su ID
router.delete('/:id', (req, res) => deleteReview(req, res));

// Modificar una reseña por su ID
router.put('/:id', (req, res) => updateReview(req, res));

module.exports = router;
