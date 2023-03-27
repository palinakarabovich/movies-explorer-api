const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const NoRightsError = require('../errors/NoRightsError');
const ValidationError = require('../errors/ValidationError');
const ExistError = require('../errors/ExistError');

const getAllMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

const addMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError(`Incorrect data ${err.message}`));
      } if (err.code === 11000) {
        return next(new ExistError('Can not save the film twice'));
      }
      return next(err);
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (movie === null) {
        return next(new NotFoundError('Not found'));
      }
      if (!movie.owner.equals(req.user._id)) {
        return next(new NoRightsError('Access error'));
      }
      return movie.remove()
        .then(() => res.send({ message: `Film  '${movie.nameRU}' was deleted` }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new ValidationError('Incorrect id'));
      }
      return next(err);
    });
};

module.exports = {
  getAllMovies,
  addMovie,
  deleteMovie,
};
