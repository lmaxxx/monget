import {AnyAction, ThunkDispatch} from "@reduxjs/toolkit";
import {setExpensesCategories, setIncomeCategories} from "../store/categorySlice";
import {TransactionType} from "../types/sliceTypes/category.type";

class CategoryService {
  setCategories({dispatch, data}: {
    dispatch: ThunkDispatch<any, any, AnyAction>,
    data: any,
  }) {
    const transactionType = data[0].transactionType

    if(transactionType === TransactionType.Expenses) {
      dispatch(setExpensesCategories(data))
    } else {
      dispatch(setIncomeCategories(data))
    }
  }
}

export default new CategoryService()
