/* eslint-disable no-unused-vars */
import IGeneric from '@/interfaces/generic.interface'
import { Schema, Model, model, Document } from 'mongoose'

enum PaymentMethodEnum {
  QR_TRANSFER = 'QR_TRANSFER',
  CARD = 'CARD',
  CASH = 'CASH'
}

export interface ISale extends Document, IGeneric {
  id: objectId
  branchId: objectId
  products: {
    branchProductId: objectId
    productId: objectId
    price: number
    qty: number
    total: number
  }[]
  paymentMethod: PaymentMethodEnum
  subTotal: number
  total: number
  discount: number
  date: Date
  code: string
  client: string
  amountRecibed: number
  change: number
  observations: string | null
  canceled: boolean
  reason: string | null
  canceledAt: Date | null
}
export interface IModelSale extends Model<ISale> {}
const saleSchema = new Schema<ISale>(
  {
    branchId: {
      type: Schema.Types.ObjectId,
      ref: 'Branch'
    },
    products: [
      {
        _id: false,
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product'
        },
        price: {
          type: Number,
          required: [true, 'el precio es requerido']
        },
        qty: {
          type: Number,
          required: [true, 'la cantidad es requerido']
        },
        total: {
          type: Number,
          required: [true, 'el total del producto es requerido']
        }
      }
    ],
    paymentMethod: {
      type: String,
      enum: PaymentMethodEnum
    },
    subTotal: {
      type: Number,
      required: [true, 'Sub total de venta es requerido']
    },
    total: {
      type: Number,
      required: [true, 'Total de venta es requerido']
    },
    discount: {
      type: Number,
      default: 0
    },
    date: {
      type: Date,
      default: Date.now
    },
    code: {
      type: String,
      default: ''
    },
    client: {
      type: String,
      default: ''
    },
    amountRecibed: {
      type: Number,
      default: 0
    },
    change: {
      type: Number,
      default: 0
    },
    observations: {
      type: String
    },
    canceled: {
      type: Boolean,
      default: false
    },
    reason: {
      type: String
    },
    canceledAt: {
      type: Date,
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
  },
  { timestamps: true }
)

const Sale = model<ISale, IModelSale>('Sale', saleSchema, 'sale')

export default Sale
