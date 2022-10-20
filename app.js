const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const { errors, celebrate, Joi } = require('celebrate');

const userRouter = require('./routers/user');
const movieRouter = require('./routers/movie');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const NotFoundError = require('./errors/NotFoundError');
const errorHandler = require('./errors/errorHandler');

const auth = require('./middlewares/auth');

const { login, createUser } = require('./controllers/user');

const { PORT = 3000 } = process.env;

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(requestLogger);

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);

app.use('/users', auth, userRouter);
app.use('/movies', auth, movieRouter);

app.all('*', auth, (req, res, next) => {
  next(new NotFoundError('Страницы не существует'));
});
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
