const { celebrate, Joi } = require('celebrate');

const router = require('express').Router();

const regEx = require('../constants/constants');

const { getAllMovies, addMovie, deleteMovie } = require('../controllers/movie');

router.get('/', getAllMovies);
router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.number().required(),
      description: Joi.string().required(),
      image: Joi.string().required().pattern(regEx),
      trailerLink: Joi.string().required().pattern(regEx),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
      thumbnail: Joi.string().required().pattern(regEx),
      movieId: Joi.number().required(),
    }),
  }),
  addMovie,
);
router.delete(
  '/:movieId',
  celebrate({
    params: Joi.object().keys({
      movieId: Joi.string().length(24).hex().required(),
    }),
  }),
  deleteMovie,
);

module.exports = router;
