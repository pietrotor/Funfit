import moment from 'moment-timezone'

export const WORKDAYS = [1, 2, 3, 4, 5, 6] // Domingo = 0
export const DAYS_OF_WEEK = [
  'Lunes',
  'Martes',
  'Miercoles',
  'Jueves',
  'Viernes',
  'Sabado',
  'Domingo'
] // Domingo = 0
export const SCHEDULE = [
  [],
  [
    { open: '09:00', close: '12:30' },
    { open: '16:00', close: '20:00' }
  ],
  [
    { open: '09:00', close: '12:30' },
    { open: '16:00', close: '20:00' }
  ],
  [
    { open: '09:00', close: '12:30' },
    { open: '16:00', close: '20:00' }
  ],
  [
    { open: '09:00', close: '12:30' },
    { open: '16:00', close: '20:00' }
  ],
  [
    { open: '09:00', close: '12:30' },
    { open: '16:00', close: '20:00' }
  ],
  [{ open: '09:00', close: '12:30' }]
]

export default function isBusinessOpen(): boolean {
  const zonaHorariaBolivia = 'America/La_Paz'
  moment.tz.setDefault(zonaHorariaBolivia)
  const today = moment()
  const todayDay = today.day()
  if (!WORKDAYS.includes(todayDay)) {
    return false
  }

  return SCHEDULE[todayDay].some(schedule => {
    const openBusinessHour = moment(schedule.open, 'HH:mm')
    const closeBusinessHour = moment(schedule.close, 'HH:mm')

    return today.isBetween(openBusinessHour, closeBusinessHour)
  })
}
