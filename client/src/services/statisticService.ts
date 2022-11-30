import DateService from "./dateService";
import {StatisticDateType} from "../types/sliceTypes/statistic.type";

class StatisticService {
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
}

export default new StatisticService()
