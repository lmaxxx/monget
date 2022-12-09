import type {PayloadAction} from "@reduxjs/toolkit";
import {createSlice} from '@reduxjs/toolkit'
import {IAccount, InitialStateType} from '../types/sliceTypes/account.type'

const initialState = {
  accounts: [],
  activeAccount: {} as IAccount
} as InitialStateType

export const accountSlice = createSlice({
  name: "accountSlice",
  initialState,
  reducers: {
    setAccounts: (state, action: PayloadAction<IAccount[]>) => {
      state.accounts = action.payload
    },
    setActiveAccount: (state, action: PayloadAction<string>) => {
      state.activeAccount = state.accounts.find(account => account.id === action.payload)!
    },
    resetAccountSlice: () => initialState
  }
})

export const {setAccounts, setActiveAccount, resetAccountSlice} = accountSlice.actions

export default accountSlice.reducer
