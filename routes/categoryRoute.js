const Router = require("express").Router
const router = new Router()
const isAuthorized = require("../middlewares/isAuthorized");
const CategoryController = require("../controllers/categoryController")
const {body} = require("express-validator");

router.get("/categories/expenses", isAuthorized, CategoryController.getCategories)
router.get("/categories/income", isAuthorized, CategoryController.getCategories)
router.get("/category/:id", isAuthorized, CategoryController.getCategory)
router.patch("/categories/order",
  body("newOrder").isArray().withMessage("Invalid order"),
  isAuthorized, CategoryController.updateCategoriesOrder)

module.exports = router
