export const addDays = (date: Date, days: number) => {
  date.setDate(date.getDate() + days)
  date.setHours(23, 59, 59, 999)
  return date
}
