const { Videogame, Genre, Tag }= require('../db.js')


const postVideogames = async (videogame) => { 
    try {
        
        const { name,image, description, releaseDate, rating, genres, tags, price, stock } = videogame;

        if(  !name || !image || !description || !releaseDate || !rating || !price || !stock || !genres.length || !tag.length ) throw new Error('Faltan datos obligatorios')
        

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

module.exports = postVideogames;