const CategoryService = require("../services/categoryService")
const ApiError = require("../exceptions/apiError");

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

  async getCategory(req, res) {
    try {
      const {id} = req.params
      const category = await CategoryService.getCategory(id)

      res.json(category)
    } catch (err) {
      res.status(err.status).json({status: err.status, message: err.message})
    }
  }

  async updateCategoriesOrder(req, res) {
    try {
      ApiError.validationRequest(req)

      const {newOrder} = req.body
      await CategoryService.updateCategoriesOrder(newOrder)

      res.json({message: "Success"})
    } catch (err) {
      res.status(err.status).json({status: err.status, message: err.message})
    }
  }

  async editCategory(req, res) {
    try {
      const {id} = req.params
      const data = req.body

      if(!data) throw new ApiError(400, "There aren't any new properties")

      const category = await CategoryService.editCategory(id, data)

      res.json(category)
    } catch(err) {
      res.status(err.status).json({status: err.status, message: err.message})
    }
  }

  async deleteCategory(req, res) {
    try {
      const {id} = req.params
      await CategoryService.deleteCategory(id)

      res.json({message: "Success"})
    } catch(err) {
      res.status(err.status).json({status: err.status, message: err.message})
    }
  }

  async createCategory(req, res) {
    try {
      ApiError.validationRequest(req)

      const data = req.body
      const {id} = req.user
      const category = await CategoryService.createCategory(id, data)

      res.json(category)
    } catch (err) {
      res.status(err.status).json({status: err.status, message: err.message})
    }
  }
}

module.exports = new CategoryController()
