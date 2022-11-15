const { ERROR_CODE_VALIDATION } = require('../constants/constants');

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_VALIDATION;
  }
}

module.exports = ValidationError;
