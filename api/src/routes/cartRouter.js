const cartRouter = require('express').Router();
const { removeGame, addGame, associateCart } = require('../controllers/cartControllers');
const express = require('express');
const router = express.Router();

cartRouter.post('/add', async (req, res) =>{
    try{

        const cart = await associateCart(req)

        if(cart.error) throw new Error(game.error)

        res.status(200).json(cart)

    }catch(error){
        res.status(404).send(error.message)
    }
})

cartRouter.post('/add/:videogameId', async (req, res) =>{
    try{
        
        const game = await addToCart(req)

        if(game.error) throw new Error(game.error)

        res.status(200).json(game)
    }
    catch(error){
        res.status(404).send(error.message)
    }
})

cartRouter.delete('/remove/:videogameId', async (req, res) =>{
    try{
        
        const game = await removeFromCart(req)

        if(game.error) throw new Error(game.error)

        res.status(200).json(game)
    }
    catch(error){
        res.status(404).send(error.message)
    }
})

module.exports = cartRouter