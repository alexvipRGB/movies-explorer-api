const express = require('express');
const { celebrate, errors } = require('celebrate');
const auth = require('../middlewares/auth');

const router = express.Router();
const {
  getCards, createCard, deleteCard,
} = require('../controllers/movie');
const { movieValidationId, movieValidation } = require('../utils/jobSchema');

router.get('/movies', auth, getCards);
router.post('/movies', auth, celebrate(movieValidation), createCard);
router.delete('/movies/:movieId', auth, celebrate(movieValidationId), deleteCard);

router.use(errors());

module.exports = router;
