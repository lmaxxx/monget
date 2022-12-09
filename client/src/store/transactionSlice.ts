import type {PayloadAction} from "@reduxjs/toolkit";
import {createSlice} from '@reduxjs/toolkit'
import {
  DateRangeType,
  InitialStateType,
  PieSection,
  TransactionDateRequestType,
  TransactionType
} from '../types/sliceTypes/transaction.type'

const secondDay = new Date()
secondDay.setUTCDate(secondDay.getUTCDate() + 1)

const initialState = {
  activeTransactionType: TransactionType.Expenses,
  expensesChartData: [],
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
    setTransactionDateRequestType: (state, action: PayloadAction<TransactionDateRequestType>) => {
      state.activeTransactionDateRequestType = action.payload
      state.dateCounter = 1
    },
    setRange: (state, action: PayloadAction<DateRangeType>) => {
      state.range = action.payload
    },
    addDateCounter: state => {
      state.dateCounter += 1
    },
    subDateCounter: state => {
      state.dateCounter -= 1
    },
    setExpensesChartData: (state, action: PayloadAction<PieSection[]>) => {
      state.expensesChartData = action.payload
    },
    setIncomeChartData: (state, action: PayloadAction<PieSection[]>) => {
      state.incomeChartData = action.payload
    },
    resetTransactionSlice: () => initialState
  }
})

export const {
  setActiveTransactionType,
  setTransactionDateRequestType,
  setRange,
  addDateCounter,
  subDateCounter,
  setExpensesChartData,
  setIncomeChartData,
  resetTransactionSlice
} = transactionSlice.actions

export default transactionSlice.reducer
