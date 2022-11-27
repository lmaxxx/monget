const Transaction = require("../models/Transaction");
const ApiError = require("../exceptions/apiError");
const DataService = require("../services/dataService")
const Account = require("../models/Account");
const ConverterService = require("../services/converterService")
const DateService = require("../services/dateService")
const CategoryService = require("../services/categoryService")

class TransactionService {
  async getTransactions(accountId, transactionType, query, options) {
    const findQuery = {accountId}

    if (transactionType) findQuery.transactionType = transactionType
    if (query) {
      const {start, end, categoryId} = query

      if (start && end) findQuery.date = {$gt: start, $lt: end}
      if (categoryId) findQuery.categoryId = categoryId
    }

    const transactionsDocs = await Transaction.find(findQuery, null, options).sort({createdAt: "desc"})
      .catch(err => {
        throw new ApiError(400, "There is no transactions in current account")
      })

    if (!transactionsDocs) throw new ApiError(400, "There is no transactions in current account")

    return DataService.getTransactionsFromDocs(transactionsDocs)
  }

  async getTransaction(id) {
    const transactionDoc = await Transaction.findById(id).populate(["categoryId", "accountId"])
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
    await this.processNewTransaction(newTransactionDoc)

    return DataService.getTransactionFromDoc(newTransactionDoc)
  }

  async editTransaction(id, data) {
    const transactionDoc = await Transaction.findById(id)
      .catch(err => {
        throw new ApiError(400, "There isn't find any category with current id")
      })
    const oldTransactionDoc = {...DataService.getTransactionFromDoc(transactionDoc)}
    if (!transactionDoc) throw new ApiError(400, "There isn't find any category with current id")

    Object.entries(data).forEach(([property, value]) => {
      transactionDoc[property] = value
    })

    await transactionDoc.save()
    await this.processEditedTransaction(oldTransactionDoc, transactionDoc)
    return DataService.getTransactionFromDoc(transactionDoc)
  }

  async deleteTransaction(id) {
    const transactionDoc = await Transaction.findByIdAndDelete(id)
      .catch(err => {
        throw new ApiError(400, "There is no transactions with current id")
      })

    await this.processDeletedTransaction(transactionDoc)
  }

  async processNewTransaction(transactionDoc) {
    const accountDoc = await Account.findById(transactionDoc.accountId)
      .catch(err => {
        throw new ApiError(400, "There is no category with current id")
      })

    if (!accountDoc) throw new ApiError(400, "There is no category with current id")

    const {amount: accountAmount, currency: accountCurrency, _id} = accountDoc
    const {amount: transactionAmount, currency: transactionCurrency, transactionType} = transactionDoc

    if (accountCurrency === transactionCurrency) {
      const newAmount = transactionType === "expenses" ?
        accountAmount - transactionAmount
        : accountAmount + transactionAmount

      await Account.updateOne({_id}, {amount: newAmount})

      return
    }

    const additionalAmount = await ConverterService.convert({
      want: accountCurrency,
      have: transactionCurrency,
      amount: transactionAmount
    })
    const newAmount = transactionType === "expenses" ?
      accountAmount - additionalAmount
      : accountAmount + additionalAmount
    transactionDoc.convertedAmount = additionalAmount
    transactionDoc.convertingCurrency = accountCurrency

    await transactionDoc.save()
    await Account.updateOne({_id}, {amount: newAmount})
  }

