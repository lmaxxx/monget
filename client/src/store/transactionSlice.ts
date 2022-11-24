import type {PayloadAction} from "@reduxjs/toolkit";
import {createSlice} from '@reduxjs/toolkit'
import {
  DateRangeType, DonutSection,
  InitialStateType,
  ITransaction,
  TransactionDateRequestType,
  TransactionType
} from '../types/sliceTypes/transaction.type'

const secondDay = new Date()
secondDay.setDate(secondDay.getDate() + 1)

const initialState = {
  activeTransactionType: TransactionType.Expenses,
  expensesTransactions: [],
  expensesChartData: [],
  incomeTransactions: [],
  incomeChartData: [],
  activeTransactionDateRequestType: TransactionDateRequestType.Today,
  dateCounter: 1,
  range: [
    new Date(),
    secondDay
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
      state.activeTransactionDateRequestType = action.payload
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
    },
    setExpensesChartData(state, action: PayloadAction<DonutSection[]>) {
      state.expensesChartData = action.payload
    },
    setIncomeChartData(state, action: PayloadAction<DonutSection[]>) {
      state.incomeChartData = action.payload
    },
  }
})

export const {
  setActiveTransactionType,
  setExpensesTransactions,
  setIncomeTransactions,
  setTransactionDateRequestType,
  setRange,
  addDateCounter,
  subDateCounter,
  setExpensesChartData,
  setIncomeChartData
} = transactionSlice.actions

export default transactionSlice.reducer
