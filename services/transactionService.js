const Transaction = require("../models/Transaction");
const ApiError = require("../exceptions/apiError");
const DataService = require("../services/dataService")
const Account = require("../models/Account");
const ConverterService = require("../services/converterService")

class TransactionService {
  async getTransactions(accountId, transactionType) {
    let transactionsDocs

    if(transactionType) {
      transactionsDocs = await Transaction.find({transactionType, accountId}).sort({createdAt: "asc"})
        .catch(err => {
          throw new ApiError(400, "There is no transactions in current account")
        })
    } else {
      transactionsDocs = await Transaction.find({accountId}).sort({createdAt: "asc"})
        .catch(err => {
          throw new ApiError(400, "There is no transactions in current account")
        })
    }

    if(!transactionsDocs) throw new ApiError(400, "There is no transactions in current account")

    return DataService.getTransactionsFromDocs(transactionsDocs)
  }

  async getTransaction(id) {
    const transactionDoc = await Transaction.findById(id)
      .catch(err => {
        throw new ApiError(400, "There is no transactions with current id")
      })

    if(!transactionDoc) throw new ApiError(400, "There is no transactions with current id")

    return DataService.getTransactionFromDoc(transactionDoc)
  }

  async createTransaction(userId, data) {
    const newTransactionDoc = await Transaction.create({
      ...data,
      ownerId: userId,
      createdAt: new Date().getTime()
    })
    await this.processAfterCreatingTransaction(data.accountId, newTransactionDoc)

    return DataService.getTransactionFromDoc(newTransactionDoc)
  }

  async editTransaction(id, data) {
    const transactionDoc = await Transaction.findById(id)
      .catch(err => {
        throw new ApiError(400, "There isn't find any category with current id")
      })

    if(!transactionDoc) throw new ApiError(400, "There isn't find any category with current id")

    Object.entries(data).forEach(([property, value]) => {
      transactionDoc[property] = value
    })

    transactionDoc.save()
    return DataService.getTransactionFromDoc(transactionDoc)
  }

  async deleteTransaction(id) {
    await Transaction.findByIdAndDelete(id)
      .catch(err => {
        throw new ApiError(400, "There is no transactions with current id")
      })
  }

  async processAfterCreatingTransaction(accountId, transactionDoc) {
    const accountDoc = await Account.findById(accountId)
      .catch(err => {
        throw new ApiError(400, "There is no category with current id")
      })
    const {accountAmount, accountCurrency, _id} = accountDoc
    const {transactionAmount, transactionCurrency} = transactionDoc

    if(!accountDoc) throw new ApiError(400, "There is no category with current id")

    if(accountCurrency === transactionCurrency) {
      await Account.updateOne({_id}, {amount: accountAmount + transactionAmount})
    } else {
      const newAmount = ConverterService.convert({
        want: accountCurrency,
        have: transactionCurrency,
        amount: transactionAmount
      })

      await Account.updateOne({_id}, {amount: accountAmount + newAmount})
    }
  }

  // async processAfterDeletingTransaction(accountId, transactionDoc) {
  //   const accountDoc = await Account.findById(accountId)
  //     .catch(err => {
  //       throw new ApiError(400, "There is no category with current id")
  //     })
  //   const {accountAmount, accountCurrency, _id} = accountDoc
  //   const {transactionAmount, transactionCurrency} = transactionDoc
  //
  //   if(!accountDoc) throw new ApiError(400, "There is no category with current id")
  //
  //   if(accountCurrency === transactionCurrency) {
  //     await Account.updateOne({_id}, {amount: accountAmount - transactionAmount})
  //   } else {
  //     const newAmount = ConverterService.convert({
  //       want: accountCurrency,
  //       have: transactionCurrency,
  //       amount: transactionAmount
  //     })
  //
  //     await Account.updateOne({_id}, {amount: accountAmount - newAmount})
  //   }
  // }
}

module.exports = new TransactionService()
