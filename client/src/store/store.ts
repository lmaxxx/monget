import {configureStore} from '@reduxjs/toolkit'
import userReducer from './userSlice'
import accountReducer from "./accountSlice";
import transactionReducer from "./transactionSlice";
import categoryReducer from './categorySlice'
import {authApi} from '../api/authApi'
import {accountApi} from "../api/accountApi";
import {transferApi} from "../api/transferApi";
import {categoryApi} from "../api/categoryApi";

export const store = configureStore({
  reducer: {
    userSlice: userReducer,
    accountSlice: accountReducer,
    transactionSlice: transactionReducer,
    categorySlice: categoryReducer,
    [authApi.reducerPath]: authApi.reducer,
    [accountApi.reducerPath]: accountApi.reducer,
    [transferApi.reducerPath]: transferApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      accountApi.middleware,
      transferApi.middleware,
      categoryApi.middleware
    ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
