const { ERROR_CODE_SERVER } = require('../constants/constants');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || ERROR_CODE_SERVER;
  const message = statusCode === ERROR_CODE_SERVER ? 'На сервере произошла ошибка' : err.message;
  res.status(statusCode).send({ message });
  next();
};

module.exports = errorHandler;
