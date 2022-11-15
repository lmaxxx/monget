import {AnyAction, ThunkDispatch} from "@reduxjs/toolkit";
import {TransactionType} from "../types/sliceTypes/transaction.type";
import {setExpensesTransactions, setIncomeTransactions} from "../store/transactionSlice";

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
}

export default new TransactionService()
