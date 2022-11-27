const TransactionService = require("../services/transactionService")
const ApiError = require("../exceptions/apiError");

class TransactionController {
  async getTransactions(req, res) {
    try {
      const {accountId} = req.params
      const {categoryId} = req.body
      const validatedQuery = TransactionService.validateGetTransactionQuery(req.query)

      if(categoryId) validatedQuery.categoryId = categoryId

      const transactions = await TransactionService.getTransactions(accountId, null, validatedQuery)



      res.json(transactions)
    } catch (err) {
      res.status(err.status).json({status: err.status, message: err.message})
    }
  }

  async getExpensesTransactions(req, res) {
    try {
      const {accountId} = req.params
      const {categoryId} = req.body
      const validatedQuery = TransactionService.validateGetTransactionQuery(req.query)

      if(categoryId) validatedQuery.categoryId = categoryId

      const transactions = await TransactionService.getTransactions(accountId, "expenses", validatedQuery)

      res.json(transactions)
    } catch (err) {
      res.status(err.status).json({status: err.status, message: err.message})
    }
  }

  async getIncomeTransactions(req, res) {
    try {
      const {accountId} = req.params
      const {categoryId} = req.body
      const validatedQuery = TransactionService.validateGetTransactionQuery(req.query)

      if(categoryId) validatedQuery.categoryId = categoryId

      const transactions = await TransactionService.getTransactions(accountId, "income", validatedQuery)

      res.json(transactions)
    } catch (err) {
      res.status(err.status).json({status: err.status, message: err.message})
    }
  }

  async getTransaction(req, res) {
    try {
      const {id} = req.params
      const transaction = await TransactionService.getTransaction(id)

      res.json(transaction)
    } catch (err) {
      res.status(err.status).json({status: err.status, message: err.message})
    }
  }

  async createTransaction(req, res) {
    try {
      ApiError.validationRequest(req)

      const data = req.body
      const {id} = req.user
      const transaction = await TransactionService.createTransaction(id, data)

      res.json(transaction)
    } catch (err) {
      res.status(err.status).json({status: err.status, message: err.message})
    }
  }

  async editTransaction(req, res) {
    try {
      ApiError.validationRequest(req)

      const data = req.body
      const {id} = req.params

      if(!Object.values(data).length) throw new ApiError(400, "There aren't any new properties")

      const transaction = await TransactionService.editTransaction(id, data)

      res.json(transaction)
    } catch (err) {
      res.status(err.status).json({status: err.status, message: err.message})
    }
  }

  async deleteTransaction(req, res) {
    try {
      const {id} = req.params
      await TransactionService.deleteTransaction(id)

      res.json({message: "Success"})
    } catch (err) {
      res.status(err.status).json({status: err.status, message: err.message})
    }
  }

  async getExpensesChartData(req, res) {
    try {
      const {id: userId} = req.user
      const {accountId} = req.params
      const validatedQuery = TransactionService.validateGetTransactionQuery(req.query)
      const chartData = await TransactionService.getChartData(accountId, "expenses", userId, validatedQuery)

      res.json({chartData, transactionType: "expenses"})
    } catch (err) {
      res.status(err.status).json({status: err.status, message: err.message})
    }
  }

  async getIncomeChartData(req, res) {
    try {
      const {id: userId} = req.user
      const {accountId} = req.params
      const validatedQuery = TransactionService.validateGetTransactionQuery(req.query)
      const chartData = await TransactionService.getChartData(accountId, "income", userId, validatedQuery)

      res.json({chartData, transactionType: "income"})
    } catch (err) {
      res.status(err.status).json({status: err.status, message: err.message})
    }
  }

}

module.exports = new TransactionController()
