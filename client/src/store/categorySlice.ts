import type {PayloadAction} from "@reduxjs/toolkit";
import {createSlice} from '@reduxjs/toolkit'
import {TransactionType} from '../types/sliceTypes/transaction.type'
import {ICategory, InitialStateType} from '../types/sliceTypes/category.type'

const initialState = {
  incomeCategories: [],
  expensesCategories: [],
  activeTransactionType: TransactionType.Expenses
} as InitialStateType

export const categorySlice = createSlice({
  name: "categorySlice",
  initialState,
  reducers: {
    setIncomeCategories: (state, action: PayloadAction<ICategory[]>) => {
      state.incomeCategories = action.payload
    },
    setExpensesCategories: (state, action: PayloadAction<ICategory[]>) => {
      state.expensesCategories = action.payload
    },
    setActiveTransactionType: (state, action: PayloadAction<TransactionType>) => {
      state.activeTransactionType = action.payload
    },
    resetCategorySlice: () => initialState
  }
})

export const {
  setIncomeCategories,
  setExpensesCategories,
  setActiveTransactionType,
  resetCategorySlice
} = categorySlice.actions

export default categorySlice.reducer
