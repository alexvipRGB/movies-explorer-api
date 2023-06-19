const express = require('express');
const NotFoundError = require('../errors/NotFoundError');

const router = express.Router();
const userRouter = require('./users');
const movieRouter = require('./movie');

router.use(userRouter);
router.use(movieRouter);
router.use(() => {
  throw new NotFoundError('Маршрут не найден');
});

module.exports = router;
