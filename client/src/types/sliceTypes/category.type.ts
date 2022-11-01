import {TransactionIconType} from "../../data/transactionIcons";
import {TransactionType} from "./transaction.type";

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

export interface InitialStateType {
  incomeCategories: ICategory[]
  expensesCategories: ICategory[]
  activeTransactionType: TransactionType
}
