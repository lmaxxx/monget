const Router = require("express").Router
const router = Router()
const StatisticController = require("../controllers/statisticController")

router.get("/statistics/expenses", StatisticController.getExpensesStatistics)
router.get("/statistics/income", StatisticController.getIncomeStatistics)
router.get("/statistics", StatisticController.getStatistics)

module.exports = router
