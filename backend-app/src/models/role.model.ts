import { Document, model, Model, Schema } from 'mongoose'
import IGeneric from '../interfaces/generic.interface'

export interface IRole extends Document, IGeneric {
  id: objectId
  name: string
  code: string
}
export interface IModelRole extends Model<IRole> {}

const roleSchema = new Schema<IRole>({
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

const Role = model<IRole, IModelRole>('Role', roleSchema, 'role')

export { Role }
