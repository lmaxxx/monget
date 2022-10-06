const Transfer = require("../models/Transfer")
const DataService = require("../services/dataService")

class TransferService {
  async getTransfers(userId) {
    const transfersDocs = await Transfer.find({userId})

    return DataService.getTransfersFromDocs(transfersDocs)
  }
}

module.exports = new TransferService()
