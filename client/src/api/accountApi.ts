import {createApi} from "@reduxjs/toolkit/query/react";
import {IAccount} from "../types/sliceTypes/account.type";
import baseQueryWithReauth from "./baseQueryWithReauth";
import {AccountCreatingBodyParams} from "../types/sliceTypes/account.type";
import AccountService from "../services/accountService";
import {RootState} from "../store/store";

export const accountApi = createApi({
  reducerPath: "accountsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Account"],
  endpoints: (builder) => ({
    getAccounts: builder.query<IAccount[], void>({
      query: () => "/api/accounts",
      providesTags: ['Account'],
      async onQueryStarted(id, {dispatch, queryFulfilled}) {
        const {data} = await queryFulfilled
        await AccountService.setAccounts({dispatch, data})
      }
    }),
    getAccount: builder.query<IAccount, string>({
      query: (id) => `/api/account/${id}`,
    }),
    createAccount: builder.mutation<IAccount, AccountCreatingBodyParams>({
      query: (formData) => ({
        url: "/api/account",
        method: "POST",
        body: formData
      }),
      invalidatesTags: ["Account"]
    }),
    editAccount: builder.mutation<IAccount, IAccount>({
      query: (formData) => ({
        url: `/api/account/${formData.id}`,
        method: "PATCH",
        body: formData
      }),
      invalidatesTags: ["Account"]
    }),
    deleteAccount: builder.mutation<void, string>({
      query: (id) =>  ({
        url: `/api/account/${id}`,
        method: "DELETE"
      }),
      async onQueryStarted(id, {dispatch, getState}) {
        const state = getState() as RootState

        await AccountService.setNewActiveAccount({dispatch, accounts: state.accountSlice.accounts, deletedId: id})
      },
      invalidatesTags: ["Account"]
    })
  })
})

export const {
  useGetAccountsQuery,
  useCreateAccountMutation,
  useLazyGetAccountsQuery,
  useEditAccountMutation,
  useGetAccountQuery,
  useDeleteAccountMutation
} = accountApi
