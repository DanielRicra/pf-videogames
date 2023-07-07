const server = require('./src/app.js')
const { conn, Videogame, Tag, Genre } = require('./src/db.js')
const { uploadTags, uploadGenres } = require('./src/utils/helpers.js')

const PORT = 3001

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  uploadGenres(Genre)
  uploadTags(Tag)

  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
  })
})
