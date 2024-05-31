/* eslint-disable no-unused-vars */
import IGeneric from '@/interfaces/generic.interface'
import { Schema, Model, model, Document } from 'mongoose'

export enum DistributorSalePaymentMethod {
  CREDIT = 'CREDIT',
  MIXED = 'MIXED',
  CASH = 'CASH'
}

export interface IDistributorSale extends Document, IGeneric {
  id: objectId
  products: {
    productId: objectId
    price: number
    qty: number
    total: number
  }[]
  priceListId: objectId
  warehouseId: objectId
  paymentMethod: DistributorSalePaymentMethod
  subTotal: number
  total: number
  discount: number
  balance: number
  totalPaid: number
  date: Date
  code: string
  customerId: objectId
  observations: string | null
  canceled: boolean
  reason: string | null
  canceledAt: Date | null
  canceledBy?: objectId | null
}
export interface IModelDistributorSale extends Model<IDistributorSale> {}
const distributorSaleSchema = new Schema<IDistributorSale>(
  {
    products: [
      {
        _id: false,
        branchProductId: {
          type: Schema.Types.ObjectId,
          ref: 'BranchProduct'
        },
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
    priceListId: {
      type: Schema.Types.ObjectId,
      ref: 'PriceList'
    },
    warehouseId: {
      type: Schema.Types.ObjectId,
      ref: 'Warehouse'
    },
    paymentMethod: {
      type: String,
      enum: DistributorSalePaymentMethod
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
    balance: {
      type: Number,
      required: true
    },
    totalPaid: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    code: {
      type: String,
      default: ''
    },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'Customer'
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
    canceledBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
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

export const DistributorSale = model<IDistributorSale, IModelDistributorSale>(
  'DistributorSale',
  distributorSaleSchema,
  'distributorSale'
)

distributorSaleSchema.index({ createdAt: 1 })
