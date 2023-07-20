const cartRouter = require('express').Router();
const { removeFromCart, addToCart, associateCart, getCart, getManyCarts } = require('../controllers/cartControllers');

cartRouter.get('/', async (req, res) =>{
    try{
        const cart = await getCart(req, res)

        if(cart.error) throw new Error(cart.error)

        res.status(200).json(cart)
    } catch(error){
        res.status(404).send(error.message)
    }
})

cartRouter.get('/:ids', async (req, res) =>{
    const { ids } = req.params.ids.split(',').map(Number)
    try{
        const cart = await getManyCarts(ids)

        res.status(200).json(cart)
    } catch(error){
        res.status(404).send(error.message)
    }
})

cartRouter.post('/add', async (req, res) =>{
    try{

        const cart = await associateCart(req, res)

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
        res.status(200).json(game)
    }
    catch(error){
        res.status(404).send(error.message)
    }
})

cartRouter.delete('/remove/:videogameId', async (req, res) =>{
    try{
        
        const game = await removeFromCart(req, res)

        if(game.error) throw new Error(game.error)
        res.status(200).json(game)
    }
    catch(error){
        res.status(404).send(error.message)
    }
})

module.exports = cartRouter