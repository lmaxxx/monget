import {AnyAction, ThunkDispatch} from "@reduxjs/toolkit";
import {setExpensesCategories, setIncomeCategories} from "../store/categorySlice";
import {ICategory} from "../types/sliceTypes/category.type";
import {TransactionType} from "../types/sliceTypes/transaction.type";
import {UseFormReturnType} from "@mantine/form";
import {IAccount} from "../types/sliceTypes/account.type";

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

  setAllCategories({dispatch, data}: {
    dispatch: ThunkDispatch<any, any, AnyAction>,
    data: ICategory[],
  }) {
    const expensesCategories = data.filter(category => category.transactionType == TransactionType.Expenses)
    const incomeCategories = data.filter(category => category.transactionType == TransactionType.Income)

    dispatch(setExpensesCategories(expensesCategories))
    dispatch(setIncomeCategories(incomeCategories))
  }

  getCategoryById(categories: ICategory[], id: string) {
    return categories.find(category => category.id === id)
  }

  calculateSuitableAmountOfCategories(wrapperWidth: number, categoryWidth: number) {
    const categoryWidthWithGap = categoryWidth + 16

    if(!wrapperWidth) return 3

    return Math.floor(wrapperWidth / categoryWidthWithGap)
  }

  getCategoryFormConfig() {
    return {
      initialValues: {
        name: ""
      },
      validate: {
        name:  (value: string) => value.trim().length ? null : "You need to type a category name"
      }
    }
  }

  setDefaultEditForm(form: UseFormReturnType<any, (values: any) => any>, category: ICategory) {
    form.setFieldValue("name", category.name)
  }

  getPercentOfCategory(wholeNumber: number, value: number) {
    const percents = Math.round(value * 100 / wholeNumber)

    if(percents === 0) return "<1%"

    return percents + "%"
  }
}

export default new CategoryService()
