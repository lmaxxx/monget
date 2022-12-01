import {createApi} from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./baseQueryWithReauth";
import {
  PieSection,
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
      query: ({transactionType, accountId, ...params}) => ( {
        url: transactionType ?
          `/api/transactions/${transactionType}/${accountId}`
          :
          `/api/transactions/${accountId}`,
        params: TransactionService.getTransactionParams(params)
      }),
      providesTags: ['Transaction']
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
    getTransactionsChartData: builder.query<PieSection[], GetTransactionParamsType>({
      query: ({accountId, transactionType, dateCounter, transactionDateRequestType, range}) => ({
        url: `/api/transactions/chart/${transactionType}/${accountId}`,
        params: TransactionService.getDateParams(dateCounter, transactionDateRequestType, range)
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
  useLazyGetTransactionsQuery,
  useCreateTransactionMutation,
  useDeleteTransactionMutation,
  useEditTransactionMutation,
  useLazyGetTransactionsChartDataQuery,
} = transactionApi
