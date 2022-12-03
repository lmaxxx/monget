import {BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery} from "@reduxjs/toolkit/query";

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {

  const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`)
      return headers
    }
  })

  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery('/api/auth/refresh', api, extraOptions) as any

    if (refreshResult.data) {
      localStorage.setItem("token", refreshResult.data.accessToken)
      result = await baseQuery(args, api, extraOptions)
    } else {
      localStorage.removeItem("token")
    }
  }

  return result
}

export default baseQueryWithReauth

