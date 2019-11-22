const router = require('express').Router();
const memeLandRouter = require('./pages/meme-land');
const { appErrorHandler } = require('../middlewares/error-handler');

router.use('/', memeLandRouter);
router.use(appErrorHandler);

module.exports = router;