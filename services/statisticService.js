const DateService = require("../services/dateService");
const TransactionService = require("../services/transactionService");
const ApiError = require("../exceptions/apiError");

class StatisticService {
  async getStatistics(queryType, dateCounter, transactionType) {
    switch (queryType) {
      case "years": return await this.getYearStatistic(dateCounter, transactionType)
    }
  }

  async getYearStatistic(dateCounter, transactionType) {
    const data = []
    const currentDate = new Date()
    const startOfTheYear = DateService.getStartOfTheYear(currentDate, dateCounter)
    const endOfTheYear = DateService.getEndOfTheYear(currentDate, dateCounter)
    const query = {
      start: startOfTheYear,
      end: endOfTheYear
    }

    const transactions = await TransactionService.getTransactions(null, transactionType, query, {})

    for(let i = 0; i < 12; i++) {
      const startOfTheMonth = DateService.getStartOfTheMonthByIndex(startOfTheYear, i)
      const endOfTheMonth = DateService.getEndOfTheMonthByIndex(startOfTheYear, i)
      const monthName = startOfTheMonth.toLocaleString('en-US', {
        month: 'short',
      });
      const monthData = {label: monthName, expenses: 0, income: 0, profit: 0, loss: 0}
      const monthTransactions = transactions.filter(transaction => (
        transaction.date.getTime() >= startOfTheMonth.getTime() && transaction.date.getTime() <= endOfTheMonth.getTime()
      ))

      monthTransactions.forEach(transaction => {
        if(transaction.transactionType === "expenses")  {
          monthData.expenses += transaction.amount
          return
        }

        monthData.income += transaction.amount
      })

      const profit = monthData.income - monthData.expenses

      if(profit >= 0) {
        monthData.profit = profit
      } else {
        monthData.loss = Math.abs(profit)
      }

      data.push(monthData)
    }

    return data
  }

  getStatisticsQuery(query) {
    const {years, weeks, months} = query

    if(years || years === 0) return {type: "years", dateCounter: years}
    if(weeks || weeks === 0) return {type: "weeks", dateCounter: weeks}
    if(months || months === 0) return {type: "months", dateCounter: months}

    throw new ApiError(400, "Bad params")
  }
}

module.exports = new StatisticService()
