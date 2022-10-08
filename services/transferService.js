const Transfer = require("../models/Transfer")
const DataService = require("../services/dataService")
const Account = require("../models/Account")

class TransferService {
  async getTransfers(userId) {
    const transfersDocs = await Transfer.find({userId}).populate(["from", "to"])

    return DataService.getTransfersFromDocs(transfersDocs)
  }

  async createTransfer(userId, from, to, amount) {
    const transferDoc = await Transfer.create({
      userId, from, to, amount
    })

    const transfer = DataService.getTransferFromDoc(transferDoc)
    this.processTransfer(transfer)

    return transfer
  }

  async processTransfer(transfer) {
    const {from, to, amount: transferAmount} = transfer
    const {currency: fromCurrency, id: fromId, amount: fromAmount} = from
    const {currency: toCurrency, id: toId, toAmount} = to

    if(fromCurrency === toCurrency) {
      await Account.findByIdAndUpdate(fromId, {amount: fromAmount - transferAmount})
      await Account.findByIdAndUpdate(toId, {amount: toAmount + transferAmount})

      return
    }
  }
}

module.exports = new TransferService()
