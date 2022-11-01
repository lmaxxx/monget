import {IAccount} from "./account.type";
import {ICategory} from "./category.type";
import {IUser} from "./user.type";

export interface InitialStateType {
  activeTransactionType: TransactionType
  incomeTransactions: ITransaction[]
  expensesTransactions: ITransaction[]
}

export enum TransactionType {
  Expenses = "expenses", Income = "income"
}

export interface ITransaction {
  title: string,
  description: string,
  ownerId: string | IUser,
  createdAt: number,
  accountId: string | IAccount,
  transactionType: TransactionType,
  categoryId: string | ICategory,
  amount: number,
  currency: string,
  id: string
}
