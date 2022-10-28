const {Schema, model} = require("mogoose")

const transactionSchema = new Schema({
  title: {type: String, required: true},
  description: {type: String, default: ""},
  ownerId: {type: Schema.Types.ObjectId, ref: "User", required: true},
  createdAt: {type: Date, default: new Date().getTime()},
  accountId: {type: Schema.Types.ObjectId, ref: "Account", required: true},
  transactionType: {type: String, required: true},
})

const Transaction = model("Transaction", transactionSchema)

module.exports = Transaction
