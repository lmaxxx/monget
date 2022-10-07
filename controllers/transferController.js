const TransferService = require("../services/transferService")
const ApiError = require("../exceptions/apiError");

class TransferController {
  async getTransfers(req, res) {
    try {
      const {id} = req.user
      const transfers = await TransferService.getTransfers(id)

      res.json(transfers)
    } catch (err) {
      res.status(err.status).json({status: err.status, message: err.message})
    }
  }

  async createTransfer(req, res) {
    try {
      ApiError.validationRequest(req)

      const {id: userId} = req.user
      const {from, to, amount} = req.body
      const transfer = await TransferService.createTransfer(userId, from, to, amount)

      res.json(transfer)
    } catch (err) {
      res.status(err.status).json({status: err.status, message: err.message})
    }
  }
}

module.exports = new TransferController()
