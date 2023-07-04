const { API_KEY } = process.env;
const { Videogame, Genre }= require('../db')
const axios = require ('axios');

const getVideogamesById = async ( searchedId ) =>{
    try{
        let dbVideogames = await Videogame.findByPk(searchedId,{ include: Genre });
        console.log(dbVideogames)
        if (dbVideogames) return dbVideogames
        let response = await axios(`https://api.rawg.io/api/games/${searchedId}?key=dabc73d2d7c347dbb54c066ae10d71c1`)
        let videogame = response.data
        const result ={
            name:videogame.name,
            id:videogame.id,
            image:videogame.background_image,
            description:videogame.description,
            rating:videogame.rating,
            releaseDate:videogame.released,
            platform:videogame.platforms.map(plat => plat.platform.name),
            GenreId:videogame.genres.map(gen => gen.id)
        }
        return result
    }
    catch (error) {
        return {error: error.message}
    }
}

module.exports = getVideogamesById;