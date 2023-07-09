const videogames = require('../apiData/Videogame.json')
const tags = require('../apiData/Tag.json')
const genres = require('../apiData/Genre.json')

const uploadVideogames = (Videogame) => {
  try {
    let uniqueArr = Object.values(
      videogames.reduce((accumulator, obj) => {
        accumulator[obj.id] = obj
        return accumulator
      }, {})
    )
    uniqueArr.map(async (vg) => {
      let newVg = await Videogame.create(vg)
      await newVg.addTags(vg.tags)
      await newVg.addGenres(vg.genres)
    })
    console.log('Videogames uploaded')
  } catch (error) {
    console.log('Error uploading videogames: ', error)
  }
}

const uploadTags = (Tag) => {
  try {
    const uniqueArr = Object.values(
      tags.reduce((accumulator, obj) => {
        accumulator[obj.id] = obj
        return accumulator
      }, {})
    )
    Tag.bulkCreate(uniqueArr).then(() => {
      console.log('Tags uploaded')
    })
  } catch (error) {
    console.log('Error uploading tags: ', error)
  }
}

const uploadGenres = (Genre) => {
  try {
    Genre.bulkCreate(genres).then(() => {
      console.log('Genres uploaded')
    })
  } catch (error) {
    console.log('Error uploading genres: ', error)
  }
}

module.exports = {
  uploadVideogames,
  uploadTags,
  uploadGenres,
}