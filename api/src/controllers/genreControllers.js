const { Genre }= require('../db');
const genre = require('../apiData/Genre.json')
const { Op } = require('sequelize');

const getGenres = async () => {
    try {
        let allGenres = await Genre.findAll();
        if(!allGenres.length){
            genreUpload()
            allGenres = await Genre.findAll()
        }
        return allGenres;
    } catch (error) {
        return {error: error.message}
    }
};


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

        if(  !name ) throw new Error('Faltan datos obligatorios')

        const normalizedComparisonName = name.replace(/[^\w]/g, '');

        // Consulta para encontrar el registro específico en base al string de comparación
        let genreFound = await Genre.findOne({
        where: {
            name: {
                [Op.substring]: normalizedComparisonName,
            }
        }
        });

        if (genreFound) {
            const normalizedStoredName = genreFound.name.replace(/[^\w]/g, '');
            console.log(normalizedComparisonName)
            console.log(normalizedStoredName)
            if (normalizedStoredName === normalizedComparisonName) {
                console.log("El género existe en la base de datos.");
                return genreFound;
              }
        return genreFound;
        }

        else {
        console.log("El género no existe en la base de datos.");

        const now = Date.now();
        const id = now.toString();

        let newGenre = await Genre.create({
            name, id
        });
        return newGenre;
        }

    } catch (error) {
        return {error: error.message};
    }
    
}

module.exports = {
    getGenres,
    postGenres
};