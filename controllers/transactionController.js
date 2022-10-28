class TransactionController {
  async getTransactions(req, res) {
    try {

    } catch (err) {
      res.status(err.status).json({status: err.status, message: err.message})
    }
  }

  async getExpensesTransactions(req, res) {
    try {

    } catch (err) {
      res.status(err.status).json({status: err.status, message: err.message})
    }
  }

  async getIncomeTransactions(req, res) {
    try {

    } catch (err) {
      res.status(err.status).json({status: err.status, message: err.message})
    }
  }

  async getTransaction(req, res) {
    try {

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
