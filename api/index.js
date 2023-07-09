const server = require('./src/app.js')
const { conn } = require('./src/db.js')
// const {
//   uploadVideogames,
//   uploadTags,
//   uploadGenres,
// } = require('./src/utils/helpers.js')

const PORT = 3001

conn.sync({ force: false }).then(() => {
  // uploadGenres(Genre)
  // uploadTags(Tag)
  // uploadVideogames(Videogame)

  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
  })
})
