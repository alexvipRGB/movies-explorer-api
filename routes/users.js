const express = require('express');
const { celebrate, errors } = require('celebrate');
const auth = require('../middlewares/auth');

const router = express.Router();
const {
  updateUser,
  getCurrentUser,
  login,
  createUser,
  logout,
} = require('../controllers/users');
const {
  userUpdateValidation, userLoginValid, userRegValid,
} = require('../utils/jobSchema');

router.post('/signin', celebrate(userLoginValid), login);
router.post('/signup', celebrate(userRegValid), createUser);

router.get('/users/me', auth, getCurrentUser);

router.patch('/users/me', auth, celebrate(userUpdateValidation), updateUser);

router.post('/signout', logout);

router.use(errors());

module.exports = router;
