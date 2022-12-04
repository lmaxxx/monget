import {TransactionIconType} from "../../data/transactionIcons";
import {TransactionType} from "./transaction.type";

export interface InitialStateType {
  incomeCategories: ICategory[]
  expensesCategories: ICategory[]
  activeTransactionType: TransactionType
}

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

export interface CategoryCreatingFormValues {
  name: string
}

export interface CategoryCreatingBodyParams extends CategoryCreatingFormValues {
  iconName: TransactionIconType
  transactionType: TransactionType
  iconBackgroundColor: string
}
