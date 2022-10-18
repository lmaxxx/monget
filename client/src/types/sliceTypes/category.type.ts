export interface ICategory {
  name: string
  iconName: string
  iconBackgroundColor: string
  ownerId: string
  createdAt: Date,
  transactionType: TransactionType,
  order: number,
  id: string
}

export enum TransactionType {
  Expenses = "expenses", Income = "income"
}
