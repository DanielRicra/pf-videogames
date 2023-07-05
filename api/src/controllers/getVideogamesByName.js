const { Op } = require('sequelize');
const { Videogame, Genre, Tag }= require('../db')

const getVideogamesByName = async ( searchedName ) =>{
    try{
        let videogamesFound = await Videogame.findAll({
            where:{
                name: {
                    [Op.iLike]: '%'+searchedName+'%',
                }
            },
            include: Genre,
            include: Tag
        });
        return videogamesFound;
    }
    catch (error) {
        return {error: error.message}
    }
}

module.exports = getVideogamesByName;