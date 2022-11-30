import {configureStore} from '@reduxjs/toolkit'
import userReducer from './userSlice'
import accountReducer from "./accountSlice";
import transactionReducer from "./transactionSlice";
import categoryReducer from './categorySlice'
import statisticReducer from "./statisticSlice";
import {authApi} from '../api/authApi'
import {accountApi} from "../api/accountApi";
import {transferApi} from "../api/transferApi";
import {categoryApi} from "../api/categoryApi";
import {transactionApi} from '../api/transactionApi'
import {statisticApi} from "../api/statisticApi";

export const store = configureStore({
  reducer: {
    userSlice: userReducer,
    accountSlice: accountReducer,
    transactionSlice: transactionReducer,
    categorySlice: categoryReducer,
    statisticSlice: statisticReducer,
    [authApi.reducerPath]: authApi.reducer,
    [accountApi.reducerPath]: accountApi.reducer,
    [transferApi.reducerPath]: transferApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [transactionApi.reducerPath]: transactionApi.reducer,
    [statisticApi.reducerPath]: statisticApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck: false}).concat(
      authApi.middleware,
      accountApi.middleware,
      transferApi.middleware,
      categoryApi.middleware,
      transactionApi.middleware,
      statisticApi.middleware
    ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
