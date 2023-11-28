import IGeneric from '../interfaces/generic.interface'
import { Document, Model, Schema, model } from 'mongoose'

export interface IUser extends Document, IGeneric {
  id: objectId
  roleId: objectId
  name: string
  lastName: string
  email: string
  password: string
  phone: string
  lastLogin: Date
}
export interface IModelUser extends Model<IUser> {}
const usersSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'nombre es obligatorio'],
    maxlength: [100, 'nombre es muy largo'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'apellido es obligatorio'],
    maxlength: [100, 'apellido es muy largo'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'email es obligatorio']
  },
  password: {
    type: String,
    required: [true, 'password es obligatorio']
  },
  phone: {
    type: String,
    required: [true, 'telefono es obligatorio']
  },
  roleId: {
    type: Schema.Types.ObjectId,
    ref: 'Role'
  },
  lastLogin: {
    type: Date,
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

const User = model<IUser, IModelUser>('User', usersSchema, 'users')

export default User
