/* eslint-disable no-unused-vars */
import { Document, model, Model, Schema } from 'mongoose'
import IGeneric from '../interfaces/generic.interface'

export enum BillingDateEnum {
  ANTICIPATED = 'ANTICIPATED',
  COMPLETED = 'COMPLETED',
}
export enum RegisterStatusEnum {
  CURRENT = 'CURRENT',
  EXPIRED = 'EXPIRED',
  CANCELLED = 'CANCELLED',
}
export enum GuaranteeStatusEnum {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
}
export enum PaymentMethodEnum {
  CASH = 'CASH',
  QR = 'QR',
  TRANSFER = 'TRANSFER'
}
export interface IContract extends Document, IGeneric {
  id: objectId
  code: string
  signedAt: Date
  admissionDate: Date
  departureDate: Date
  propertyId: objectId
  tenantId: objectId
  roomId: objectId
  businessId: objectId
  price: number
  extras: {
    title: string
    amount: number
  }[]
  guarantee?: {
    isPaid: boolean
    isRefunded: boolean
    expectedDateOfPayment?: Date
    status: GuaranteeStatusEnum
    observation?: string | null
    amountToPay: number
    balance: number
    totalPaid: number
    payments: {
      amount: number
      date: Date
      paymentMethod: PaymentMethodEnum
      observation: string
    }[]
  }
  registerStatus: RegisterStatusEnum
  payDay: number
  contracts: {
    title: string
    url: string
    date: Date
  }[]
  inventory: {
    title: string
    date: Date
    items: {
      name: string
      verification: boolean
      observation?: string | null
    }[]
    registerBy?: objectId | null
  }[]
  billingDate: BillingDateEnum
  observations: string[]
}
export interface IModelContract extends Model<IContract> {}

const contractSchema = new Schema<IContract>({
  code: { type: String, required: [true, 'El código es obligatorio'] },
  signedAt: { type: Date, default: Date.now() },
  admissionDate: { type: Date },
  departureDate: { type: Date },
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
  price: { type: Number },
  extras: {
    type: [{
      _id: false,
      title: String,
      amount: Number
    }],
    default: []
  },
  guarantee: {
    _id: false,
    isPaid: { type: Boolean },
    isRefunded: { type: Boolean },
    expectedDateOfPayment: { type: Date, default: null },
    status: { type: String, enum: GuaranteeStatusEnum },
    observation: { type: String },
    amountToPay: { type: Number },
    balance: { type: Number },
    totalPaid: { type: Number },
    payments: {
      type: [{
        _id: false,
        amount: { type: Number },
        date: { type: Date },
        paymentMethod: { type: String, Enum: PaymentMethodEnum },
        observation: { type: String }
      }],
      default: []
    }
  },
  registerStatus: { type: String, enum: RegisterStatusEnum },
  payDay: { type: Number },
  contracts: {
    type: [{
      title: { type: String },
      url: { type: String },
      date: { type: Date, default: Date.now() }
    }],
    default: []
  },
  billingDate: {
    type: String,
    required: true,
    enum: BillingDateEnum
  },
  inventory: {
    type: [{
      title: { type: String },
      date: { type: Date, default: Date.now() },
      items: {
        type: [{
          _id: false,
          name: String,
          verification: Boolean,
          observation: String
        }]
      },
      registerBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null
      }
    }],
    default: []
  },
  observations: {
    type: [String],
    default: []
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

const Contract = model<IContract, IModelContract>('Contract', contractSchema, 'contracts')

export { Contract }
