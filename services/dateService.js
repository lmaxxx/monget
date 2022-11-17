class DateService {
  subtractDays(date, days) {
    const copyDate = new Date(date.getTime())
    copyDate.setUTCDate(copyDate.getUTCDate() - days)

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
}

module.exports = new DateService()
