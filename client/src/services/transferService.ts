class TransferService {
  getTransferCreatingFormConfig() {
    return {
      initialValues: {
        from: "",
        to: "",
        amount: 0
      },
      validate: {
        to: (value: string) => value.trim().length ? null : "You need to choose FROM account",
        amount: (value: number) => value > 0 ? null : "Amount should be more than 0",
        from: (value: string) => value.trim().length ? null : "You need to choose TO account"
      }
    }
  }
}

export default new TransferService()
