import {createApi} from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./baseQueryWithReauth";
import {ICategory, TransactionType} from "../types/sliceTypes/category.type";
import CategoryService from "../services/categoryService";
import {CategoryCreatingFormValues} from "../types/form.type";

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
    createCategory: builder.mutation<ICategory, CategoryCreatingFormValues>({
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
  useUpdateOrderMutation,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useEditCategoryMutation,
  useGetCategoryQuery,
} = categoryApi
