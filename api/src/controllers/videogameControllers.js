const { Videogame, Genre, Tag } = require('../db')
const { Op } = require('sequelize');

const axios = require ('axios')
const sharp = require('sharp');
const cloudinary = require('cloudinary').v2;
const MAX_WIDTH = 1920; // Ancho máximo permitido
const MAX_HEIGHT = 1080; // Alto máximo permitido
const MAX_RETRY_COUNT = 10;
const RETRY_DELAY = 10000;
const {
    TU_CLOUD_NAME, TU_API_KEY, TU_API_SECRET
  } = process.env;

cloudinary.config({
  cloud_name: `${TU_CLOUD_NAME}`,
  api_key: `${TU_API_KEY}`,
  api_secret: `${TU_API_SECRET}`
});

const videogame = require('../apiData/Videogame.json')

const getAllVideogames = async (page, page_size, order, field, genreFilter, tagFilter) => {
    try {
        const videogameOptions = {
            include: [
                {
                    model: Genre,
                    where: {}
                },
                {
                    model: Tag,
                    where: {}
                }
            ],
            order: [[field ? field : 'name', order ? order : 'ASC']],
            limit: page_size ? page_size : 10,
            offset: page ? (page - 1) * (page_size ? page_size : 10) : 0,
            where: {
              stock: {
                  [Op.gt]: 0
              }
            }
        };

        if (genreFilter) {
            videogameOptions.include[0].where.name = genreFilter;
        }

        if (tagFilter) {
            videogameOptions.include[1].where.name = tagFilter;
        }

        let allVideogames = await Videogame.findAll(videogameOptions);/**/

        /*if (!allVideogames.length) {
            videogamesUpload();
            allVideogames = await Videogame.findAll(videogameOptions);
        }*/
        return allVideogames;
    } catch (error) {
        return { error: error.message };
    }
};

const getVideogamesById = async ( searchedId ) =>{
    try{
        let dbVideogame = await Videogame.findByPk(searchedId,{ include: [Genre , Tag]});
        
        return dbVideogame
    }
    catch (error) {
        return {error: error.message}
    }
}

const getVideogamesByName = async ( searchedName,page, page_size, order, field, genreFilter, tagFilter ) =>{
    try{
        const videogameOptions = {
            where:{
                name: {
                    [Op.iLike]: '%'+searchedName+'%',
                }
            },
            include: [
                {
                    model: Genre,
                    where: {}
                },
                {
                    model: Tag,
                    where: {}
                }
            ],
            order: [[field ? field : 'name', order ? order : 'ASC']],
            limit: page_size ? page_size : 10,
            offset: page ? (page - 1) * (page_size ? page_size : 10) : 0,
            where: {
              stock: {
                  [Op.gt]: 0
              }
            }
        };

        if (genreFilter) {
            videogameOptions.include[0].where.name = genreFilter;
        }

        if (tagFilter) {
            videogameOptions.include[1].where.name = tagFilter;
        }
        
        let videogamesFound = await Videogame.findAll(videogameOptions);
        return videogamesFound;
    }
    catch (error) {
        return {error: error.message}
    }
}

const postVideogames = async (videogame) => { 
    try {
        
        let { name,image, description, releaseDate, rating, genres, tags, price, stock } = videogame;
        const now = Date.now();
        const id = now.toString();

        if(  !name || !image || !description || !releaseDate || !rating || !price || !stock || !genres.length || !tags.length ) throw new Error('Faltan datos obligatorios')
        
        const response = await cloudinary.uploader.upload(image, { folder: 'Videogames' }, (error) => {
            if (error) {
              console.error(error);
            }
          });

        image=response.secure_url
        let newVideogame = await Videogame.create({
            name,id,image, description, releaseDate, rating, price, stock
        });


        await newVideogame.addGenres(genres)
        await newVideogame.addTags(tags)

        return newVideogame;

    } catch (error) {
        return {error: error.message};
    }
    
}

/*videogamesUpload = async () => {
    try {
      let uniqueArr = Object.values(videogame.reduce((accumulator, obj) => {
        accumulator[obj.id] = obj;
        return accumulator;
      }, {}));
  
      for (const vg of uniqueArr) {
        let retryCount = 0;
        let success = false;
  
        while (!success && retryCount < MAX_RETRY_COUNT) {
          try {
            const response = await axios.get(vg.image, {
              responseType: 'arraybuffer',
            });
  
            const resizedImageBuffer = await sharp(response.data)
              .resize({ width: MAX_WIDTH, height: MAX_HEIGHT })
              .toBuffer();
  
            const base64Image = resizedImageBuffer.toString('base64');
  
            const cloudinaryResponse = await cloudinary.uploader.upload(
              `data:image/jpeg;base64,${base64Image}`,
              { folder: 'Videogames' }
            );
  
            const randomStock = Math.floor(Math.random() * 21);
            const randomPrice = Math.floor(Math.random() * 36) + 5;
            vg.image = cloudinaryResponse.secure_url;
            vg=[...vg,stock=randomStock,price=randomPrice]
              
            let newVg = await Videogame.create(vg);
            await newVg.addTags(vg.tags);
            await newVg.addGenres(vg.genres);
  
            success = true; // La operación se completó exitosamente
          } catch (error) {
            console.log(`Error al cargar la imagen: ${vg.image}`);
            console.error(error);
  
            retryCount++; // Incrementar el contador de reintento
            await delay(RETRY_DELAY); // Esperar un tiempo antes de intentar nuevamente
          }
        }
      }
    } catch (error) {
      console.log('Error al leer el archivo JSON:', error);
    }
  };
  
  // Función de espera para implementar el retraso entre reintentos
  const delay = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
*/
module.exports = {
    getAllVideogames,
    getVideogamesById,
    getVideogamesByName,
    postVideogames,
  };
  