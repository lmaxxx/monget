const TransferService = require("../services/transferService")
const ApiError = require("../exceptions/apiError");

class TransferController {
  async getTransfers(req, res) {
    try {
      const {id} = req.user
      const transfers = await TransferService.getTransfers(id)

      res.json(transfers)
    } catch (err) {
      ApiError.ErrorBoundary(res, err)
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
      ApiError.ErrorBoundary(res, err)
    }
  }
}

module.exports = new TransferController()
