import {AnyAction, ThunkDispatch} from "@reduxjs/toolkit";
import {DateRangeType, TransactionDateRequestType, TransactionType} from "../types/sliceTypes/transaction.type";
import {setExpensesTransactions, setIncomeTransactions} from "../store/transactionSlice";
import DateService from "./dateService";

class TransactionService {
  setTransactions({dispatch, data}: {
    dispatch: ThunkDispatch<any, any, AnyAction>,
    data: any,
  }) {
    if(!data.length) return

    const transactionType = data[0].transactionType

    if(transactionType === TransactionType.Expenses) {
      dispatch(setExpensesTransactions(data))
    } else {
      dispatch(setIncomeTransactions(data))
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
}

export default new TransactionService()
