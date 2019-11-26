const router = require('express').Router();
const memesRouter = require('./memes');
const usersRouter = require('./users');
const favoritosRouter = require('./favoritos');
const comentariosRouter = require('./comentarios');
const puntajesRouter = require('./puntajes');
const { apiErrorHandler } = require('../middlewares/error-handler');

router.use('/memes', memesRouter);
router.use('/users', usersRouter);
router.use('/favoritos', favoritosRouter);
router.use('/comentarios', comentariosRouter);
router.use('/puntajes', puntajesRouter)
router.use(apiErrorHandler);

module.exports = router;