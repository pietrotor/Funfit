
export const getTimeZoneDate = (date: Date) => {
  if (!date) return ''
  const dateTimeDifference = new Date().getTimezoneOffset() * 80000
  const dateTime = new Date(date).getTime()
  const finalDate = new Date(dateTime + dateTimeDifference)
  return finalDate
}
export const addDays = (date: Date, days: number) => {
  date.setDate(date.getDate() + days)
  date.setHours(23, 59, 59, 999)
  return date
}
// import moment from 'moment'

// class DateHandler {
//   static readonly utc = 14400000;
//   static getDateWithTimeZone (dateToConvert: Date = new Date()) {
//     return new Date(new Date(dateToConvert).getTime() - this.utc)
//   }

//   static getOnlyDate (dateToConvert: Date) {
//     return new Date(moment(dateToConvert).format('YYYY-MM-DD'))
//   }

//   static isDateEqualOrHigherThanToday (dateToCheck: Date) {
//     const dateValue = dateToCheck.getTime()
//     const nowDate = new Date(moment(this.getDateWithTimeZone()).format('L')).getTime()
//     console.log(this.getDateWithTimeZone())
//     return dateValue >= nowDate
//   }

//   static checkIfSameDate (dateToCheck:string) {
//     const serverTime = new Date(new Date().getTime() - this.utc)
//     // let serverTime = new Date(new Date().getTime() - this.utc);

//     const serverYear = serverTime.getFullYear()
//     const serverMonth = serverTime.getMonth()
//     const serverDay = serverTime.getDate()
//     console.log(serverTime)
//     const clientTime = new Date(dateToCheck)

//     const clientYear = clientTime.getFullYear()
//     const clientMonth = clientTime.getMonth()
//     const clientDay = clientTime.getDate()
//     console.log(clientTime)
//     if (serverYear === clientYear && serverMonth === clientMonth && serverDay === clientDay) {
//       return true
//     } else {
//       return false
//     }
//   };

//   static isDateHigher (lowerDate:string | Date, higherDate:string | Date) {
//     const lower = new Date(lowerDate)
//     const higher = new Date(higherDate)
//     if (lower.getTime() > higher.getTime()) {
//       return false
//     } else {
//       return true
//     }
//   }
// }

// export default DateHandler
