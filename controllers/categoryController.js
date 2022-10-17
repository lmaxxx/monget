const CategoryService = require("../services/categoryService")

class CategoryController {
  async getCategories(req, res) {
    try {
      const transactionType = req.url.split("/").at(-1)
      const {id} = req.user
      const categories = await CategoryService.getCategories(transactionType, id)

      res.json(categories)
    } catch (err) {
      res.status(err.status).json({status: err.status, message: err.message})
    }
  }
}

module.exports = new CategoryController()
