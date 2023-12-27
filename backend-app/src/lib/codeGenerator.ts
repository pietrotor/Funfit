function padTo2Digits(num: number) {
  return num.toString().padStart(2, '0')
}

function formatDate(date: Date) {
  // Establece la zona horaria de Bolivia
  date.setTime(date.getTime() + (-300 * 60 * 1000))

  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear()
  ].join('-')
}

function formatTicket(number: number) {
  if (number < 10) return `00${number}`
  if (number < 100) return `0${number}`
  return `${number}`
}

export const codeSaleGenerator = (branchCode: string, saleNumber: number) => {
  const dateCode = formatDate(new Date())
  return `${branchCode}-${dateCode}-${formatTicket(saleNumber)}`
}

export function internalCodeGenerator(name: string): string {
  return name.replace(/\s+/g, '').replace(/\//g, '-').toLowerCase()
}
