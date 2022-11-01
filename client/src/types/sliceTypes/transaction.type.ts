export interface InitialStateType {
  activeTransactionType: TransactionType
}

export enum TransactionType {
  Expenses = "expenses", Income = "income"
}
