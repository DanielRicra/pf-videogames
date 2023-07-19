const { Genre }= require('../db');
const genre = require('../apiData/Genre.json')
const { Op } = require('sequelize');
const Sequelize = require('sequelize')
const shortid = require('shortid')

const getGenres = async ({ name = '', page = 1, limit = 10 }) => {
  if (isNaN(page) || isNaN(limit)) {
      throw new Error('Page or limit must be numbers')
  }

  try {
      let foundedGenres = await Genre.findAll({
          where: { name: { [Op.iLike]: `%${name}%` } },
          offset: (page - 1) * limit,
          limit,
          order: [['id', 'ASC']],
      })

      const totalGenres = await Genre.count({
          distinct: true,
          col: 'id',
          where: { name: { [Op.iLike]: `%${name}%` } },
          order: [['id', 'ASC']],
      });

      const result = {
          totalresults: totalGenres,
          nextPage: null,
          prevPage: null,
          results: foundedGenres
      };

      const currentPage = parseInt(page)
      const totalPages = Math.ceil(totalGenres / parseInt(limit));

      if (currentPage < totalPages) {
          result.nextPage = currentPage + 1;
      }

      if (currentPage > 1) {
          result.prevPage = currentPage - 1;
      }

      return result
  } catch (error) {
      return { error: error.message }
  }
}

const getManyGenres = async (ids) => {
    try {
        let allGenres = await Genre.findAll({
            where: { id: ids },
        });

        return allGenres;
    } catch (error) {
        return {error: error.message}
    }
}


const genreUpload = () => {
    try {
      
        Genre.bulkCreate(genre)

    } catch (error) {

      console.log('Error al leer el archivo JSON:', error);
    
    }
  };

  const postGenres = async (genre) => { 
    try {
        const { name } = genre;
        // Normalizar el nombre del género (eliminando todos los espacios)
        const normalizedName = name.replace(/\s/g, '');
      
        const existingGenre = await Genre.findOne({
          where: Sequelize.where(
            Sequelize.fn('LOWER', Sequelize.fn('REPLACE', Sequelize.col('name'), ' ', '')),
            Sequelize.fn('LOWER', normalizedName)
          )
        });
      
        if (existingGenre) {
          // El género similar ya existe en la base de datos
          console.log('El género similar ya existe en la base de datos.');
          return { message: 'El género similar ya existe en la base de datos.' };
        }
      
        const uniqueID = Date.now();
        const newGenre = await Genre.create({ name: normalizedName, id: uniqueID });
      
        console.log('Nuevo género creado:', newGenre.name);
        return { message: 'Nuevo género creado', genre: newGenre };
      } catch (error) {
        console.error('Error al buscar o crear el género:', error);
        return { error: 'Error al buscar o crear el género' };
      }
      
}

module.exports = {
    getGenres,
    postGenres,
    getManyGenres
};