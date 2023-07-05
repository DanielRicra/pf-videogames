const { Tag }= require('../db');
const tag = require('../apiData/Tag.json')

const getTags = async () => {
    try {
        let allTags = await Tag.findAll();
        if(!allTags.length){
            tagUpload();
            allTags = await Tag.findAll();
        }
        return allTags;
    } catch (error) {
        return {error: error.message}
    }
};

const tagUpload = () => {
    try {
        const uniqueArr = Object.values(tag.reduce((accumulator, obj) => {
            accumulator[obj.id] = obj;
            return accumulator;
          }, {}));
        Tag.bulkCreate(uniqueArr)

    } catch (error) {

      console.log('Error al leer el archivo JSON:', error);
    
    }
  };


module.exports = {
    getTags
};