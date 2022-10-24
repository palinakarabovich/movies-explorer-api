const { celebrate, Joi } = require('celebrate');
const { ObjectId } = require('mongoose').Types;
const validator = require('validator');

const checkedId = Joi.string()
  .required()
  .custom((value, helpers) => {
    if (ObjectId.isValid(value)) return value;
    return helpers.message('Невалидный id');
  });

const checkedEmail = Joi.string()
  .required()
  .custom((value, helpers) => {
    if (validator.isEmail(value)) return value;
    return helpers.message('Неверный формат почты');
  });

const checkedLink = Joi.string()
  .required()
  .custom((value, helpers) => {
    if (validator.isURL(value)) return value;
    return helpers.message('Неверный формат ссылки');
  });

const validateSignup = celebrate({
  body: Joi.object().keys({
    email: checkedEmail,
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const validateSignin = celebrate({
  body: Joi.object().keys({
    email: checkedEmail,
    password: Joi.string().required(),
  }),
});

const validateUserProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: checkedEmail,
  }),
});

const validateMovie = celebrate({
  params: Joi.object().keys({
    movieId: checkedId,
  }),
});

const validateAddMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: checkedLink,
    trailerLink: checkedLink,
    thumbnail: checkedLink,
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports = {
  validateSignup,
  validateSignin,
  validateUserProfile,
  validateMovie,
  validateAddMovie,
};
