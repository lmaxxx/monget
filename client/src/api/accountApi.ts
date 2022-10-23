import {createApi} from "@reduxjs/toolkit/query/react";
import {IAccount} from "../types/sliceTypes/account.type";
import baseQueryWithReauth from "./baseQueryWithReauth";
import {AccountCreatingFormValues} from "../types/form.type";
import AccountService from "../services/accountService";

export const accountApi = createApi({
  reducerPath: "accountsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Account"],
  endpoints: (builder) => ({
    getAccounts: builder.query<IAccount[], void>({
      query: () => "/api/accounts",
      providesTags: (result, error, arg) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Account' as const, id })), 'Account']
          : ['Account'],
      async onQueryStarted(id, {dispatch, queryFulfilled}) {
        const {data} = await queryFulfilled
        await AccountService.setAccounts({dispatch, data})
      }
    }),
    getAccount: builder.query<IAccount, string>({
      query: (id) => `/api/account/${id}`
    }),
    createAccount: builder.mutation<IAccount, AccountCreatingFormValues>({
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
    })
  })
})

export const {
  useGetAccountsQuery,
  useCreateAccountMutation,
  useLazyGetAccountsQuery,
  useEditAccountMutation,
  useGetAccountQuery
} = accountApi
