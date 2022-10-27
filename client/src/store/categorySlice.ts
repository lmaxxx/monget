import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from "@reduxjs/toolkit";
import {ICategory, InitialStateType, TransactionType} from '../types/sliceTypes/category.type'

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
    }
  }
})

export const {setIncomeCategories, setExpensesCategories, setActiveTransactionType} = categorySlice.actions

export default categorySlice.reducer
