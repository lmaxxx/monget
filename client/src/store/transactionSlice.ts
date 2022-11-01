import type {PayloadAction} from "@reduxjs/toolkit";
import {createSlice} from '@reduxjs/toolkit'
import {InitialStateType, ITransaction, TransactionType} from '../types/sliceTypes/transaction.type'

const initialState = {
  activeTransactionType: TransactionType.Expenses,
  expensesTransactions: [],
  incomeTransactions: []
} as InitialStateType

export const transactionSlice = createSlice({
  name: "transactionSlice",
  initialState,
  reducers: {
    setActiveTransactionType: (state, action: PayloadAction<TransactionType>) => {
      state.activeTransactionType = action.payload
    },
    setIncomeTransactions: (state, action: PayloadAction<ITransaction[]>) => {
      state.incomeTransactions = action.payload
    },
    setExpensesTransactions: (state, action: PayloadAction<ITransaction[]>) => {
      state.expensesTransactions = action.payload
    }
  }
})

export const {
  setActiveTransactionType,
  setExpensesTransactions,
  setIncomeTransactions
} = transactionSlice.actions

export default transactionSlice.reducer
