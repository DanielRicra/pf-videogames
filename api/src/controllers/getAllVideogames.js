const { Videogame, Genre, Tag } = require('../db')

const getAllVideogames = async () => {
    try {
        
        const allVideogames = await Videogame.findAll({ include: Genre } , { include: Tag})
        return allVideogames

    } catch (error) {
        return {error: error.message}
    }
};

module.exports = getAllVideogames;