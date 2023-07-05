const { Genre }= require('../db');
const genre = require('../apiData/Genre.json')


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

module.exports = {
    getGenres
};