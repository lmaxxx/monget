const Account = require("../models/Account");
const DataService = require("../services/dataService")
const ApiError = require("../exceptions/apiError");

class AccountService {
  async createAccount(userData, data) {
    if(!data) {
      const accountDoc = await Account.create({
        currency: userData.currency,
        ownerId: userData.id,
        accountName: "Main",
        iconName: "IconCash",
        iconBackgroundColor: "#20c997",
        createdAt: new Date().getTime()
      })

      return DataService.getAccountFormDoc(accountDoc)
    }

    const {currency, accountName, iconName, iconBackgroundColor, amount} = data
    const accountDoc = await Account.create({
      currency,
      ownerId: userData.id,
      accountName,
      iconName,
      iconBackgroundColor,
      amount,
      createdAt: new Date().getTime()
    })

    return DataService.getAccountFormDoc(accountDoc)
  }

  async getAccounts(userId) {
    const accountsDocs = await Account.find({ownerId: userId})
    const accounts = DataService.getAccountsFromDocs(accountsDocs)

    return accounts
  }

  async editAccount(id, data) {
    const accountDoc = await Account.findById(id)

    if(!accountDoc) throw new ApiError(400, "Account with this id doesn't exist")

    Object.entries(data).forEach(([property, value]) => {
      accountDoc[property] = value
    })

    await accountDoc.save()
    return DataService.getAccountFormDoc(accountDoc)
  }
}

module.exports = new AccountService()
