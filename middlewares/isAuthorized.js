const TokenService = require("../services/tokenService")
const ApiError = require("../exceptions/apiError");

const isAuthorized = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization
    if(!authorizationHeader) throw new ApiError(401, "User is unauthorized")

    const accessToken = authorizationHeader.split(" ")[1]
    if(!accessToken) throw new ApiError(401, "User is unauthorized")

    const userData = TokenService.validateAccessToken(accessToken)
    if(!userData) throw new ApiError(401, "User is unauthorized")

    req.user = userData
    next()
  } catch (err) {
    res.status(err.status).json({status: err.status, message: err.message})
  }
}

module.exports = isAuthorized
