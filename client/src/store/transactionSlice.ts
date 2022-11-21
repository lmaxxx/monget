import type {PayloadAction} from "@reduxjs/toolkit";
import {createSlice} from '@reduxjs/toolkit'
import {
  DateRangeType,
  InitialStateType,
  ITransaction,
  TransactionDateRequestType,
  TransactionType
} from '../types/sliceTypes/transaction.type'

const initialState = {
  activeTransactionType: TransactionType.Expenses,
  expensesTransactions: [],
  incomeTransactions: [],
  transactionDateRequestType: TransactionDateRequestType.Today,
  dateCounter: 1,
  range: [
    new Date(),
    new Date()
  ]
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
    },
    setTransactionDateRequestType: (state, action: PayloadAction<TransactionDateRequestType>) => {
      state.transactionDateRequestType = action.payload
      state.dateCounter = 1
    },
    setRange: (state, action: PayloadAction<DateRangeType>) => {
      state.range = action.payload
    },
    addDateCounter: (state) => {
      state.dateCounter += 1
    },
    subDateCounter: (state) => {
      state.dateCounter -= 1
    }
  }
})

export const {
  setActiveTransactionType,
  setExpensesTransactions,
  setIncomeTransactions,
  setTransactionDateRequestType,
  setRange,
  addDateCounter,
  subDateCounter
} = transactionSlice.actions

export default transactionSlice.reducer
