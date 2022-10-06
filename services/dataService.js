const {Schema} = require("mongoose");

class DataService {
  getUserFromDoc(userDoc) {
    return {
      email: userDoc.email,
      password: userDoc.password,
      name: userDoc.name,
      isActivated: userDoc.isActivated,
      currency: userDoc.currency,
      activationLink: userDoc.activationLink,
      id: userDoc._id
    }
  }

  getAccountFormDoc(accountDoc) {
    return {
      currency: accountDoc.currency,
      createdAt: accountDoc.createdAt,
      ownerId: accountDoc.ownerId,
      accountName: accountDoc.accountName,
      iconName: accountDoc.iconName,
      iconBackgroundColor: accountDoc.iconBackgroundColor,
      amount: accountDoc.amount,
      id: accountDoc._id
    }
  }

  getAccountsFromDocs(accountsDocs) {
    return accountsDocs.map(accountDoc => this.getAccountFormDoc(accountDoc))
  }

  getTransferFromDoc(transferDoc) {
    return {
      userId: transferDoc.userId,
      from: transferDoc.from,
      to: transferDoc.to,
      amount: transferDoc.amount,
      id: transferDoc._id
    }
  }

  getTransfersFromDocs(transfersDocs) {
    return transfersDocs.map(transfersDoc => this.getTransferFromFoc(transfersDoc))
  }
}

module.exports = new DataService()
