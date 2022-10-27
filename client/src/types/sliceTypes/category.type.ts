import {TransactionIconType} from "../../data/transactionIcons";

export interface ICategory {
  name: string
  iconName: TransactionIconType
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

export interface InitialStateType {
  incomeCategories: ICategory[]
  expensesCategories: ICategory[]
  activeTransactionType: TransactionType
}
