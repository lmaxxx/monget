import {AnyAction, ThunkDispatch} from "@reduxjs/toolkit";
import {
  DateRangeType, DonutSection,
  ITransaction,
  TransactionDateRequestType,
  TransactionType
} from "../types/sliceTypes/transaction.type";
import {
  setExpensesDataForDonut,
  setExpensesTransactions,
  setIncomeDataForDonut,
  setIncomeTransactions
} from "../store/transactionSlice";
import DateService from "./dateService";
import CategoryService from "./categoryService";
import {ICategory} from "../types/sliceTypes/category.type";

class TransactionService {
  setTransactions({dispatch, data, categories}: {
    dispatch: ThunkDispatch<any, any, AnyAction>,
    data: any,
    categories: ICategory[]
  }) {
    if(!data.length) {
      dispatch(setExpensesTransactions([]))
      dispatch(setIncomeTransactions([]))
      dispatch(setExpensesDataForDonut([]))
      dispatch(setIncomeDataForDonut([]))
      return
    }

    const transactionType = data[0].transactionType
    const dataForDonut = this.processDataForDonut(data, transactionType, categories)

    if(transactionType === TransactionType.Expenses) {
      dispatch(setExpensesTransactions(data))
      dispatch(setExpensesDataForDonut(dataForDonut))
    } else {
      dispatch(setIncomeTransactions(data))
      dispatch(setIncomeDataForDonut(dataForDonut))
    }
  }

  getCreateTransactionFormConfig() {
    return {
      initialValues: {
        title: "",
        description: "",
        currency: "",
        amount: 0,
        date: new Date(),
      },
      validate: {
        title: (value: string) => value.trim().length ? null : "Title must be least 3 chars long",
        currency: (value: string) => value.trim().length ? null : "You need to choose currency",
        amount: (value: number) => value > 0 ? null : "Amount should be bigger than 0"
      }
    }
  }

  getDateLabelText(transactionDateRequestType: TransactionDateRequestType, dateCounter: number, range: DateRangeType) {
    const stirngDateOptions: Intl.DateTimeFormatOptions = {year: 'numeric', month: 'short', day: 'numeric' };
    const currentDate = new Date()

    if(transactionDateRequestType === TransactionDateRequestType.Range && range.length) {
      const [rangeStart, rangeEnd] = range

      if(!rangeStart || !rangeEnd) return ""

      const start = rangeStart.toLocaleDateString("en-US", stirngDateOptions)
      const end = rangeEnd.toLocaleDateString("en-US", stirngDateOptions)

      return `${start} - ${end}`
    }

    if(transactionDateRequestType === TransactionDateRequestType.Today) {
      const currentDay = DateService.subtractDays(currentDate, dateCounter).toLocaleDateString("en-US", stirngDateOptions)

      return `${currentDay}`
    }

    if(transactionDateRequestType === TransactionDateRequestType.Week) {
      const weekStartDay = DateService.subtractDays(currentDate, dateCounter * 7)
      const start = DateService.getStartOfTheDay(weekStartDay).toLocaleDateString("en-US", stirngDateOptions)
      const end = DateService.addDays(weekStartDay, 7).toLocaleDateString("en-US", stirngDateOptions)

      return `${start} - ${end}`
    }

    if(transactionDateRequestType === TransactionDateRequestType.Month) {
      const monthStartDay = DateService.substractMonths(currentDate, dateCounter)
      const monthEndDay = new Date(monthStartDay.getFullYear(), monthStartDay.getMonth()+1, 0)

      monthStartDay.setUTCDate(1)
      const start = DateService.getStartOfTheDay(monthStartDay).toLocaleDateString("en-US", stirngDateOptions)
      const end = DateService.getEndOfTheDay(monthEndDay).toLocaleDateString("en-US", stirngDateOptions)

      return `${start} - ${end}`
    }
  }

  processDataForDonut(data: ITransaction[], transactionType: TransactionType, categories: ICategory[]) {
    const dataForDonut: DonutSection[] = []
    const categoriesId = data.map(transaction => transaction.categoryId) as string[]
    const uniqueCategoriesId = categoriesId.filter((categoryId, index) => (
      categoriesId.indexOf(categoryId) === index
    ))
    uniqueCategoriesId.forEach(categoryId => {
      const transactionsWithCurrentCategory = data.filter(transaction => (
        transaction.categoryId === categoryId
      ))
      const currentCategory = CategoryService.getCategoryById(categories, categoryId)!
      const donutSection: DonutSection = {
        id: categoryId,
        value: 0,
        color: currentCategory.iconBackgroundColor
      }

      transactionsWithCurrentCategory.forEach(transaction => {
        donutSection.value += transaction.amount
      })

      dataForDonut.push(donutSection)
    })

    return dataForDonut
  }
}

export default new TransactionService()
