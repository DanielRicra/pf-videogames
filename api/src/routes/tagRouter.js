const tagRouter = require('express').Router()
const { getTags, getManyTags } = require('../controllers/tagControllers')

tagRouter.get('/', async (req, res) => {
    const { limit, page, name } = req.query

    try {
        const tags = await getTags({ limit, page, name })

        res.status(200).json(tags)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

tagRouter.get('/:ids', async (req, res) => {
    const ids = req.params.ids.split(',').map(Number)

    try {
        const tags = await getManyTags(ids)

        res.status(200).json(tags)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

module.exports = tagRouter
