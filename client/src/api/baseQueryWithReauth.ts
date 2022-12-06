import {BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {setAuth, setUser} from "../store/userSlice";
import {IUser} from "../types/sliceTypes/user.type";

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
  const {dispatch} = api

  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery('/api/auth/refresh', api, extraOptions) as any

    if (refreshResult.data) {
      localStorage.setItem("token", refreshResult.data.accessToken)
      result = await baseQuery(args, api, extraOptions)
    } else {
      localStorage.removeItem("token")
      dispatch(setAuth(false))
      dispatch(setUser({} as IUser))
    }
  }

  return result
}

export default baseQueryWithReauth

