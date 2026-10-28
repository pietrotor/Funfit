import Decimal from 'decimal.js'

export const CARD_FEE_RATE = 0.02
export const VENDIS_FEE_RATE = 0.02

export const PAYMENT_FEE_RATES: Record<string, number> = {
  card: CARD_FEE_RATE,
  vendis: VENDIS_FEE_RATE
}

export const getPaymentFee = (total: number, method: string) =>
  new Decimal(total)
    .mul(PAYMENT_FEE_RATES[method] ?? 0)
    .toDecimalPlaces(2)
    .toNumber()

export const getTotalAfterFee = (total: number, method: string) =>
  new Decimal(total).minus(getPaymentFee(total, method)).toNumber()

export const formatFeeRate = (rate: number) =>
  `${new Decimal(rate).mul(100).toNumber()}%`

export const hasPaymentFee = (method: string) =>
  Object.prototype.hasOwnProperty.call(PAYMENT_FEE_RATES, method)
