import IGeneric from '@/interfaces/generic.interface'
import { Document, Model, Schema, model, models } from 'mongoose'

export interface IBill extends Document, IGeneric {
  id: objectId
  title: string
  date: Date
  amount: number
  detail: string | null
}
export interface IModelBill extends Model<IBill> {}

const billSchema = new Schema<IBill>(
  {
    title: {
      type: String
    },
    detail: {
      type: String
    },
    amount: {
      type: Number
    },
    date: {
      type: Date
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

export const Bill = (models.Bill as IModelBill) || model<IBill, IModelBill>(
  'Bill',
  billSchema,
  'bill'
)
