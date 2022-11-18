import {createApi} from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./baseQueryWithReauth";
import {
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
      query: ({accountId, transactionType}) => (
        transactionType ? `/api/transactions/${transactionType}/${accountId}` : `/api/transactions/${accountId}`
      ),
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
    })
  })
})

export const {
  useGetTransactionQuery,
  useGetTransactionsQuery,
  useCreateTransactionMutation,
  useDeleteTransactionMutation,
  useEditTransactionMutation
} = transactionApi
