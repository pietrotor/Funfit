export function getCurrentDate(): string {
  const fecha = new Date()
  const year = fecha.getFullYear()
  const month = ('0' + (fecha.getMonth() + 1)).slice(-2)
  const day = ('0' + fecha.getDate()).slice(-2)
  return `${year}-${month}-${day}`
}
