const genreRouter = require('express').Router();
const { getGenres } = require('../controllers/genreControllers');

genreRouter.get('/', async (req, res) =>{
    try {
        console.log('llegue a genreRouter')
        const genres = await getGenres();

        res.status(200).json(genres);
    } catch (error) {
        res.status(404).send(error.message)
    }
})

module.exports = genreRouter