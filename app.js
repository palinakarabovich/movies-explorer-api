const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const router = require('./routers/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./errors/errorHandler');
const rateLimiter = require('./middlewares/rateLimit');

const { MONGO_URL, PORT } = require('./config');

const app = express();

app.use(cors());

app.use(helmet());

app.use(bodyParser.json());

app.use(rateLimiter);

app.use(requestLogger);

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => PORT);
