const router = require('express').Router();
const memesRouter = require('./memes');
const usersRouter = require('./users');
const { apiErrorHandler } = require('../middlewares/error-handler');

router.use('/memes', memesRouter);
router.use('/users', usersRouter);
router.use(apiErrorHandler);

module.exports = router;