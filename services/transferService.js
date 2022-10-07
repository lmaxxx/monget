const Transfer = require("../models/Transfer")
const DataService = require("../services/dataService")

class TransferService {
  async getTransfers(userId) {
    const transfersDocs = await Transfer.find({userId})

    return DataService.getTransfersFromDocs(transfersDocs)
  }

  async createTransfer(userId, from, to, amount) {
    const transferDoc = await Transfer.create({
      userId, from, to, amount
    })

    return DataService.getTransferFromDoc(transferDoc)
  }
}

module.exports = new TransferService()
