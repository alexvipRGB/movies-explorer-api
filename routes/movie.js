const express = require('express');
const { celebrate, errors } = require('celebrate');
const auth = require('../middlewares/auth');

const router = express.Router();
const {
  getMovies, createMovies, deleteMovies,
} = require('../controllers/movie');
const { movieValidationId, movieValidation } = require('../utils/jobSchema');

router.get('/movies', auth, getMovies);
router.post('/movies', auth, celebrate(movieValidation), createMovies);
router.delete('/movies/:movieId', auth, celebrate(movieValidationId), deleteMovies);

router.use(errors());

module.exports = router;
