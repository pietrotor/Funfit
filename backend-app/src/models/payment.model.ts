/* eslint-disable no-unused-vars */
import { Document, model, Model, Schema } from 'mongoose'
import IGeneric from '../interfaces/generic.interface'

export enum PaymentMethodEnum {
  CASH = 'CASH',
  QR = 'QR',
  TRANSFER = 'TRANSFER'
}
export enum PaymentStatusEnum {
  FUTURE_PAYMENT = 'FUTURE_PAYMENT',
  CLOSE_PAYMENT = 'CLOSE_PAYMENT',
  ON_DATE = 'ON_DATE',
  UNPAID = 'UNPAID',
  IN_REVIEW = 'IN_REVIEW',
  WITH_BALANCE = 'WITH_BALANCE',
  COMPLETED = 'COMPLETED'
}
export enum MonthEnum {
  ENERO = 'ENERO',
  FEBRERO = 'FEBRERO',
  MARZO = 'MARZO',
  ABRIL = 'ABRIL',
  MAYO = 'MAYO',
  JUNIO = 'JUNIO',
  JULIO = 'JULIO',
  AGOSTO = 'AGOSTO',
  SEPTIEMBRE = 'SEPTIEMBRE',
  OCTUBRE = 'OCTUBRE',
  NOVIEMBRE = 'NOVIEMBRE',
  DICIEMBRE = 'DICIEMBRE',
}

export interface IPayment extends Document, IGeneric {
  id: objectId
  expectedPaymentDate: Date
  rentPrice: number
  rentDiscount?: number
  rentNetPrice: number
  rentTotalPaid: number
  rentBalance: number
  netTotalPaid: number
  netBalance: number
  netAmountToPay: number
  month: MonthEnum
  year: number
  contractId: objectId
  propertyId: objectId
  tenantId: objectId
  roomId: objectId
  businessId: objectId
  rentPayments: {
    initialBalance: number
    amount: number
    balance: number
    totalPaid: number
    method: PaymentMethodEnum
    date: Date
    registerBy?: objectId
    observation?: string | null
  }[]
  extras: {
    title: string
    price: number
    discount?: number
    netAmountToPay: number
    totalPaid: number
    balance: number
    payments: {
      initialBalance: number
      amount: number
      balance: number
      totalPaid: number
      method: PaymentMethodEnum
      date: Date
      registerBy?: objectId
      observation?: string | null
    }[]
  }[]
  paymentStatus: PaymentStatusEnum
  observation?: string
  reviewBy?: objectId
}
export interface IModelPayment extends Model<IPayment> {}

const paymentSchema = new Schema<IPayment>({
  expectedPaymentDate: { type: Date, required: true },
  rentPrice: { type: Number, required: true },
  rentTotalPaid: { type: Number, required: true },
  rentBalance: { type: Number, required: true },
  rentDiscount: { type: Number, required: true },
  rentNetPrice: { type: Number, required: true },
  netTotalPaid: { type: Number, required: true, default: 0 },
  netBalance: { type: Number, required: true },
  netAmountToPay: { type: Number, required: true },
  month: { type: String, required: true, enum: MonthEnum },
  year: { type: Number, required: true },
  contractId: {
    type: Schema.Types.ObjectId,
    ref: 'Contract'
  },
  propertyId: {
    type: Schema.Types.ObjectId,
    ref: 'Property'
  },
  tenantId: {
    type: Schema.Types.ObjectId,
    ref: 'Tenant'
  },
  roomId: {
    type: Schema.Types.ObjectId,
    ref: 'Room'
  },
  businessId: {
    type: Schema.Types.ObjectId,
    ref: 'Business'
  },
  rentPayments: {
    type: [{
      _id: false,
      initialBalance: { type: Number, required: true },
      amount: { type: Number, required: true },
      balance: { type: Number, required: true },
      totalPaid: { type: Number, required: true },
      method: { type: String, enum: PaymentMethodEnum },
      date: { type: Date, required: true },
      registerBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      observation: { type: String, default: null }
    }],
    default: []
  },
  extras: {
    type: [{
      _id: false,
      title: String,
      price: { type: Number, required: true },
      discount: { type: Number, default: null },
      netAmountToPay: { type: Number, required: true },
      totalPaid: { type: Number, required: true },
      balance: { type: Number, required: true },
      payments: {
        type: [{
          _id: false,
          initialBalance: { type: Number, required: true },
          amount: { type: Number, required: true },
          balance: { type: Number, required: true },
          totalPaid: { type: Number, required: true },
          method: { type: String, enum: PaymentMethodEnum },
          date: { type: Date, required: true },
          registerBy: {
            type: Schema.Types.ObjectId,
            ref: 'User'
          },
          observation: { type: String, default: null }
        }],
        default: []
      }
    }]
  },
  paymentStatus: {
    type: String,
    enum: PaymentStatusEnum,
    requried: true
  },
  observation: { type: String, defualt: null },
  reviewBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  // Generic Types
  status: { type: Boolean, default: true },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  deleted: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null },
  deletedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true })

const Payment = model<IPayment, IModelPayment>('Payment', paymentSchema, 'payments')

export { Payment }
