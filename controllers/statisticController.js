const ApiError = require("../exceptions/apiError");

class StatisticController {
  async getIncomeStatistics(req, res) {
    try {

    } catch (err) {
      ApiError.ErrorBoundary(res, err)
    }
  }

  async getExpensesStatistics(req, res) {
    try {

    } catch (err) {
      ApiError.ErrorBoundary(res, err)
    }
  }

  async getStatistics(req, res) {
    try {

    } catch (err) {
      ApiError.ErrorBoundary(res, err)
    }
  }
}

module.exports = new StatisticController()
