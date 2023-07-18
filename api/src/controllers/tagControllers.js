const { Tag } = require('../db')
const { Op } = require('sequelize')

const getTags = async ({ name = '', page = 1, limit = 10 }) => {
    if (isNaN(page) || isNaN(limit)) {
        throw new Error('Page or limit must be numbers')
    }

    try {
        let foundedTags = await Tag.findAll({
            where: { name: { [Op.iLike]: `%${name}%` } },
            offset: (page - 1) * limit,
            limit,
            order: [['id', 'ASC']],
        })

        const totalTags = await Tag.count({
            distinct: true,
            col: 'id',
            where: { name: { [Op.iLike]: `%${name}%` } },
            order: [['id', 'ASC']],
        });

        const result = {
            totalTags: totalTags,
            nextPage: null,
            prevPage: null,
            results: foundedTags
        };

        const currentPage = parseInt(page)
        const totalPages = Math.ceil(totalTags / parseInt(limit));

        if (currentPage < totalPages) {
            result.nextPage = currentPage + 1;
        }

        if (currentPage > 1) {
            result.prevPage = currentPage - 1;
        }

        return result
    } catch (error) {
        return { error: error.message }
    }
}

const getManyTags = async (tagIds) => {
    try {
        let tags = await Tag.findAll({
            where: { id: tagIds },
        })

        return tags
    } catch (error) {
        return { error: error.message }
    }
}

module.exports = {
    getTags,
    getManyTags,
}
