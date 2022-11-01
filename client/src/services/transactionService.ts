import {AnyAction, ThunkDispatch} from "@reduxjs/toolkit";
import {TransactionType} from "../types/sliceTypes/transaction.type";
import {setExpensesTransactions, setIncomeTransactions} from "../store/transactionSlice";

class TransactionService {
  setTransactions({dispatch, data}: {
    dispatch: ThunkDispatch<any, any, AnyAction>,
    data: any,
  }) {
    const transactionType = data[0].transactionType

    if(transactionType === TransactionType.Expenses) {
      dispatch(setExpensesTransactions(data))
    } else {
      dispatch(setIncomeTransactions(data))
    }
  }
}

export default new TransactionService()
