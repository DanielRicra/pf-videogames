const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogamesRouter = require ('./videogamesRouter');
const genreRouter = require ('./genreRouter');
const reviewRouter = require ('./reviewRouter')
const tagRouter = require ('./tagRouter')
const userRouter = require ('./userRouter')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/videogames', videogamesRouter)
router.use('/genre', genreRouter)
router.use('/review', reviewRouter)
router.use('/tag', tagRouter)
router.use('/user', userRouter)



module.exports = router;
