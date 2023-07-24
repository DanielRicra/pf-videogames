const transactionRouter = require('express').Router();
const { getAllTransactions, getTransactionsByUser } = require('../controllers/transactionControllers');

transactionRouter.get('/', async (req, res) =>{

    const { page, limit } = req.query

        try{
            const transactions = await getAllTransactions({page, limit})

            res.status(200).json(transactions)
        } catch(error){
            res.status(404).send(error.message)
        }

})

transactionRouter.get('/:userEmail', async (req, res) =>{
    const { userEmail } = req.params
    const { page, limit } = req.query
    try{
        const transactions = await getTransactionsByUser( {userEmail, page, limit})

        res.status(200).json(transactions)
    } catch(error){
        res.status(404).send(error.message)
    }
})

module.exports = transactionRouter
