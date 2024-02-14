/* eslint-disable no-unused-vars */
import IGeneric from '@/interfaces/generic.interface'
import { Schema, Model, model, Document } from 'mongoose'
import { PaymentMethodEnum } from './sales.model'

enum DeliveryMethodEnum {
  DELIVERY = 'DELIVERY',
  PICKUP = 'PICKUP'
}

interface IOrder extends Document, IGeneric {
  id: objectId
  branchId: objectId
  products: {
    branchProductId: objectId
    productId: objectId
    price: number
    qty: number
    total: number
  }[]
  deliveryMethod: DeliveryMethodEnum
  paymentMethod: PaymentMethodEnum
  subTotal: number
  total: number
  discount: number
  date: Date
  code: string
  customerId: objectId
  addressId?: objectId | null
  pickUpInformation?: string | null
  orderDetails: string | null
  orderAcepted: boolean
  orderAceptedAt: Date | null
  orderAceptedBy: objectId | null
  isSold: boolean | null
  saleId: objectId | null
  // Cancel fields
  reason: string | null
  rejected: boolean
  rejectedAt: Date | null
  rejectedBy: objectId | null
}

interface IModelOrder extends Model<IOrder> { }

const orderSchema = new Schema<IOrder>(
  {
    branchId: {
      type: Schema.Types.ObjectId,
      ref: 'Branch'
    },
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
    deliveryMethod: {
      type: String,
      enum: DeliveryMethodEnum
    },
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
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'Customer'
    },
    orderDetails: {
      type: String
    },
    orderAcepted: {
      type: Boolean,
      default: false
    },
    orderAceptedAt: {
      type: Date,
      default: null
    },
    orderAceptedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    rejected: {
      type: Boolean,
      default: false
    },
    reason: {
      type: String
    },
    rejectedAt: {
      type: Date,
      default: null
    },
    rejectedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    isSold: {
      type: Boolean,
      default: false
    },
    saleId: {
      type: Schema.Types.ObjectId,
      ref: 'Sale'
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

const Order = model<IOrder, IModelOrder>('Order', orderSchema, 'order')

export { Order, IOrder, IModelOrder }
