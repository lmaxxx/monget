const Transaction = require("../models/Transaction");
const ApiError = require("../exceptions/apiError");
const DataService = require("../services/dataService")
const Account = require("../models/Account");
const ConverterService = require("../services/converterService")
const DateService = require("../services/dateService")

class TransactionService {
  async getTransactions(accountId, transactionType, query) {
    const findQuery = {accountId}

    if (transactionType) findQuery.transactionType = transactionType
    if (query) {
      const {start, end} = query
      findQuery.date = {$gt: start, $lt: end}
    }

    const transactionsDocs = await Transaction.find(findQuery).sort({createdAt: "asc"})
      .catch(err => {
        throw new ApiError(400, "There is no transactions in current account")
      })

    if (!transactionsDocs) throw new ApiError(400, "There is no transactions in current account")

    return DataService.getTransactionsFromDocs(transactionsDocs)
  }

  async getTransaction(id) {
    const transactionDoc = await Transaction.findById(id)
      .catch(err => {
        throw new ApiError(400, "There is no transactions with current id")
      })

    if (!transactionDoc) throw new ApiError(400, "There is no transactions with current id")

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

    if (!transactionDoc) throw new ApiError(400, "There isn't find any category with current id")

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

    if (!accountDoc) throw new ApiError(400, "There is no category with current id")

    if (accountCurrency === transactionCurrency) {
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

  validateGetTransactionQuery(query) {
    const currentDate = new Date()
    let {days, start, end} = query

    days = +days
    start = new Date(+start)
    end = new Date(+end)

    if(days || days === 0) {
      const lastDate = DateService.subtractDays(currentDate, days)

      return {
        start: DateService.getStartOfTheDay(lastDate),
        end: DateService.getEndOfTheDay(currentDate),
      }
    }
    else if(start && end) {
      return {
        start: DateService.getStartOfTheDay(start),
        end: DateService.getEndOfTheDay(end),
      }
    }
  }
}

module.exports = new TransactionService()
