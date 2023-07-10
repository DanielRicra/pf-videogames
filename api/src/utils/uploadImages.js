require('dotenv').config()
const cloudinary = require('cloudinary').v2
const videogames = require('../apiData/Videogame.json')
const uploadsStats = require('./uploadsStats.json')
const fs = require('fs')

const { CLOUD_NAME, API_KEY, API_SECRET } = process.env

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
  secure: true,
})

async function uploadImage({ id, imagePath }) {
  try {
    const result = await cloudinary.uploader.upload(imagePath, {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      folder: 'Videogames',
      public_id: id.toString(),
      transformation: [{ width: 1920, height: 1080, crop: 'fill' }],
    })
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const getResizedImageURL = (publicId) => {
  let image = cloudinary.image(publicId, {
    transformation: [{ width: 750, aspect_ratio: '16:9', crop: 'fill' }],
  })

  return image
}

async function main() {
  let counter = 1
  const failedUploads = []
  const successUploads = []

  for (const videogame of videogames) {
    try {
      const result = await uploadImage({
        id: videogame.id,
        imagePath: videogame.image,
      })
      successUploads.push({ id: videogame.id, image: result.secure_url })
      console.log(
        `✔ ${counter++} -> Success upload img for VG id: ${videogame.id}`
      )
    } catch (error) {
      failedUploads.push(videogame.id)
      console.log(
        `❌ ${counter++} -> Failed to upload img for VG id: ${
          videogame.id
        }, error: ${error.message}`
      )
    }
  }
  // const imgTag = getResizedImageURL(result.public_id) // ex: <img src='...url'/>

  // save failedUploads and successUploads in a json file
  const jsonData = {
    failedUploads,
    successUploads,
  }
  const jsonContent = JSON.stringify(jsonData)

  fs.writeFile('uploadsStats.json', jsonContent, 'utf8', function (err) {
    if (err) {
      console.log('An error occurred while writing JSON Object to File.')
      return console.log(err)
    }
    console.log('JSON file has been saved.')
  })
}

function replaceImgProperty() {
  for (let i = 0; i < videogames.length; i++) {
    const videogame = videogames[i]
    const uploadedStat = uploadsStats.successUploads.find(
      (vg) => vg.id === videogame.id
    )
    if (uploadedStat) {
      videogame.image = uploadedStat.image
    }
  }

  const newData = JSON.stringify(videogames)
  fs.writeFileSync('./src/apiData/Videogame.json', newData, (err) => {
    if (err) {
      console.log(err)
    }
    console.log('File written successfully\n')
  })
}
