import CustomDateRange from '../interfaces/CustomDateRange'
import FiniteDateRange from '../interfaces/FiniteDateRange'

const calculateDefaultPaidDays = (dateRange: CustomDateRange) => {
  if (dateRange?.endDate) {
    return dateRange as FiniteDateRange
  }

  const date = dateRange.startDate
  const lastDayOfMonth = (year: number, month: number) => new Date(year, month + 1, 0)
  const lastDayOfNextMonth = lastDayOfMonth(date.getFullYear(), date.getMonth() + 1)

  if (
    lastDayOfMonth(date.getFullYear(), date.getMonth()).getDate() === date.getDate() ||
    date.getDate() > lastDayOfNextMonth.getDate()
  ) return { startDate: dateRange.startDate, endDate: lastDayOfNextMonth }
  else {
    const endDate = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate())
    return { startDate: dateRange.startDate, endDate }
  }
}

export default calculateDefaultPaidDays
