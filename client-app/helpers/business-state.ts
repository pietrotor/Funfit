// import moment from 'moment-timezone'
// import { SCHEDULE, WORKDAYS } from '@/utils/defaultBusiness'

// export default function isBusinessOpen(): boolean {
//   const zonaHorariaBolivia = 'America/La_Paz'
//   moment.tz.setDefault(zonaHorariaBolivia)
//   const today = moment()
//   const todayDay = today.day()
//   const workingDays = WORKDAYS
//   if (!workingDays.includes(todayDay)) {
//     return false
//   }
//   // Verify if the current hour is between the Day Schedule
//   const openBusinessHour = moment(SCHEDULE[todayDay].open, 'HH:mm')
//   const closeBusinessHour = moment(SCHEDULE[todayDay].close, 'HH:mm')

//   return today.isBetween(openBusinessHour, closeBusinessHour)
// }
