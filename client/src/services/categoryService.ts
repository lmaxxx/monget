import {AnyAction, ThunkDispatch} from "@reduxjs/toolkit";
import {setExpensesCategories, setIncomeCategories} from "../store/categorySlice";
import {ICategory, TransactionType} from "../types/sliceTypes/category.type";
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

  getCategoryById(categories: ICategory[], id: string) {
    return categories.find(category => category.id === id)
  }

  calculateSuitableAmountOfCategories(wrapperWidth: number, categoryWidth: number) {
    const categoryWidthWithGap = categoryWidth + 16

    if(!wrapperWidth) return 3

    return Math.floor(wrapperWidth / categoryWidthWithGap)
  }

  getCategoryEditingConfig() {
    return {
      initialValues: {
        name: ""
      },
      validate: {
        name:  (value: string) => value.trim().length ? null : "You need to type an account name"
      }
    }
  }

  setDefaultEditForm(form: UseFormReturnType<any, (values: any) => any>, category: ICategory) {
    form.setFieldValue("name", category.name)
  }
}

export default new CategoryService()
