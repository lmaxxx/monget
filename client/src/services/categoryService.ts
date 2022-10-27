import {AnyAction, ThunkDispatch} from "@reduxjs/toolkit";
import {setExpensesCategories, setIncomeCategories} from "../store/categorySlice";
import {ICategory, TransactionType} from "../types/sliceTypes/category.type";

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

  getCategoryById(categories: ICategory[], id: string) {
    return categories.find(category => category.id === id)
  }

  calculateSuitableAmountOfCategories(wrapperWidth: number, categoryWidth: number) {
    const categoryWidthWithGap = categoryWidth + 16

    if(!wrapperWidth) return 3

    return Math.floor(wrapperWidth / categoryWidthWithGap)
  }
}

export default new CategoryService()
