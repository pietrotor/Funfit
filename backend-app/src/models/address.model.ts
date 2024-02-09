import IGeneric from '../interfaces/generic.interface'
import { Document, Model, Schema, model } from 'mongoose'

interface IAddress extends Document, IGeneric {
  id: objectId
  latitude: number
  longitude: number
  detail: string
  customerId: objectId
}

interface IModelAddress extends Model<IAddress> {}

const addressSchema = new Schema<IAddress>(
  {
    latitude: {
      type: Number
    },
    longitude: {
      type: Number
    },
    detail: {
      type: String
    },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'Customer'
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

const Address = model<IAddress, IModelAddress>(
  'Address',
  addressSchema,
  'address'
)

export { Address, IModelAddress, IAddress }
