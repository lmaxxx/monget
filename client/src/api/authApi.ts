import {createApi} from '@reduxjs/toolkit/query/react'
import {
  AuthResponse,
  CurrencyRegistrationFormValues,
  CurrencyUpdateResponse,
  IUser,
  LoginFormValues,
  RegistrationFormValues,
  UpdateEmailFromValues
} from "../types/sliceTypes/user.type";
import AuthService from "../services/authService";
import baseQueryWithReauth from "./baseQueryWithReauth";

export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginFormValues>({
      query: (formData) => ({
        url: "/api/auth/login",
        method: "POST",
        body: formData
      }),
      async onQueryStarted(id, {dispatch, queryFulfilled}) {
        const {data} = await queryFulfilled
        await AuthService.updateUserData({dispatch, data, isNewUser: true})
      }
    }),
    registration: builder.mutation<AuthResponse, RegistrationFormValues>({
      query: (formData) => ({
        url: "/api/auth/registration",
        method: "POST",
        body: formData
      }),
      async onQueryStarted(id, {dispatch, queryFulfilled}) {
        const {data} = await queryFulfilled
        await AuthService.updateUserData({dispatch, data, isNewUser: true})
      }
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/api/auth/logout",
        method: "POST"
      }),
      async onQueryStarted(id, {dispatch}) {
        await AuthService.deleteUserData(dispatch)
      }
    }),
    checkAuth: builder.mutation<AuthResponse, void>({
      query: () => "/api/auth/refresh",
      async onQueryStarted(id, {dispatch, queryFulfilled}) {
        const {data} = await queryFulfilled
        await AuthService.updateUserData({dispatch, data, isNewUser: true})
      }
    }),
    updateCurrency: builder.mutation<CurrencyUpdateResponse, CurrencyRegistrationFormValues>({
      query: (formData) => ({
        url: "/api/auth/currency",
        method: "PUT",
        body: formData,
      }),
      async onQueryStarted(id, {dispatch, queryFulfilled}) {
        const {data} = await queryFulfilled
        await AuthService.updateUserData({dispatch, data, isNewUser: false})
      }
    }),
    updateEmail: builder.mutation<IUser, UpdateEmailFromValues>({
      query: ({email}) => ({
        url: "/api/auth/email",
        method: "PUT",
        body: {email},
      }),
      async onQueryStarted(id, {dispatch, queryFulfilled}) {
        const {data} = await queryFulfilled
        await AuthService.updateUserData({dispatch, data, isNewUser: false})
      }
    })
  })
})

export const {
  useLoginMutation,
  useRegistrationMutation,
  useCheckAuthMutation,
  useLogoutMutation,
  useUpdateCurrencyMutation,
  useUpdateEmailMutation
} = authApi
