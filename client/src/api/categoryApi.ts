import {createApi} from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./baseQueryWithReauth";
import {ICategory, TransactionType} from "../types/sliceTypes/category.type";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getCategories: builder.query<ICategory[], TransactionType>({
      query: (transactionType) => `/api/categories/${transactionType}`,
      providesTags: (result, error, arg) =>
        result
          ? [...result.map(({id}) => ({type: 'Category' as const, id})), 'Category']
          : ['Category']
    }),
  })
})

export const {useGetCategoriesQuery} = categoryApi
