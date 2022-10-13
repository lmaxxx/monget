import {createApi} from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./baseQueryWithReauth";
import {ITransfer} from "../types/sliceTypes/transfer.type";
import {TransferCreatingFormValues} from "../types/form.type";

export const transferApi = createApi({
  reducerPath: "transferApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Transfer"],
  endpoints: (builder) => ({
    getTransfers: builder.query<ITransfer[], void>({
      query: () => "/api/transfers",
      providesTags: (result, error, arg) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Transfer' as const, id })), 'Transfer']
          : ['Transfer'],
    }),
    createTransfer: builder.mutation<ITransfer, TransferCreatingFormValues>({
      query: (formData) => ({
        url: "/api/transfer",
        method: "POST",
        body: formData
      }),
      invalidatesTags: ["Transfer"]
    })
  })
})

export const {useGetTransfersQuery, useCreateTransferMutation} = transferApi
