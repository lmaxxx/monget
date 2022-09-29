import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from "@reduxjs/toolkit";
import type {InitialStateType, IUser} from "../types/sliceTypes/user.type";

const initialState: InitialStateType = {
  isAuth: null,
  user: {}
} as InitialStateType

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload
    },
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload
    }
  }
})

export const {setAuth, setUser} = userSlice.actions

export default userSlice.reducer
