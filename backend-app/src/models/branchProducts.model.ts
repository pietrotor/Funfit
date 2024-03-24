import IGeneric from '@/interfaces/generic.interface'
import { Document, Model, Schema, model } from 'mongoose'

export interface IBranchProduct extends Document, IGeneric {
  id: objectId
  branchId: objectId
  productId: objectId
  stock: number
  lastStockEntry: number
  price: number
  isVisibleOnWeb: boolean
  isVisibleOnMenu: boolean
}
export interface IModelBranchProduct extends Model<IBranchProduct> {}

const branchProductSchema = new Schema<IBranchProduct>(
  {
    branchId: {
      type: Schema.Types.ObjectId,
      ref: 'Branch'
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    },
    stock: {
      type: Number,
      required: true,
      default: 0
    },
    lastStockEntry: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      required: true
    },
    isVisibleOnWeb: { type: Boolean, default: true },
    isVisibleOnMenu: { type: Boolean, default: true },
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

export const BranchProduct = model<IBranchProduct, IModelBranchProduct>(
  'BranchProduct',
  branchProductSchema,
  'branchProduct'
)
