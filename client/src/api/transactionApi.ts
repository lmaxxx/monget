import {createApi} from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./baseQueryWithReauth";
import {
  DonutSection,
  GetTransactionParamsType,
  ITransaction,
  TransactionCreatingBodyParams
} from "../types/sliceTypes/transaction.type";
import TransactionService from "../services/transactionService";

export const transactionApi = createApi({
  reducerPath: "transactionApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Transaction"],
  endpoints: (builder) => ({
    getTransactions: builder.query<ITransaction[], GetTransactionParamsType>({
      query: ({accountId, transactionType, dateCounter, transactionDateRequestType, range}) => ( {
        url: transactionType ? `/api/transactions/${transactionType}/${accountId}` : `/api/transactions/${accountId}`,
        params: {[transactionDateRequestType as string]: dateCounter}
      }),
      providesTags: ['Transaction'],
      async onQueryStarted(id, {dispatch, queryFulfilled}) {
        const {data} = await queryFulfilled
        await TransactionService.setTransactions({dispatch, data})
      }
    }),
    getTransaction: builder.query<ITransaction, string>({
      query: (id) => `/api/transaction/${id}`
    }),
    createTransaction: builder.mutation<ITransaction, TransactionCreatingBodyParams>({
      query: (formData) => ({
        url: `/api/transaction`,
        body: formData,
        method: "POST",
      }),
      invalidatesTags: ["Transaction"]
    }),
    editTransaction: builder.mutation<ITransaction, ITransaction>({
      query: (formData) => ({
        url: `/api/transaction/${formData.id}`,
        body: formData,
        method: "PATCH"
      }),
      invalidatesTags: ["Transaction"]
    }),
    deleteTransaction: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/transaction/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Transaction"]
    }),
    getTransactionsChartData: builder.query<DonutSection[], GetTransactionParamsType>({
      query: ({accountId, transactionType, dateCounter, transactionDateRequestType, range}) => ({
        url: `/api/transactions/chart/${transactionType}/${accountId}`,
        params: {[transactionDateRequestType as string]: dateCounter}
      }),
      async onQueryStarted(id, {dispatch, queryFulfilled}) {
        const {data} = await queryFulfilled
        await TransactionService.setChartData({dispatch, data})
      }
    })
  })
})

export const {
  useGetTransactionQuery,
  useGetTransactionsQuery,
  useCreateTransactionMutation,
  useDeleteTransactionMutation,
  useEditTransactionMutation,
  useGetTransactionsChartDataQuery,
  useLazyGetTransactionsChartDataQuery
} = transactionApi
