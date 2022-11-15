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
        return next(new ValidationError(`Некорректные данные для создания фильма ${err.message}`));
      } if (err.code === 11000) {
        return next(new ExistError('Данный фильм уже сохранен в избранном'));
      }
      return next(err);
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (movie === null) {
        return next(new NotFoundError('Фильм не найден'));
      }
      if (!movie.owner.equals(req.user._id)) {
        return next(new NoRightsError('Недостаточно прав для удаления фильма'));
      }
      return movie.remove()
        .then(() => res.send({ message: `Фильм  '${movie.nameRU}' удален из избранного` }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new ValidationError('Переданы некорректный id фильма'));
      }
      return next(err);
    });
};

module.exports = {
  getAllMovies,
  addMovie,
  deleteMovie,
};
