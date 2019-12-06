const router = require('express').Router();
const memeLandRouter = require('./pages/meme-land');
const perfilRouter = require('./pages/perfil');
const { appErrorHandler } = require('../middlewares/error-handler');

router.use('/', memeLandRouter);
router.use('/perfil', perfilRouter);
router.use(appErrorHandler);

module.exports = router;