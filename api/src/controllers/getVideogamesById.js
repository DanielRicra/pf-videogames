
const { Videogame, Genre }= require('../db')

const getVideogamesById = async ( searchedId ) =>{
    try{
        let dbVideogame = await Videogame.findByPk(searchedId,{ include: Genre },{ include: Tag});
        
        return dbVideogame
    }
    catch (error) {
        return {error: error.message}
    }
}

module.exports = getVideogamesById;