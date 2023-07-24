const tagRouter = require('express').Router()
const { getTags, getManyTags, updateTag, getTagById, saveNewTag } = require('../controllers/tagControllers')

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
        if (ids.length === 1) {
            const tag = await getTagById(ids.at(0))
            return res.status(200).json(tag)
        }

        const tags = await getManyTags(ids)
        res.status(200).json(tags)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
})

tagRouter.get('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const tag = await getTagById(id)

        res.status(200).json(tag)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

tagRouter.put('/:id', async (req, res) =>{
    const { id } = req.params;

    try{
        const result = await updateTag({ body: req.body, id })

        if (result.status === 404) {
            return res.status(404).send(result.message)
        }

        res.status(200).json(result)
    }
    catch(error){
        res.status(500).send(error.message)
    }
})

tagRouter.post('/', saveNewTag)

module.exports = tagRouter
