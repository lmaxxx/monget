const AccountService = require("../services/accountService")
const ApiError = require("../exceptions/apiError");

class AccountController {
  async getAccounts(req, res) {
    try {
      const {id} = req.user
      const accounts = await AccountService.getAccounts(id)

      res.json(accounts)
    } catch (err) {
      res.status(err.status).json({status: err.status, message: err.message})
    }
  }

  async createAccount(req, res) {
    try {
      ApiError.validationRequest(req)

      const account = await AccountService.createAccount(req.user, req.body)

      res.json(account)
    } catch(err) {
      res.status(err.status).json({status: err.status, message: err.message})
    }
  }

  async editAccount(req, res) {
    try {
      const {id} = req.params
      const data = req.body

      if(!data) throw new ApiError(400, "There aren't any new properties")

      const account = await AccountService.editAccount(id, data)

      res.json(account)
    } catch(err) {
      res.status(err.status || 500).json({status: err.status, message: err.message})
    }
  }

  async getAccount(req, res) {
    try {
      const {id} = req.params
      const account = await AccountService.getAccount(id)

      res.json(account)
    } catch (err) {
      res.status(err.status || 500).json({status: err.status, message: err.message})
    }
  }
}

module.exports = new AccountController()
