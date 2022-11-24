const Transaction = require("../models/Transaction");
const ApiError = require("../exceptions/apiError");
const DataService = require("../services/dataService")
const Account = require("../models/Account");
const ConverterService = require("../services/converterService")
const DateService = require("../services/dateService")
const CategoryService = require("../services/categoryService")

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

  async getChartData(accountId, transactionType, userId, query) {
    const chartData = []
    const categories = await CategoryService.getCategories(transactionType, userId)
    const transactions = await this.getTransactions(accountId, transactionType, query)
    const categoriesInTransactions = transactions.map(transaction => transaction.categoryId.toString())
    const uniqueCategoriesId = categoriesInTransactions.filter((categoryId, index) => (
      categoriesInTransactions.indexOf(categoryId.toString()) === index
    ))

    const getCategory = id => {
      return categories.find(category => category.id.toString() === id)
    }

    uniqueCategoriesId.forEach(categoryId => {
      const categoryDoc = getCategory(categoryId)
      const transactionsWithCurrentCategory = transactions.filter(transaction => (
        transaction.categoryId.equals(categoryDoc.id)
      ))
      const donutSection = {
        id: categoryDoc.id.toString(),
        value: 0,
        color: categoryDoc.iconBackgroundColor
      }

      transactionsWithCurrentCategory.forEach(transaction => {
        donutSection.value += transaction.amount
      })

      chartData.push(donutSection)
    })

    return chartData
  }

  validateGetTransactionQuery(query) {
    const currentDate = new Date()
    let {days, weeks, months, rangeStart, rangeEnd} = query

    days = +days
    weeks = +weeks
    months = +months
    rangeStart = +rangeStart ? new Date(+rangeStart) : null
    rangeEnd = +rangeEnd ? new Date(+rangeEnd) : null

    if(days || days === 0) {
      const currentDay = DateService.subtractDays(currentDate, days)

      return {
        start: DateService.getStartOfTheDay(currentDay),
        end: DateService.getEndOfTheDay(currentDay),
      }
    }

    if(weeks || weeks === 0) {
      const weekStartDay = DateService.subtractDays(currentDate, weeks * 7)
      const weekEndDay = DateService.addDays(weekStartDay, 7)

      return {
        start: DateService.getStartOfTheDay(weekStartDay),
        end: DateService.getEndOfTheDay(weekEndDay),
      }
    }

    if(months || months === 0) {
      const monthStartDay = DateService.substractMonths(currentDate, months)
      const monthEndDay = new Date(monthStartDay.getFullYear(), monthStartDay.getMonth()+1, 0)

      monthStartDay.setUTCDate(1)

      return {
        start: DateService.getStartOfTheDay(monthStartDay),
        end: DateService.getEndOfTheDay(monthEndDay),
      }
    }

    if(rangeStart && rangeEnd) {
      return {
        start: DateService.getStartOfTheDay(rangeStart),
        end: DateService.getEndOfTheDay(rangeEnd),
      }
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
