import {createApi} from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./baseQueryWithReauth";
import {GetTransfersParamsType, ITransfer, TransferCreatingFormValues} from "../types/sliceTypes/transfer.type";

export const transferApi = createApi({
  reducerPath: "transferApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Transfer"],
  endpoints: (builder) => ({
    getTransfers: builder.query<ITransfer[], GetTransfersParamsType>({
      query: ({page}) => page ? `/api/transfers?page=${page}` : "/api/transfers",
      providesTags: ['Transfer'],
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

export const {useGetTransfersQuery, useCreateTransferMutation, useLazyGetTransfersQuery} = transferApi
