const {Schema, model} = require("mongoose")

const transferScheme = new Schema({
  userId: {type: Schema.Types.ObjectId, required: true, ref: "User"},
  from: {type: Schema.Types.ObjectId, required: true, ref: "Account"},
  to: {type: Schema.Types.ObjectId, required: true, ref: "Account"},
  amount: {type: Number, required: true},
})

const Transfer = model("Transfer", transferScheme)

module.exports = Transfer