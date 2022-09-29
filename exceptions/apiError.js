const {validationResult} = require("express-validator");

class ApiError extends Error {
  constructor(status, message) {
    super(message)
    this.status = status
  }

  static validationRequest(req) {
    const errors = validationResult(req).array()

    if(errors.length) {
      throw new ApiError(400, errors[0].msg)
    }
  }
}

module.exports = ApiError
