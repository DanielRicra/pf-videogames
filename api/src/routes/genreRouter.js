const genreRouter = require('express').Router()
const {
  getGenres,
  postGenres,
  getManyGenres,
} = require('../controllers/genreControllers')

genreRouter.get('/', async (req, res) => {
  try {
    const genres = await getGenres()

    res.status(200).json(genres)
  } catch (error) {
    res.status(404).send(error.message)
  }
})

genreRouter.get('/:ids', async (req, res) => {
  const ids = req.params.ids.split(',').map(Number)

  try {
    const genres = await getManyGenres(ids)

    res.status(200).json(genres)
  } catch (error) {
    res.status(404).send(error.message)
  }
})

genreRouter.post('/', async (req, res) => {
  try {
    const genre = await postGenres(req.body)

    if (genre.error) throw new Error(genre.error)

    res.status(200).json(genre)
  } catch (error) {
    res.status(404).send(error.message)
  }
})

module.exports = genreRouter
