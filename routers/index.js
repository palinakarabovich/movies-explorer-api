const router = require('express').Router();
const userRouter = require('./user');
const movieRouter = require('./movie');
const { createUser, login } = require('../controllers/user');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const { validateSignup, validateSignin } = require('../middlewares/validation');

router.post('/signup', validateSignup, createUser);
router.post('/signin', validateSignin, login);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use((req, res, next) => next(new NotFoundError(`Страница '${req.path}' не найдена`)));

module.exports = router;
