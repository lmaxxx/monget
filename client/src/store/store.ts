import {configureStore} from '@reduxjs/toolkit'
import userReducer from './userSlice'
import {authApi} from '../api/authApi'
import {accountApi} from "../api/accountApi";
import accountReducer from "./accountSlice";
import financeHistoryReducer from "./financeHistorySlice";
import {transferApi} from "../api/transferApi";

export const store = configureStore({
  reducer: {
    userSlice: userReducer,
    accountSlice: accountReducer,
    financeHistory: financeHistoryReducer,
    [authApi.reducerPath]: authApi.reducer,
    [accountApi.reducerPath]: accountApi.reducer,
    [transferApi.reducerPath]: transferApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, accountApi.middleware, transferApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
