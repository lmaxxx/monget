import {IAccount} from "./account.type";
import {ICategory} from "./category.type";
import {IUser} from "./user.type";

export interface InitialStateType {
  activeTransactionType: TransactionType
  incomeTransactions: ITransaction[]
  expensesTransactions: ITransaction[]
  expensesChartData: DonutSection[],
  incomeChartData: DonutSection[],
  activeTransactionDateRequestType: TransactionDateRequestType
  dateCounter: number
  range: DateRangeType
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
  transactionType?: TransactionType
  transactionDateRequestType?: TransactionDateRequestType
  dateCounter?: number
  range?: DateRangeType
}

export enum TransactionDateRequestType {
  Today = "days", Week = "weeks", Month = "months", Range = "range"
}

export interface DonutSection {
  id: string,
  value: number
  color: string,
}

export type DateRangeType = [Date | null, Date | null]
