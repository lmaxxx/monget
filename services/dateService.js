class DateService {
  subtractDays(date, days) {
    const copyDate = new Date(date.getTime())
    copyDate.setUTCDate(copyDate.getUTCDate() - days + 1)

    return copyDate
  }

  addDays(date, days) {
    const copyDate = new Date(date.getTime())
    copyDate.setUTCDate(copyDate.getUTCDate() + days - 1)

    return copyDate
  }

  getStartOfTheDay(date) {
    const copyDate = new Date(date.getTime())
    copyDate.setUTCHours(0, 0, 0, 0)

    return copyDate
  }

  getEndOfTheDay(date) {
    const copyDate = new Date(date.getTime())
    copyDate.setUTCHours(23, 59, 59, 999)

    return copyDate
  }

  substractMonths(date, months) {
    const copyDate = new Date(date.getTime())
    copyDate.setUTCMonth(copyDate.getUTCMonth() - months + 1)

    return copyDate
  }

  getStartOfTheYear(date, years) {
    const copyDate = new Date(date.getTime())

    copyDate.setUTCFullYear(copyDate.getUTCFullYear() - years + 1)
    copyDate.setUTCMonth(0, 1)
    copyDate.setUTCHours(0, 0, 0, 0)

    return copyDate
  }

  getEndOfTheYear(date, years) {
    return new Date(Date.UTC(date.getUTCFullYear() - years + 1, 11, 31, 23, 59, 59 ,999))
  }

  getStartOfTheMonthByIndex(date, index) {
    const copyDate = new Date(date.getTime())
    copyDate.setUTCMonth(index)

    return copyDate
  }

  getEndOfTheMonthByIndex(date, months) {
    return new Date(date.getUTCFullYear(), months + 1, 0, 23, 59, 59, 999)
  }
}

module.exports = new DateService()
