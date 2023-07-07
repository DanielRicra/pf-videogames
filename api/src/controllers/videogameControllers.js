const { Videogame, Genre, Tag } = require('../db')
const { Op } = require('sequelize');

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
            offset: page ? (page - 1) * (page_size ? page_size : 10) : 0
        };

        if (genreFilter) {
            videogameOptions.include[0].where.name = genreFilter;
        }

        if (tagFilter) {
            videogameOptions.include[1].where.name = tagFilter;
        }

        let allVideogames = await Videogame.findAll(videogameOptions);

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
            offset: page ? (page - 1) * (page_size ? page_size : 10) : 0
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

module.exports = {
    getAllVideogames,
    getVideogamesById,
    getVideogamesByName,
    postVideogames,
  };
  