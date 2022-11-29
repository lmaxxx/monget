const Router = require("express").Router
const router = Router()

router.get("/statistics/expenses")
router.get("/statistics/income")
router.get("/statistics")

module.exports = router
