const Account = require("../models/Account");
const DataService = require("../services/dataService")

class AccountService {
  async createAccount(userData, data) {
    if(!data) {
      const accountDoc = await Account.create({
        currency: userData.currency,
        ownerId: userData.id,
        accountName: "Main",
        iconName: "cash",
        iconBackgroundColor: "#20c997"
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
      amount
    })

    return DataService.getAccountFormDoc(accountDoc)
  }

  async getAccounts(userId) {
    const accountsDocs = await Account.find({ownerId: userId})
    const accounts = DataService.getAccountsFromDocs(accountsDocs)

    return accounts
  }

}

module.exports = new AccountService()
