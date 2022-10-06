const TransferService = require("../services/transferService")

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

    } catch (err) {
      res.status(err.status).json({status: err.status, message: err.message})
    }
  }
}

module.exports = new TransferController()
