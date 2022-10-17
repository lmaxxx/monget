const Router = require("express").Router
const router = new Router()
const isAuthorized = require("../middlewares/isAuthorized");
const CategoryController = require("../controllers/categoryController")

router.get("/categories/expenses", isAuthorized, CategoryController.getCategories)
router.get("/categories/income", isAuthorized, CategoryController.getCategories)
router.get("/category/:id", isAuthorized, CategoryController.getCategory)

module.exports = router
