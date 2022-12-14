import {createApi} from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./baseQueryWithReauth";
import {TransactionType} from "../types/sliceTypes/transaction.type";
import {CategoryCreatingBodyParams, ICategory} from "../types/sliceTypes/category.type"
import CategoryService from "../services/categoryService";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getCategories: builder.query<ICategory[], TransactionType>({
      query: (transactionType) => `/api/categories/${transactionType}`,
      async onQueryStarted(id, {dispatch, queryFulfilled}) {
        const {data} = await queryFulfilled
        CategoryService.setCategories({dispatch, data})
      },
      providesTags: ['Category']
    }),
    getAllCategories: builder.query<ICategory[], void>({
      query: () => "/api/categories",
      async onQueryStarted(id, {dispatch, queryFulfilled}) {
        const {data} = await queryFulfilled
        CategoryService.setAllCategories({dispatch, data})
      }
    }),
    updateOrder: builder.mutation<void, string>({
      query: (newOrder) => ({
        url: "/api/categories/order",
        method: "PATCH",
        body: {newOrder}
      }),
      invalidatesTags: ["Category"]
    }),
    getCategory: builder.query<ICategory, string>({
      query: (id) => `/api/category/${id}`
    }),
    createCategory: builder.mutation<ICategory, CategoryCreatingBodyParams>({
      query: (formData) => ({
        url: "/api/category",
        method: "POST",
        body: formData
      }),
      invalidatesTags: ["Category"]
    }),
    editCategory: builder.mutation<ICategory, ICategory>({
      query: (formData) => ({
        url: `/api/category/${formData.id}`,
        method: "PATCH",
        body: formData
      }),
      invalidatesTags: ["Category"]
    }),
    deleteCategory: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/category/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Category"]
    })
  })
})

export const {
  useGetCategoriesQuery,
  useLazyGetCategoriesQuery,
  useUpdateOrderMutation,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useEditCategoryMutation,
  useGetCategoryQuery,
  useGetAllCategoriesQuery,
} = categoryApi
