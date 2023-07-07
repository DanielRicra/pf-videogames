const tagRouter = require('express').Router();
const { getTags } = require('../controllers/tagControllers');

tagRouter.get('/', async (req, res) =>{
    try {
        const tags = await getTags();

        res.status(200).json(tags);
    } catch (error) {
        res.status(404).send(error.message)
    }
})

module.exports = tagRouter