const Category = require("../models/Category")
const DataService = require("../services/dataService")
const ApiError = require("../exceptions/apiError");

class CategoryService {
  getDefaultCategoriesData(userId) {
    return [
      {
        name: "Products",
        iconName: "IconShoppingCart",
        iconBackgroundColor: "#0ca678",
        ownerId: userId,
        createdAt: new Date().getTime(),
        transactionType: "expenses",
        order: 1
      },
      {
        name: "Transport",
        iconName: "IconCar",
        iconBackgroundColor: "#a9e34b",
        ownerId: userId,
        createdAt: new Date().getTime(),
        transactionType: "expenses",
        order: 2
      },
      {
        name: "Training",
        iconName: "IconBarbell",
        iconBackgroundColor: "#9775fa",
        ownerId: userId,
        createdAt: new Date().getTime(),
        transactionType: "expenses",
        order: 3
      },
      {
        name: "Family",
        iconName: "IconBabyCarriage",
        iconBackgroundColor: "#69db7c",
        ownerId: userId,
        createdAt: new Date().getTime(),
        transactionType: "expenses",
        order: 4
      },
      {
        name: "Other",
        iconName: "IconQuestionMark",
        iconBackgroundColor: "#bac8ff",
        ownerId: userId,
        createdAt: new Date().getTime(),
        transactionType: "expenses",
        order: 5
      },
      {
        name: "Gifts",
        iconName: "IconGift",
        iconBackgroundColor: "#e03131",
        ownerId: userId,
        createdAt: new Date().getTime(),
        transactionType: "expenses",
        order: 6
      },
      {
        name: "Education",
        iconName: "IconSchool",
        iconBackgroundColor: "#748ffc",
        ownerId: userId,
        createdAt: new Date().getTime(),
        transactionType: "expenses",
        order: 7
      },
      {
        name: "Cafe",
        iconName: "IconCup",
        iconBackgroundColor: "#5c5f66",
        ownerId: userId,
        createdAt: new Date().getTime(),
        transactionType: "expenses",
        order: 8
      },
      {
        name: "Home",
        iconName: "IconHome2",
        iconBackgroundColor: "#ff8787",
        ownerId: userId,
        createdAt: new Date().getTime(),
        transactionType: "expenses",
        order: 9
      },
      {
        name: "Entertainment",
        iconName: "IconBallon",
        iconBackgroundColor: "#a61e4d",
        ownerId: userId,
        createdAt: new Date().getTime(),
        transactionType: "expenses",
        order: 10
      },
      {
        name: "Health",
        iconName: "IconFirstAidKit",
        iconBackgroundColor: "#fa5252",
        ownerId: userId,
        createdAt: new Date().getTime(),
        transactionType: "expenses",
        order: 11
      },
      {
        name: "Clothes",
        iconName: "IconShirt",
        iconBackgroundColor: "#9c36b5",
        ownerId: userId,
        createdAt: new Date().getTime(),
        transactionType: "expenses",
        order: 12
      },
      {
        name: "Gifts",
        iconName: "IconGift",
        iconBackgroundColor: "#1098ad",
        ownerId: userId,
        createdAt: new Date().getTime(),
        transactionType: "income",
        order: 1
      },
      {
        name: "Salary",
        iconName: "IconCash",
        iconBackgroundColor: "#8ce99a",
        ownerId: userId,
        createdAt: new Date().getTime(),
        transactionType: "income",
        order: 2
      },
      {
        name: "Percents",
        iconName: "IconReceiptTax",
        iconBackgroundColor: "#63e6be",
        ownerId: userId,
        createdAt: new Date().getTime(),
        transactionType: "income",
        order: 3
      },
      {
        name: "Other",
        iconName: "IconQuestionMark",
        iconBackgroundColor: "#66a80f",
        ownerId: userId,
        createdAt: new Date().getTime(),
        transactionType: "income",
        order: 4
      },
    ]
  }

  async createBaseCategories(userId) {
    await Category.create(...this.getDefaultCategoriesData(userId))
  }

  async getCategories(transactionType, userId) {
    const categoriesDocs = await Category.find({ownerId: userId, transactionType}).sort({order: "asc"})
    const categories = DataService.getCategoriesFromDocs(categoriesDocs)

    return categories
  }

  async getCategory(id) {
    const categoryDoc = await Category.findById(id)
      .catch(err => {
        throw new ApiError(400, "There isn't find any category with current id")
      })

    return DataService.getCategoryFromDoc(categoryDoc)
  }

  async updateCategoriesOrder(newOrder) {
    const operations = this.createOperationsForCategoriesReordering(newOrder)
    await Category.bulkWrite(operations)
  }

  createOperationsForCategoriesReordering(newOrder) {
    return newOrder.map((newOrderId, index) => ({
      updateOne: {
        filter: {_id: newOrderId},
        update: {order: index + 1}
      }
    }))
  }
}

module.exports = new CategoryService()
