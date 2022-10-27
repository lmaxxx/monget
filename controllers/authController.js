const AuthService = require("../services/authService")
const ApiError = require("../exceptions/apiError");

class AuthController {
  async registration(req, res) {
    try {
      ApiError.validationRequest(req)

      const {email, password, name} = req.body
      const userData = await AuthService.registration(email, password, name)

      res.cookie("refreshToken", userData.refreshToken, {maxAge: 24 * 60 * 60 * 1000, httpOnly: true})

      return res.json(userData)
    } catch(err) {
      res.status(err.status).json({status: err.status, message: err.message})
    }
  }

  async login(req, res) {
    try {
      ApiError.validationRequest(req)

      const {email, password} = req.body
      const userData = await AuthService.login(email, password)

      res.cookie("refreshToken", userData.refreshToken, {maxAge: 24 * 60 * 60 * 1000, httpOnly: true})

      return res.json(userData)
    } catch(err) {
      res.status(err.status).json({status: err.status, message: err.message})
    }
  }

  async activate(req, res) {
    try {
      const activationLink = req.params.link
      await AuthService.activate(activationLink)

      res.redirect(process.env.CLIENT_URL)
    } catch (err) {
      res.status(err.status).json({status: err.status, message: err.message})
    }
  }

  async logout(req, res) {
    try {
      const {refreshToken} = req.cookies

      await AuthService.logout(refreshToken)

      res.clearCookie("refreshToken")
      return res.sendStatus(200)
    } catch(err) {
      res.status(err.status).json({status: err.status, message: err.message})
    }
  }

  async refresh(req, res) {
    try {
      const {refreshToken} = req.cookies
      const userData = await AuthService.refresh(refreshToken)

      res.cookie("refreshToken", userData.refreshToken, {maxAge: 24 * 60 * 60 * 1000, httpOnly: true})

      return res.json(userData)
    } catch(err) {
      res.status(err.status).json({status: err.status, message: err.message})
    }
  }

  async updateCurrency(req, res) {
    try {
      ApiError.validationRequest(req)

      const {currency} = req.body
      const {id} = req.user

      const userData = await AuthService.updateCurrency(id, currency)

      return res.json(userData)
    } catch (err) {
      res.status(err.status).json({status: err.status, message: err.message})
    }
  }
}

module.exports = new AuthController()
