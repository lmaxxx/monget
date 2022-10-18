import {createApi} from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./baseQueryWithReauth";
import {ICategory} from "../types/sliceTypes/category.type";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getIncomeCategories: builder.query<ICategory[], void>({
      query: () => "/api/categories/income",
      providesTags: (result, error, arg) =>
        result
          ? [...result.map(({id}) => ({type: 'Category' as const, id})), 'Category']
          : ['Category']
    }),
    getExpensesCategories: builder.query<ICategory[], void>({
      query: () => "/api/categories/expenses",
      providesTags: (result, error, arg) =>
        result
          ? [...result.map(({id}) => ({type: 'Category' as const, id})), 'Category']
          : ['Category']
    }),
  })
})

export const {useGetExpensesCategoriesQuery, useGetIncomeCategoriesQuery} = categoryApi
