import IGeneric from '../interfaces/generic.interface'
import { Document, Model, Schema, model } from 'mongoose'

interface ICustomer extends Document, IGeneric {
  id: objectId
  name: string
  lastName: string
  email?: string | null
  phone: string
  lastOrderDate: Date
  addresses: {
    latitude: number
    longitude: number
    detail: string
  }[]
  orders: objectId[]
}

interface IModelCustomer extends Model<ICustomer> {}

const customerSchema = new Schema<ICustomer>(
  {
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
      type: String
    },
    phone: {
      type: String,
      required: [true, 'telefono es obligatorio']
    },
    lastOrderDate: {
      type: Date,
      default: null
    },
    addresses: [
      {
        _id: false,
        latitude: {
          type: Number,
          required: true
        },
        longitude: {
          type: Number,
          required: true
        },
        detail: {
          type: Number,
          required: true
        }
      }
    ],
    orders: [
      {
        type: Schema.Types.ObjectId,
        default: [],
        ref: 'Order'
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

const Customer = model<ICustomer, IModelCustomer>(
  'Customer',
  customerSchema,
  'customer'
)

export { Customer, IModelCustomer, ICustomer }