  async processEditedTransaction(oldTransaction, newTransactionDoc) {
    const accountDoc = await Account.findById(newTransactionDoc.accountId)
      .catch(err => {
        throw new ApiError(400, "There is no category with current id")
      })

    if (!accountDoc) throw new ApiError(400, "There is no category with current id")

    const {amount: accountAmount, currency: accountCurrency, _id} = accountDoc
    const {
      amount: oldDefaultAmount,
      convertedAmount: oldConvertedAmount,
    } = oldTransaction
    const {
      amount: newTransactionAmount,
      currency: newTransactionCurrency,
      transactionType
    } = newTransactionDoc
    const oldTransactionAmount = oldConvertedAmount ? oldConvertedAmount : oldDefaultAmount

    if (accountCurrency === newTransactionCurrency) {
      const newAmount = transactionType === "expenses" ?
        accountAmount + oldTransactionAmount - newTransactionAmount
        : accountAmount - oldTransactionAmount + newTransactionAmount

      newTransactionDoc.convertedAmount = null
      newTransactionDoc.convertingCurrency = null

      await newTransactionDoc.save()
      await Account.updateOne({_id}, {amount: newAmount})

      return
    }

    const additionalAmount = await ConverterService.convert({
      want: accountCurrency,
      have: newTransactionCurrency,
      amount: newTransactionAmount
    })
    const newAmount = transactionType === "expenses" ?
      accountAmount + oldTransactionAmount - additionalAmount
      : accountAmount - oldTransactionAmount + additionalAmount

    newTransactionDoc.convertedAmount = additionalAmount
    newTransactionDoc.convertingCurrency = accountCurrency

    await newTransactionDoc.save()
    await Account.updateOne({_id}, {amount: newAmount})
  }

  async processDeletedTransaction(transactionDoc) {
    const accountDoc = await Account.findById(transactionDoc.accountId)
      .catch(err => {
        throw new ApiError(400, "There is no category with current id")
      })

    if (!accountDoc) throw new ApiError(400, "There is no category with current id")

    const {amount, convertedAmount} = transactionDoc

    if (transactionDoc.transactionType === "expenses") {
      accountDoc.amount += convertedAmount ? convertedAmount : amount
    } else {
      accountDoc.amount -= convertedAmount ? convertedAmount : amount
    }

    await accountDoc.save()
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
      const category = getCategory(categoryId)
      const transactionsWithCurrentCategory = transactions.filter(transaction => {
        return transaction.categoryId.equals(category.id)
      })
      const donutSection = {
        id: category.id.toString(),
        value: 0,
        color: category.iconBackgroundColor
      }

      transactionsWithCurrentCategory.forEach(transaction => {
        donutSection.value += transaction.convertedAmount ? transaction.convertedAmount : transaction.amount
      })

      chartData.push(donutSection)
    })

    return chartData
  }

  validatePageTransactionQuery({page}) {
    page = +page

    if (page) {
      return {
        skip: (page - 1) * 10,
        limit: 10
      }
    }
  }

  validateDateTransactionQuery({days, weeks, months, rangeStart, rangeEnd}) {
    const currentDate = new Date()

    days = +days
    weeks = +weeks
    months = +months
    rangeStart = +rangeStart ? new Date(+rangeStart) : null
    rangeEnd = +rangeEnd ? new Date(+rangeEnd) : null

    if (days || days === 0) {
      const currentDay = DateService.subtractDays(currentDate, days)

      return {
        start: DateService.getStartOfTheDay(currentDay),
        end: DateService.getEndOfTheDay(currentDay),
      }
    }

    if (weeks || weeks === 0) {
      const weekStartDay = DateService.subtractDays(currentDate, weeks * 7)
      const weekEndDay = DateService.addDays(weekStartDay, 7)

      return {
        start: DateService.getStartOfTheDay(weekStartDay),
        end: DateService.getEndOfTheDay(weekEndDay),
      }
    }

    if (months || months === 0) {
      const monthStartDay = DateService.substractMonths(currentDate, months)
      const monthEndDay = new Date(monthStartDay.getUTCFullYear(), monthStartDay.getUTCMonth() + 1, 0)

      monthStartDay.setUTCDate(1)

      return {
        start: DateService.getStartOfTheDay(monthStartDay),
        end: DateService.getEndOfTheDay(monthEndDay),
      }
    }

    if (rangeStart && rangeEnd) {
      return {
        start: DateService.getStartOfTheDay(rangeStart),
        end: DateService.getEndOfTheDay(rangeEnd),
      }
    }
  }

}

module.exports = new TransactionService()
