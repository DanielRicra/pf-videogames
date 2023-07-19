const { Router } = require('express')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogamesRouter = require('./videogamesRouter')
const genreRouter = require('./genreRouter')
const reviewRouter = require('./reviewRouter')
const tagRouter = require('./tagRouter')
const userRouter = require('./userRouter')
const paymentRouter = require('./paymentRouter')
const cartRouter = require('./cartRouter');
const transactionRouter = require('./transactionRouter')
const friendRouter = require('./friendRouter')


const router = Router()

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/videogames', videogamesRouter)
router.use('/genre', genreRouter)
router.use('/review', reviewRouter)
router.use('/tag', tagRouter)
router.use('/user', userRouter)
router.use('/payment', paymentRouter)
router.use('/cart', cartRouter)
router.use('/transaction', transactionRouter)
router.use('/friend', friendRouter)

module.exports = router
