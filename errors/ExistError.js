const { ERROR_CODE_IT_EXIST } = require('../constants/constants');

class ExistError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_IT_EXIST;
  }
}

module.exports = ExistError;
