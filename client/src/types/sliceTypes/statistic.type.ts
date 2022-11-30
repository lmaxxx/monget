export interface InitialStateType {
  activeStatisticTransactionType: StatisticTransactionType
  statisticDateType: StatisticDateType
  dateCounter: number
}

export enum StatisticTransactionType {
  General = "general", Expenses = "expenses", Income = "income"
}

export enum StatisticDateType {
  PerWeek = "weeks", PerMonth = "months", PerYear = "years"
}
