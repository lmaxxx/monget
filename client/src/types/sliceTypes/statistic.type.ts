export interface InitialStateType {
  activeStatisticTransactionType: StatisticTransactionType
  statisticDateType: StatisticDateType
  dateCounter: number
  data: StatisticSection[]
}

export enum StatisticTransactionType {
  General = "", Expenses = "expenses", Income = "income"
}

export enum StatisticDateType {
  PerWeek = "weeks", PerMonth = "months", PerYear = "years"
}

export interface GetStatisticQueryParams {
  [StatisticDateType.PerYear]?: number
  [StatisticDateType.PerWeek]?: number
  [StatisticDateType.PerMonth]?: number
  statisticTransactionType: StatisticTransactionType
}

export interface StatisticSection {
  label: string
  expenses: number
  income: number
  profit: number
  loss: number
}
