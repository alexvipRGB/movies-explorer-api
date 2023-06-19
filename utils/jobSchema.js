const { Segments, Joi } = require('celebrate');
const validUrl = require('valid-url');

const movieValidation = {
  [Segments.BODY]: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string()
      .custom((value, helpers) => {
        if (!validUrl.isWebUri(value)) {
          return helpers.error('any.invalid');
        }
        return value;
      })
      .messages({
        'string.base': 'Поле "image" должно быть строкой',
        'string.empty': 'Поле "image" должно быть заполнено',
        'any.required': 'Поле "image" должно быть заполнено',
        'string.uri': 'Поле "image" должно быть допустимым URL-адресом',
      })
      .required(),
    trailerLink: Joi.string()
      .custom((value, helpers) => {
        if (!validUrl.isWebUri(value)) {
          return helpers.error('any.invalid');
        }
        return value;
      })
      .messages({
        'string.base': 'Поле "trailerLink" должно быть строкой',
        'string.empty': 'Поле "trailerLink" должно быть заполнено',
        'any.required': 'Поле "trailerLink" должно быть заполнено',
        'string.uri': 'Поле "trailerLink" должно быть допустимым URL-адресом',
      })
      .required(),
    thumbnail: Joi.string()
      .custom((value, helpers) => {
        if (!validUrl.isWebUri(value)) {
          return helpers.error('any.invalid');
        }
        return value;
      })
      .messages({
        'string.base': 'Поле "thumbnail" должно быть строкой',
        'string.empty': 'Поле "thumbnail" должно быть заполнено',
        'any.required': 'Поле "thumbnail" должно быть заполнено',
        'string.uri': 'Поле "thumbnail" должно быть допустимым URL-адресом',
      })
      .required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
};

const movieValidationId = {
  [Segments.PARAMS]: Joi.object().keys({
    movieId: Joi.string().length(24).hex().messages({
      'string.base': 'Поле "movieId" должно быть строкой',
      'string.empty': 'Поле "movieId" должно быть заполнено',
      'string.length': 'Поле "movieId" должно быть длиной 24 символа',
      'string.hex':
        'Поле "movieId" должно содержать только шестнадцатеричные символы',
    })
      .required(),
  }),
};

const userLoginValid = {
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required().messages({
      'string.base': 'Поле "email" должно быть строкой',
      'string.empty': 'Поле "email" должно быть заполнено',
      'string.email': 'Некорректный Email',
      'any.required': 'Поле "email" должно быть заполнено',
    }),
    password: Joi.string().min(6).required().messages({
      'string.base': 'Поле "password" должно быть строкой',
      'string.empty': 'Поле "password" должно быть заполнено',
      'string.min': 'Минимальная длина поля "password" - 6',
      'any.required': 'Поле "password" должно быть заполнено',
    }),
  }),
};
const userRegValid = {
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required()
      .messages({
        'string.base': 'Поле "email" должно быть строкой',
        'string.empty': 'Поле "email" должно быть заполнено',
        'string.email': 'Некорректный Email',
        'any.required': 'Поле "email" должно быть заполнено',
      }),
    password: Joi.string().min(6).required()
      .messages({
        'string.base': 'Поле "password" должно быть строкой',
        'string.empty': 'Поле "password" должно быть заполнено',
        'string.min': 'Минимальная длина поля "password" - 6',
        'any.required': 'Поле "password" должно быть заполнено',
      }),
    name: Joi.string().min(2).max(30)
      .messages({
        'string.base': 'Поле "about" должно быть строкой',
        'string.empty': 'Поле "about" должно быть заполнено',
        'string.min': 'Минимальная длина поля "about" - 2',
        'string.max': 'Максимальная длина поля "about" - 30',
        'any.required': 'Поле "about" должно быть заполнено',
      }),
  }),
};

const userUpdateValidation = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required()
      .messages({
        'string.base': 'Поле "name" должно быть строкой',
        'string.empty': 'Поле "name" должно быть заполнено',
        'string.min': 'Минимальная длина поля "name" - 2',
        'string.max': 'Максимальная длина поля "name" - 30',
        'any.required': 'Поле "name" должно быть заполнено',
      }),
    name: Joi.string().min(2).max(30).required()
      .messages({
        'string.base': 'Поле "about" должно быть строкой',
        'string.empty': 'Поле "about" должно быть заполнено',
        'string.min': 'Минимальная длина поля "about" - 2',
        'string.max': 'Максимальная длина поля "about" - 30',
        'any.required': 'Поле "about" должно быть заполнено',
      }),
  }),
};

module.exports = {
  movieValidation,
  movieValidationId,
  userUpdateValidation,
  userLoginValid,
  userRegValid,
};
