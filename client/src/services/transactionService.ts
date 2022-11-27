import {AnyAction, ThunkDispatch} from "@reduxjs/toolkit";
import {
  DateRangeType,
  TransactionDateRequestType,
  TransactionType
} from "../types/sliceTypes/transaction.type";
import {
  setExpensesChartData,
  setIncomeChartData,
} from "../store/transactionSlice";
import DateService from "./dateService";

class TransactionService {
  setChartData({dispatch, data}: {
    dispatch: ThunkDispatch<any, any, AnyAction>,
    data: any,
  }) {
    if(data.transactionType === TransactionType.Expenses) {
      dispatch(setExpensesChartData(data.chartData))
    } else {
      dispatch(setIncomeChartData(data.chartData))
    }
  }

  getTransactionParams(params: any) {
    const defaultParams = this.getDateParams(params.dateCounter, params.transactionDateRequestType, params.range) || {}  as any

    if(params.categoryId) defaultParams.categoryId = params.categoryId
    if(params.page) defaultParams.page = params.page

    return defaultParams
  }

  getDateParams(dateCounter?: number, transactionDateRequestType?: TransactionDateRequestType, range?: DateRangeType) {
    if(transactionDateRequestType === TransactionDateRequestType.Range && range) {
      return {
        rangeStart: range[0]?.getTime(),
        rangeEnd: range[1]?.getTime()
      }
    }

    if(dateCounter && transactionDateRequestType) {
      return {[transactionDateRequestType]: dateCounter}
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
    const stringDateOptions: Intl.DateTimeFormatOptions = {year: 'numeric', month: 'short', day: 'numeric' };
    const currentDate = new Date()

    if(transactionDateRequestType === TransactionDateRequestType.Range && range.length) {
      const [rangeStart, rangeEnd] = range

      if(!rangeStart || !rangeEnd) return ""

      const start = rangeStart.toLocaleDateString("en-US", stringDateOptions)
      const end = rangeEnd.toLocaleDateString("en-US", stringDateOptions)

      return `${start} - ${end}`
    }

    if(transactionDateRequestType === TransactionDateRequestType.Today) {
      const currentDay = DateService.subtractDays(currentDate, dateCounter).toLocaleDateString("en-US", stringDateOptions)

      return `${currentDay}`
    }

    if(transactionDateRequestType === TransactionDateRequestType.Week) {
      const weekStartDay = DateService.subtractDays(currentDate, dateCounter * 7)
      const start = DateService.getStartOfTheDay(weekStartDay).toLocaleDateString("en-US", stringDateOptions)
      const end = DateService.addDays(weekStartDay, 7).toLocaleDateString("en-US", stringDateOptions)

      return `${start} - ${end}`
    }

    if(transactionDateRequestType === TransactionDateRequestType.Month) {
      const monthStartDay = DateService.substractMonths(currentDate, dateCounter)
      const monthEndDay = new Date(monthStartDay.getFullYear(), monthStartDay.getMonth()+1, 0)

      monthStartDay.setUTCDate(1)
      const start = DateService.getStartOfTheDay(monthStartDay).toLocaleDateString("en-US", stringDateOptions)
      const end = DateService.getEndOfTheDay(monthEndDay).toLocaleDateString("en-US", stringDateOptions)

      return `${start} - ${end}`
    }
  }
}

export default new TransactionService()
