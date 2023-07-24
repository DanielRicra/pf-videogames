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
      let randomPrice = Math.random() * (40 - 5) + 5
      let randomPriceRounded = randomPrice.toFixed(2)
      vg.price = randomPriceRounded
      vg.stock = true
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

const validateUser = ({ name, email, nickname, banned }) => {
  let error = ''
  if (!name || !email || !nickname || banned === undefined) {
    error = 'Missing all fields'
  } else if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof nickname !== 'string' ||
    typeof banned !== 'boolean'
  ) {
    error = 'Invalid type'
  } else if (name.trim() === '' || email.trim() === '' || nickname.trim() === '') {
    error = 'Empty fields'
  }

  return error
}

module.exports = {
  uploadVideogames,
  uploadTags,
  uploadGenres,
  validateUser,
}
