import IGeneric from '@/interfaces/generic.interface'
import { Model, Schema, Document, model } from 'mongoose'

export interface IBranch extends Document, IGeneric {
  id: objectId;
  name: string;
  code: string;
  city: string;
  direction: string;
  phone?: string;
  nit?: string;
  cashId: objectId;
  productsIds: objectId[];
}
export interface IModelBranch extends Model<IBranch> { }

const branchSchema = new Schema<IBranch>(
  {
    name: {
      type: String,
      required: [true, 'El nombres es obligatorio'],
      maxlength: [100, 'nombre es muy largo'],
      trim: true
    },
    code: {
      type: String,
      required: [true, 'El código es obligatorio']
    },
    city: {
      type: String,
      default: 'Cochabamba'
    },
    direction: {
      type: String,
      required: [true, 'La dirección es obligatorio'],
      trim: true
    },
    phone: {
      type: String
    },
    nit: {
      type: String
    },
    cashId: {
      type: Schema.Types.ObjectId,
      ref: 'Cash'
    },
    productsIds: [
      {
        type: Schema.Types.ObjectId,
        default: [],
        ref: 'Product'
      }
    ],
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

export const Branch = model<IBranch, IModelBranch>('Branch', branchSchema, 'branch')
