const { Tag }= require('../db');

const getTags = async () => {
    try {
        let allTags = await Tag.findAll();
        return allTags;
    } catch (error) {
        return {error: error.message}
    }
};

module.exports = {
    getTags
};