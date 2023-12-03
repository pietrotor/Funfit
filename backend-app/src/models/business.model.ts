import IGeneric from '../interfaces/generic.interface'
import { Document, Model, Schema, model } from 'mongoose'

export interface IBusiness extends Document, IGeneric {
  id: objectId
  name: string
  socialReason?: string
  nit?: string
  logoUrl?: string
}
export interface IModelBusiness extends Model<IBusiness> {}
const businessSchema = new Schema<IBusiness>({
  name: {
    type: String,
    required: [true, 'nombre es obligatorio'],
    trim: true
  },
  socialReason: {
    type: String,
    default: null
  },
  nit: {
    type: String,
    default: null
  },
  logoUrl: {
    type: String,
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
}, { timestamps: true })

const Business = model<IBusiness, IModelBusiness>('Business', businessSchema, 'businesses')

export default Business
