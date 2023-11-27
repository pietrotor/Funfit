import { MonthEnum, PaymentMethodEnum, PaymentStatusEnum } from '@/models/payment.model'

class CreatePaymentGenericDto<T> {
  expectedPaymentDate: Date
  rentPrice: number
  rentTotalPaid: number
  rentBalance: number
  rentDiscount?: number | null
  rentNetPrice: number
  netTotalPaid: number
  netBalance: number
  netAmountToPay: number // neto
  month: MonthEnum
  year: number
  contractId: T
  propertyId: T
  tenantId: T
  roomId: T
  businessId: T
  rentPayments: {
    amount: number
    method: PaymentMethodEnum
    date: Date
    registerBy?: T
    observation?: string
  }[]

  extras: {
    title: string
    price: number
    discount?: number | null
    netAmountToPay: number
    totalPaid: number
    balance: number
    payments: {
      amount: number
      method: PaymentMethodEnum
      date: Date
      registerBy?: T
      observation?: string
    }[]
  }[]

  paymentStatus: PaymentStatusEnum
}

export class CreatePaymentDto extends CreatePaymentGenericDto<objectId> { }
