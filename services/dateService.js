class DateService {
  subtractDays(date, days) {
    const copyDate = new Date(date.getTime())
    copyDate.setDate(copyDate.getDate() - days)

    return copyDate
  }

  getStartOfTheDay(date) {
    const copyDate = new Date(date.getTime())
    copyDate.setHours(0, 0, 0, 0)

    return copyDate
  }

  getEndOfTheDay(date) {
    const copyDate = new Date(date.getTime())
    copyDate.setHours(23, 59, 59, 999)

    return copyDate
  }
}

module.exports = new DateService()
