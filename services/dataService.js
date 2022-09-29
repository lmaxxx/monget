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
    return accountsDocs.map((accountDoc) => this.getAccountFormDoc(accountDoc))
  }
}

module.exports = new DataService()
