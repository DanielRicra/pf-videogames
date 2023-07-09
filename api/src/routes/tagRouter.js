const tagRouter = require('express').Router()
const { getTags } = require('../controllers/tagControllers')

tagRouter.get('/', async (req, res) => {
    const { limit, page, searchQuery } = req.query

    try {
        const tags = await getTags({ limit, page, searchQuery })

        res.status(200).json(tags)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

module.exports = tagRouter
