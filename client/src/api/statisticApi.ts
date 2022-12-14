import {createApi} from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./baseQueryWithReauth";
import {GetStatisticQueryParams, StatisticSection} from "../types/sliceTypes/statistic.type";
import StatisticService from "../services/statisticService";

export const statisticApi = createApi({
  reducerPath: "statisticApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getStatistic: builder.query<StatisticSection[], GetStatisticQueryParams>({
      query: ({statisticTransactionType, ...statisticDateType}) => ({
        url: statisticTransactionType ?
          `/api/statistics/${statisticTransactionType}/`
          :
          `/api/statistics/`,
        params: {...statisticDateType}
      }),
      async onQueryStarted(id, {dispatch, queryFulfilled}) {
        const {data} = await queryFulfilled
        await StatisticService.setStatisticData({dispatch, data})
      }
    })
  })
})

export const {
  useLazyGetStatisticQuery
} = statisticApi
