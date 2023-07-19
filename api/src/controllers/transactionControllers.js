const { Transaction, User, Cart }= require('../db');
const Sequelize = require('sequelize')

const getAllTransactions = async ({ page = 1, limit = 10 }) => {
    if (isNaN(page) || isNaN(limit)) {
        throw new Error('Page or limit must be numbers')
    }
  
    try {
        let foundedTransactions = await Transaction.findAll({
            include: [ User, Cart],
            offset: (page - 1) * limit,
            limit,
            order: [['id', 'ASC']],
        })
  
        const totalTransactions = await Transaction.count({
            distinct: true,
            col: 'id',
            order: [['id', 'ASC']],
        });
  
        const result = {
            totalresults: totalTransactions,
            nextPage: null,
            prevPage: null,
            results: foundedTransactions
        };
  
        const currentPage = parseInt(page)
        const totalPages = Math.ceil(totalTransactions / parseInt(limit));
  
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

  const getTransactionsByUser = async ({ userEmail:userEmail, page = 1, limit = 10 }) => {
    if (isNaN(page) || isNaN(limit)) {
        throw new Error('Page or limit must be numbers')
    }

    try {

        const user = await User.findOne({
            where: {email:userEmail}
        })

        if(!user){
            throw new Error (`Could not find the user with email ${userEmail}`)
        }

        let foundedTransactions = await Transaction.findAll({
            include :[
                {
                    model: User,
                    where: { email: userEmail }
                },
                {
                    model: Cart
                }
            ],
            offset: (page - 1) * limit,
            limit,
            order: [['id', 'ASC']],
        })
  
        const totalTransactions = await Transaction.count({
            include :[
                {
                    model: User,
                    where: { email: userEmail }
                },
                {
                    model: Cart
                }
            ],
            distinct: true,
            col: 'id',
            order: [['id', 'ASC']],
        });
  
        const result = {
            totalresults: totalTransactions,
            nextPage: null,
            prevPage: null,
            results: foundedTransactions
        };
  
        const currentPage = parseInt(page)
        const totalPages = Math.ceil(totalTransactions / parseInt(limit));
  
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

  module.exports = {
    getAllTransactions,
    getTransactionsByUser
};