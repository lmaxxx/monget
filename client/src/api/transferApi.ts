import {createApi} from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./baseQueryWithReauth";

export const transferApi = createApi({
  reducerPath: "transferApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getTransfers: builder.query<any, void>({
      query: () => "/api/transfers"
    }),
    createTransfer: builder.mutation<any, any>({
      query: (formData) => ({
        url: "/api/transfer",
        method: "POST",
        body: formData
      })
    })
  })
})

export const {useGetTransfersQuery, useCreateTransferMutation} = transferApi
