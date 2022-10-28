const TransactionService = require("../services/transactionService")

class TransactionController {
  async getTransactions(req, res) {
    try {
      const {accountId} = req.params
      const transactions = await TransactionService.getTransactions(accountId)

      res.json(transactions)
    } catch (err) {
      res.status(err.status).json({status: err.status, message: err.message})
    }
  }

  async getExpensesTransactions(req, res) {
    try {
      const {accountId} = req.params
      const transactions = await TransactionService.getTransactions(accountId, "expenses")

      res.json(transactions)
    } catch (err) {
      res.status(err.status).json({status: err.status, message: err.message})
    }
  }

  async getIncomeTransactions(req, res) {
    try {
      const {accountId} = req.params
      const transactions = await TransactionService.getTransactions(accountId, "income")

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

    } catch (err) {
      res.status(err.status).json({status: err.status, message: err.message})
    }
  }

  async editTransaction(req, res) {
    try {

    } catch (err) {
      res.status(err.status).json({status: err.status, message: err.message})
    }
  }

  async deleteTransaction(req, res) {
    try {

    } catch (err) {
      res.status(err.status).json({status: err.status, message: err.message})
    }
  }

}

module.exports = new TransactionController()
