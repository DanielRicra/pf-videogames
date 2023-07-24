const genreRouter = require('express').Router()
const {
  getGenres,
  postGenres,
  getManyGenres,
  updateGenre,
  getGenreById,
} = require('../controllers/genreControllers')

genreRouter.get('/', async (req, res) => {
  try {
    const { limit, page, name } = req.query
    const genres = await getGenres({ limit, page, name })

    res.status(200).json(genres)
  } catch (error) {
    res.status(404).send(error.message)
  }
})

genreRouter.get('/:ids', async (req, res) => {
  const ids = req.params.ids.split(',').map(Number)

  try {
    if (ids.length === 1) {
      const genre = await getGenreById(ids.at(0))
      return res.status(200).json(genre)
    }

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

genreRouter.get('/:id', async (req, res) => {
  const { id } = req.params

  try {
      const genre = await getGenreById(id)

      res.status(200).json(genre)
  } catch (error) {
      res.status(500).json({ error: error.message })
  }
})

genreRouter.put('/:id', async (req, res) =>{
  const { id } = req.params;

  try{
      const result = await updateGenre({ body: req.body, id })

      if (result.status === 404) {
          return res.status(404).send(result.message)
      }

      res.status(200).json(result)
  }
  catch(error){
      res.status(500).send(error.message)
  }
})

module.exports = genreRouter
