import {createApi} from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./baseQueryWithReauth";
import {ICategory, TransactionType} from "../types/sliceTypes/category.type";
import CategoryService from "../services/categoryService";

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
          : ['Category'],
      async onQueryStarted(id, {dispatch, queryFulfilled}) {
        const {data} = await queryFulfilled
        CategoryService.setCategories({dispatch, data})
      }
    }),
    updateOrder: builder.mutation<any, any>({
      query: (newOrder) => ({
        url: "/api/categories/order",
        method: "PATCH",
        body: {newOrder}
      }),
      invalidatesTags: ["Category"]
    })
  })
})

export const {useGetCategoriesQuery, useUpdateOrderMutation} = categoryApi
