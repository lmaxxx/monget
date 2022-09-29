import type {PayloadAction} from "@reduxjs/toolkit";
import {createSlice} from '@reduxjs/toolkit'
import {InitialStateType} from '../types/sliceTypes/financeHistory.type'
import {HomeSwitchValue} from "../types/ui.type";

const initialState = {
  activeSection: HomeSwitchValue.Expenses
} as InitialStateType

export const financeHistorySlice = createSlice({
  name: "financeHistorySlice",
  initialState,
  reducers: {
    setActiveSection: (state, action: PayloadAction<HomeSwitchValue>) => {
      state.activeSection = action.payload
    }
  }
})

export const {setActiveSection} = financeHistorySlice.actions

export default financeHistorySlice.reducer
