import IGeneric from '@/interfaces/generic.interface'
import { Document, Model, Schema, model } from 'mongoose'

export interface ICash extends Document, IGeneric {
  id: objectId;
  branchId: objectId;
  amount: number;
  currentTurnId: objectId;
  isOpen: boolean;
}
export interface IModelCash extends Model<ICash> { }

const cashSchema = new Schema<ICash>(
  {
    branchId: {
      type: Schema.Types.ObjectId,
      ref: 'Branch'
    },
    amount: {
      type: Number
    },
    currentTurnId: {
      type: Schema.Types.ObjectId,
      ref: 'Turn'
    },
    isOpen: { type: Boolean, default: false },
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

export const Cash = model<ICash, IModelCash>('Cash', cashSchema, 'cash')
