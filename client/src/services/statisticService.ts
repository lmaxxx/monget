import DateService from "./dateService";
import {
  BarChartKey,
  StatisticDateType,
  StatisticSection,
  StatisticTransactionType
} from "../types/sliceTypes/statistic.type";
import {AnyAction, ThunkDispatch} from "@reduxjs/toolkit";
import {setData} from "../store/statisticSlice";

class StatisticService {
  setStatisticData({dispatch, data}: {
    dispatch: ThunkDispatch<any, any, AnyAction>,
    data: any,
  }) {
      dispatch(setData(data))
  }

  getDateLabelText(statisticDateType: StatisticDateType, dateCounter: number) {
    const currentDate = new Date()
    const stringWeekDateOptions: Intl.DateTimeFormatOptions = {year: 'numeric', month: 'short', day: 'numeric' };

    if(statisticDateType === StatisticDateType.PerYear) {
      const year = DateService.subtractYears(currentDate, dateCounter)

      return `${year.getUTCFullYear()}`
    }

    if(statisticDateType === StatisticDateType.PerMonth) {
      const monthStartDay = DateService.subtractMonths(currentDate, dateCounter)
      const monthName = monthStartDay.toLocaleDateString("en-US", {month: 'short'})

      return `${monthName}, ${monthStartDay.getUTCFullYear()}`
    }

    if(statisticDateType === StatisticDateType.PerWeek) {
      const weekStartDay = DateService.subtractDays(currentDate, dateCounter * 7)
      const start = DateService.getStartOfTheDay(weekStartDay).toLocaleDateString("en-US", stringWeekDateOptions)
      const end = DateService.addDays(weekStartDay, 7).toLocaleDateString("en-US", stringWeekDateOptions)

      return `${start} - ${end}`
    }
  }

  getBarChartKeys(statisticTransactionType: StatisticTransactionType) {
    const keys = {
      [StatisticTransactionType.General]: ['expenses', 'income', 'profit', 'loss'],
      [StatisticTransactionType.Income]: ['income'],
      [StatisticTransactionType.Expenses]: ['expenses']
    }

    return keys[statisticTransactionType]
  }

  getBarChartColor(key: BarChartKey) {
    const colors = {
      income: "#38d9a9",
      expenses: "#ffa94d",
      profit: "#74c0fc",
      loss: "#ff6b6b"
    }

    return colors[key]
  }
}

export default new StatisticService()
