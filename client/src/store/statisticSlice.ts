import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
  InitialStateType,
  StatisticDateType,
  StatisticSection,
  StatisticTransactionType
} from "../types/sliceTypes/statistic.type";

const initialState = {
  activeStatisticTransactionType: StatisticTransactionType.General,
  statisticDateType: StatisticDateType.PerYear,
  dateCounter: 1,
  data: []
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
      state.dateCounter = 1
    },
    addStatisticDateCounter: state => {
      state.dateCounter += 1
    },
    subStatisticDateCounter: state => {
      state.dateCounter -= 1
    },
    setData: (state, action: PayloadAction<StatisticSection[]>) => {
      state.data = action.payload
    },
    resetStatisticSlice: () => initialState
  }
})

export const {
  setActiveStatisticTransactionType,
  setStatisticDateType,
  addStatisticDateCounter,
  subStatisticDateCounter,
  setData,
  resetStatisticSlice
} = statisticSlice.actions

export default statisticSlice.reducer
