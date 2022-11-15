const router = require('express').Router();

const { validateAddMovie, validateMovie } = require('../middlewares/validation');

const { getAllMovies, addMovie, deleteMovie } = require('../controllers/movie');

router.get('/', getAllMovies);
router.post('/', validateAddMovie, addMovie);
router.delete('/:movieId', validateMovie, deleteMovie);

module.exports = router;
