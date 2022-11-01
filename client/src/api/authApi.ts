import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {CurrencyRegistrationFormValues, LoginFormValues, RegistrationFormValues} from "../types/sliceTypes/user.type";
import {AuthResponse, CurrencyUpdateResponse} from "../types/sliceTypes/user.type";
import AuthService from "../services/authService";

export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_API_URL, credentials: "include"}),
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
        url: "/api/auth/updateCurrency",
        method: "PUT",
        body: formData,
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
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
  useUpdateCurrencyMutation
} = authApi
