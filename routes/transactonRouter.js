const isAuthorized = require("../middlewares/isAuthorized");
const Router = require("express").Router
const router = Router()
const TransactionController = require("../controllers/transactionController")

router.get("/transactions", isAuthorized, TransactionController.getTransactions)
router.get("/transactions/expenses", isAuthorized, TransactionController.getExpensesTransactions)
router.get("/transactions/income", isAuthorized, TransactionController.getIncomeTransactions)
router.get("/transaction/:id", isAuthorized, TransactionController.getTransaction)
router.post("/transaction", isAuthorized, TransactionController.createTransaction)
router.patch("transaction/:id", isAuthorized, TransactionController.editTransaction)
router.delete("transaction/:id", isAuthorized, TransactionController.deleteTransaction)

module.exports = router
