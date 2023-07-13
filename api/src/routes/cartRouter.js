const cartRouter = require('express').Router();

const { associateCart, getCart, removeFromCart, addToCart } = require('../controllers/cartControllers');

cartRouter.get('/', async (req, res) =>{
    try{
        await getCart(req, res)
    } catch(error){
        res.status(404).send(error.message)
    }
})

cartRouter.post('/add', async (req, res) =>{
    try{

        const cart = await associateCart(req)

        if(cart.error) throw new Error(cart.error)

        res.status(200).json(cart)

    }catch(error){
        res.status(404).send(error.message)
    }
})

cartRouter.post('/add/:videogameId', async (req, res) =>{
    try{
        
        const game = await addToCart(req, res)

        if(game.error) throw new Error(game.error)
    }
    catch(error){
        res.status(404).send(error.message)
    }
})

cartRouter.delete('/remove/:videogameId', async (req, res) =>{
    try{
        
        const game = await removeFromCart(req, res)

        if(game.error) throw new Error(game.error)
    }
    catch(error){
        res.status(404).send(error.message)
    }
})

module.exports = cartRouter