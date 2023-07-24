const { server } = require('./src/app.js')
const { conn, Tag, Videogame, Genre } = require('./src/db.js')
const {
  uploadVideogames,
  uploadTags,
  uploadGenres,
} = require('./src/utils/helpers.js')

const PORT = process.env.PORT || 3001

conn.sync({ force: false }).then(() => {
   uploadGenres(Genre)
   uploadTags(Tag)
   uploadVideogames(Videogame)

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on https://localhost:${PORT}`)
  })
})
