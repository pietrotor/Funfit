import IGeneric from '@/interfaces/generic.interface'
import { Document, Model, Schema, model, models } from 'mongoose'

export interface IPayment extends Document, IGeneric {
  id: objectId
  amount: number
  balance: number
  totalPaid: number
  date: Date
  observation: string | null
  distributorId: objectId
  distributorSaleId: objectId
}
export interface IModelPayment extends Model<IPayment> {}

const paymentsSchema = new Schema<IPayment>(
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
      type: String,
      default: null
    },
    distributorId: {
      type: Schema.Types.ObjectId,
      ref: 'Distributor'
    },
    distributorSaleId: {
      type: Schema.Types.ObjectId,
      ref: 'DistributorSale'
    },
    balance: {
      type: Number
    },
    totalPaid: {
      type: Number
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

export const Payment = (models.Payment as IModelPayment) || model<IPayment, IModelPayment>(
  'Payment',
  paymentsSchema,
  'payment'
)
