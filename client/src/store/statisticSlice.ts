import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {InitialStateType, StatisticDateType, StatisticTransactionType} from "../types/sliceTypes/statistic.type";

const initialState = {
  activeStatisticTransactionType: StatisticTransactionType.General,
  statisticDateType: StatisticDateType.PerWeek,
  dateCounter: 1
} as InitialStateType

export const statisticSlice = createSlice({
  name: "statisticSlice",
  initialState,
  reducers: {
    setActiveStatisticTransactionType: (state, action: PayloadAction<StatisticTransactionType>) => {
      state.activeStatisticTransactionType = action.payload
    },
    setStatisticDateType: (state, action: PayloadAction<StatisticDateType>) => {
      state.statisticDateType = action.payload
    },
    addStatisticDateCounter: (state) => {
      state.dateCounter += 1
    },
    subStatisticDateCounter: (state) => {
      state.dateCounter -= 1
    },
  }
})

export const {
  setActiveStatisticTransactionType,
  setStatisticDateType,
  addStatisticDateCounter,
  subStatisticDateCounter
} = statisticSlice.actions

export default statisticSlice.reducer
