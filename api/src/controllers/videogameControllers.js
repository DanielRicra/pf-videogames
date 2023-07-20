const { Videogame, Genre, Tag } = require('../db')
const { Op } = require('sequelize');

const { uploadImage } = require('../utils/uploadImages');
const cloudinary = require('cloudinary').v2;
const MAX_WIDTH = 1920; // Ancho máximo permitido
const MAX_HEIGHT = 1080; // Alto máximo permitido
const MAX_RETRY_COUNT = 10;
const RETRY_DELAY = 10000;
const {
    CLOUD_NAME, API_KEY, API_SECRET
  } = process.env;

cloudinary.config({
  cloud_name: `${CLOUD_NAME}`,
  api_key: `${API_KEY}`,
  api_secret: `${API_SECRET}`
});

const getAllVideogames = async (page, page_size, order, field, genreFilter, tagFilter) => {
  try {
      const defaultPageSize = 10;
      const defaultPage = 1;

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
          limit: page_size ? page_size : defaultPageSize,
          offset: page ? (page - 1) * (page_size ? page_size : defaultPageSize) : 0,
      };

      if (genreFilter) {
          videogameOptions.include[0].where.name = genreFilter;
      }

      if (tagFilter) {
          videogameOptions.include[1].where.name = tagFilter;
      }

      const countOptions = {
          distinct: true,
          col: 'id',
          include: [
              {
                  model: Genre,
                  where: genreFilter ? { name: genreFilter } : {}
              },
              {
                  model: Tag,
                  where: tagFilter ? { name: tagFilter } : {}
              }
          ]
      };

      const allVideogames = await Videogame.findAll(videogameOptions);
      const totalVideogames = await Videogame.count(countOptions);

      const result = {
          totalVideogames: totalVideogames,
          nextPage: null,
          prevPage: null,
          results: allVideogames
      };


      const currentPage = page ? parseInt(page) : defaultPage;
      const totalPages = Math.ceil(totalVideogames / (page_size ? parseInt(page_size) : defaultPageSize));

      if (currentPage < totalPages) {
          result.nextPage = currentPage + 1;
      }

      if (currentPage > defaultPage) {
          result.prevPage = currentPage - 1;
      }


      return result;
  } catch (error) {
      return { error: error.message };
  }
};



const getVideogamesById = async ( searchedId ) =>{
    try{
        let dbVideogame = await Videogame.findByPk(searchedId,{ include: [Genre , Tag]});

        if (!dbVideogame) {
          throw new Error('Videogame not found');
        }
        
        return dbVideogame
    }
    catch (error) {
        throw new Error(error.message || 'Something went wrong')
    }
}

const getVideogamesByName = async ( searchedName,page, page_size, order, field, genreFilter, tagFilter ) =>{
    try{
      const defaultPageSize = 10;
      const defaultPage = 1;
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
      };

      if (genreFilter) {
          videogameOptions.include[0].where.name = genreFilter;
      }

      if (tagFilter) {
          videogameOptions.include[1].where.name = tagFilter;
      }
      const countOptions = {
        distinct: true,
        col: 'id',
        where:{
          name: {
              [Op.iLike]: '%'+searchedName+'%',
          }
        },
        include: [
            {
                model: Genre,
                where: genreFilter ? { name: genreFilter } : {}
            },
            {
                model: Tag,
                where: tagFilter ? { name: tagFilter } : {}
            }
        ]
      };
        
      const videogamesFound = await Videogame.findAll(videogameOptions);
      const totalVideogames = await Videogame.count(countOptions);

      const result = {
          totalResults: totalVideogames,
          nextPage: null,
          prevPage: null,
          results: videogamesFound
      };

      
      const currentPage = page ? parseInt(page) : defaultPage;
      const totalPages = Math.ceil(totalVideogames / (page_size ? parseInt(page_size) : defaultPageSize));

      if (currentPage < totalPages) {
          result.nextPage = currentPage + 1;
      }

      if (currentPage > defaultPage) {
          result.prevPage = currentPage - 1;
      }

      return result;
    }
    catch (error) {
        return {error: error.message}
    }
}

const postVideogames = async (videogame) => { 
    try {
        
        let { name,image, description, releaseDate, rating, genres, tags, price} = videogame;
        const id = Date.now();

        if(  !name || !image || !description || !releaseDate || !rating || !price || !genres.length || !tags.length ) throw new Error('Faltan datos obligatorios')
        
        const response = await cloudinary.uploader.upload(image, { folder: 'Videogames' }, (error) => {
            if (error) {
              console.error(error);
            }
          });

        image=response.secure_url
        let newVideogame = await Videogame.create({
            name,id,image, description, releaseDate, rating, price
        });


        await newVideogame.addGenres(genres)
        await newVideogame.addTags(tags)

        return newVideogame;

    } catch (error) {
        return {error: error.message};
    }
    
}

const updateVideogame = async ({ body, id }) => {
    const { name, description, releaseDate, rating, genres, tags, price, banned } = body
    let { image } = body

    if(!name || !image || !description || !releaseDate || !price || !genres.length || !tags.length ) {
      throw new Error('Bad request, missing fields')
    }

    try {
        const existingVideogame = await Videogame.findByPk(id)
        if (!existingVideogame) {
            return { status: 404, message: 'Videogame not found' }
        }

        if (image !== existingVideogame.image) {
            const result = await uploadImage({ imagePath: image, id })
            image = result.secure_url
        }

        await existingVideogame.update({
            name,
            image,
            description,
            releaseDate,
            rating,
            price,
            stock,
        })
        await existingVideogame.setGenres(genres)
        await existingVideogame.setTags(tags)
        return existingVideogame
    } catch (error) {
        throw new Error(error.message || 'Something went wrong')
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
    updateVideogame,
  };
  