const videogamesRouter = require('express').Router();
const { getAllVideogames, getVideogamesById, getVideogamesByName, postVideogames } = require ('../controllers/videogameControllers')




videogamesRouter.get('/', async ( req, res ) => {
    const { name, page, page_size, order, field, genreFilter, tagFilter } =req.query;
    
    if(name){
        try {
    
            const response = await getVideogamesByName( name, page, page_size, order, field, genreFilter, tagFilter );
    
            res.status(200).json(response);
    
        } catch (error) {
            res.status(404).send(error.message);
        }
        
    }
    else{
        try {
            const allVideogames= await getAllVideogames(page, page_size, order, field,genreFilter, tagFilter);

            res.status(200).json(allVideogames);
        } catch (error) {
            res.status(404).send(error.message)
        }
    }

})

videogamesRouter.get('/:id', async ( req, res) => {
    try {
        const { id } = req.params;

        const response = await getVideogamesById( id );

        res.status(200).json(response);

    } catch (error) {
        res.status(404).send({ error: error.message });
    }
})

videogamesRouter.post('/', async (req, res) =>{
    try{
        
        const videogames = await postVideogames(req.body)

        if(videogames.error) throw new Error(videogames.error)

        res.status(201).json(videogames)
    }
    catch(error){
        res.status(404).send(error.message)
    }
})

module.exports = videogamesRouter