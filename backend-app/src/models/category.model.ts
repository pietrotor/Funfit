import IGeneric from '@/interfaces/generic.interface'
import { Document, Model, Schema, model, models } from 'mongoose'

export interface ICategory extends Document, IGeneric {
  id: objectId
  name: string
  code: string
}
export interface IModelCategory extends Model<ICategory> {}

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String
    },
    code: {
      type: String
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

export const Category = (models.Category as IModelCategory) || model<ICategory, IModelCategory>(
  'Category',
  categorySchema,
  'category'
)
