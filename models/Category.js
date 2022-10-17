const {Schema, model} = require("mongoose")

const categorySchema = new Schema({
  iconName: {type: String, required: true},
  iconBackgroundColor: {type: String, required: true},
  ownerId: {type: Schema.Types.ObjectId, ref: "User", required: true},
  accountName: {type: String, required: true},
  createdAt: {type: Date, default: new Date().getTime()},
  transactionType: {type: String, required: true},
  order: {type: String, required: true}
})

const Category = model("Category", categorySchema)

module.exports = Category
