const { Tag } = require('../db')
const { Op } = require('sequelize')

const getTags = async ({ searchQuery = '', page = 1, limit = 10 }) => {
    if (isNaN(page) || isNaN(limit)) {
        throw new Error('Page or limit must be numbers')
    }

    try {
        let foundedTags = await Tag.findAll({
            where: { name: { [Op.iLike]: `%${searchQuery}%` } },
            offset: (page - 1) * limit,
            limit,
            order: [['id', 'ASC']],
        })

        return foundedTags
    } catch (error) {
        return { error: error.message }
    }
}

module.exports = {
    getTags,
}
