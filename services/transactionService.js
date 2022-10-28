const Transaction = require("../models/Transaction");
const ApiError = require("../exceptions/apiError");
const DataService = require("../services/dataService")

class TransactionService {
  async getTransactions(accountId, transactionType) {
    let transactionsDocs

    if(transactionType) {
      transactionsDocs = Transaction.find({transactionType, accountId}).sort({createdAt: "asc"})
        .catch(err => throw new ApiError(400, "There is no transactions in current account"))
    } else {
      transactionsDocs = Transaction.find({accountId}).sort({createdAt: "asc"})
        .catch(err => throw new ApiError(400, "There is no transactions in current account"))
    }

    if(!transactionsDocs) throw new ApiError(400, "There is no transactions in current account")

    return DataService.getTransactionsFromDocs(transactionsDocs)
  }

  async getTransaction(id) {
    const transactionDoc = await Transaction.findById(id)
      .catch(err => throw new ApiError(400, "There is no transactions with current id"))

    if(!transactionDoc) throw new ApiError(400, "There is no transactions with current id")

    return DataService.getTransactionFromDoc(transactionDoc)
  }
}

module.exports = new TransactionService()
