import type {PayloadAction} from "@reduxjs/toolkit";
import {createSlice} from '@reduxjs/toolkit'
import {InitialStateType, TransactionType} from '../types/sliceTypes/transaction.type'

const initialState = {
  activeTransactionType: TransactionType.Expenses
} as InitialStateType

export const transactionSlice = createSlice({
  name: "transactionSlice",
  initialState,
  reducers: {
    setActiveTransactionType: (state, action: PayloadAction<TransactionType>) => {
      state.activeTransactionType = action.payload
    }
  }
})

export const {setActiveTransactionType} = transactionSlice.actions

export default transactionSlice.reducer
