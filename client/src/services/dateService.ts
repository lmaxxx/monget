class DateService {
  subtractDays(date: Date, days: number) {
    const copyDate = new Date(date.getTime())
    copyDate.setUTCDate(copyDate.getUTCDate() - days + 1)

    return copyDate
  }

  addDays(date: Date, days: number) {
    const copyDate = new Date(date.getTime())
    copyDate.setUTCDate(copyDate.getUTCDate() + days - 1)

    return copyDate
  }

  getStartOfTheDay(date: Date) {
    const copyDate = new Date(date.getTime())
    copyDate.setUTCHours(0, 0, 0, 0)

    return copyDate
  }

  getEndOfTheDay(date: Date) {
    const copyDate = new Date(date.getTime())
    copyDate.setUTCHours(23, 59, 59, 999)

    return copyDate
  }

  subtractMonths(date: Date, months: number) {
    const copyDate = new Date(date.getTime())
    copyDate.setUTCMonth(copyDate.getUTCMonth() - months + 1)

    return copyDate
  }

  subtractYears(date: Date, years: number) {
    const copyDate = new Date(date.getTime())
    copyDate.setUTCFullYear(copyDate.getUTCFullYear() - years + 1)

    return copyDate
  }
}

export default new DateService()
