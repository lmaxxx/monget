import {IAccount} from "./account.type";
import {ICategory} from "./category.type";
import {IUser} from "./user.type";

export interface InitialStateType {
  activeTransactionType: TransactionType
  incomeTransactions: ITransaction[]
  expensesTransactions: ITransaction[]
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
  date: Date
  id: string
}

export interface TransactionCreatingFormValues {
  title: string
  description?: string
  currency: string
  amount: number
  date: Date
}

export interface TransactionCreatingBodyParams extends TransactionCreatingFormValues{
  transactionType: TransactionType
  accountId: string
  categoryId: string
}

export enum TransactionType {
  Expenses = "expenses", Income = "income"
}

export interface GetTransactionParamsType {
  accountId: string,
  transactionType?: TransactionType,
}

export enum TransactionRequestDateType {
  Today = "today", Week = "week", Month = "month", Range = "range"
}

export const TransactionRequestDays = {
  [TransactionRequestDateType.Today]: 0,
  [TransactionRequestDateType.Week]: 6,
  [TransactionRequestDateType.Month]: 29,
}

export type DateRangeType = [Date, Date]
