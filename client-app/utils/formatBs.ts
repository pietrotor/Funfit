/**
 * Formats a number as Bolivian bolivianos: "Bs 1.234,50"
 */
export const formatBs = (value: number | string | null | undefined): string => {
  const num =
    typeof value === 'number' ? value : typeof value === 'string' ? Number(value.replace(',', '.')) : NaN

  if (!Number.isFinite(num)) return 'Bs 0,00'

  const formatted = new Intl.NumberFormat('es-BO', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(num)

  return `Bs ${formatted}`
}
