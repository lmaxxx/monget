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

  setFirstDay(date) {
    date.setUTCDate(1)
  }
}

module.exports = new DateService()
