import IGeneric from '@/interfaces/generic.interface'
import { Document, Model, Schema, model } from 'mongoose'

export interface IPayments extends Document, IGeneric {
  id: objectId
  amount: number
  date: Date
  observation: string | null
  customerId: objectId
  saleDistributorId: objectId
}
export interface IModelPayments extends Model<IPayments> {}

const paymentsSchema = new Schema<IPayments>(
  {
    amount: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    observation: {
      type: Number,
      default: null
    },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'Customer'
    },
    saleDistributorId: {
      type: Schema.Types.ObjectId,
      ref: 'SaleDistributor'
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

export const Payments = model<IPayments, IModelPayments>(
  'Payments',
  paymentsSchema,
  'payments'
)
