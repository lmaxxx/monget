class TransferService {
  getTransferCreatingFormConfig() {
    return {
      initialValues: {
        from: "",
        to: "",
        amount: ""
      },
      validate: {
        to: (value: string) => value.trim().length ? null : "You need to choose from account",
        amount: (value: string) => !!parseInt(value) ? null: "You need to type amount",
        from: (value: string) => value.trim().length ? null : "You need to choose to account"
      }
    }
  }
}

export default new TransferService()
