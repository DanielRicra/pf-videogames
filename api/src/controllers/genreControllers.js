const { Genre }= require('../db');

const getGenres = async () => {
    try {
        let allGenres = await Genre.findAll();

        return allGenres;
    } catch (error) {
        return {error: error.message}
    }
};

module.exports = {
    getGenres
};