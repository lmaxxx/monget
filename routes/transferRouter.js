const Router = require("express").Router
const isAuthorized = require("../middlewares/isAuthorized")
const router = new Router()
const TransferController = require("../controllers/transferController")

router.post("/transfer", isAuthorized, TransferController.createTransfer)
router.get("/transfers", isAuthorized, TransferController.getTransfers)

module.exports = router
