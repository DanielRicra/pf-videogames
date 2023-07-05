const { Videogame, Genre, Tag } = require('../db')
const { Op } = require('sequelize');
const videogame = require('../apiData/Videogame.json')

const getAllVideogames = async () => {
    try {
        
        let allVideogames = await Videogame.findAll({ include: [Genre , Tag]})
        if(!allVideogames.length){
            videogamesUpload()
            allVideogames = await Videogame.findAll({ include: [Genre , Tag]})
        }
        return allVideogames

    } catch (error) {
        return {error: error.message}
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

const getVideogamesByName = async ( searchedName ) =>{
    try{
        let videogamesFound = await Videogame.findAll({
            where:{
                name: {
                    [Op.iLike]: '%'+searchedName+'%',
                }
            },
            include: [Genre, Tag]
        });
        return videogamesFound;
    }
    catch (error) {
        return {error: error.message}
    }
}

const postVideogames = async (videogame) => { 
    try {
        
        const { name,image, description, releaseDate, rating, genres, tags, price, stock } = videogame;

        if(  !name || !image || !description || !releaseDate || !rating || !price || !stock || !genres.length || !tags.length ) throw new Error('Faltan datos obligatorios')
        

        let newVideogame = await Videogame.create({
            name,image, description, releaseDate, rating, price, stock
        });


        await newVideogame.addGenres(genres)
        await newVideogame.addTags(tags)

        return newVideogame;

    } catch (error) {
        return {error: error.message};
    }
    
}

videogamesUpload = () =>{
    try {
        let uniqueArr = Object.values(videogame.reduce((accumulator, obj) => {
            accumulator[obj.id] = obj;
            return accumulator;
          }, {}));
        uniqueArr.map( async vg =>{
            let newVg = await Videogame.create(vg)
            await newVg.addTags(vg.tags)
            await newVg.addGenres(vg.genres)
        })

    } catch (error) {

      console.log('Error al leer el archivo JSON:', error);
    
    }
}

module.exports = {
    getAllVideogames,
    getVideogamesById,
    getVideogamesByName,
    postVideogames,
  };
  