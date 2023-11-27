import { Document, model, Model, Schema } from 'mongoose'
import IGeneric from '../interfaces/generic.interface'

export interface IRoom extends Document, IGeneric {
  id: objectId
  name: string
  code: string
  description?: string
  image?: string
  propertyId: objectId
  bathroomsIds: objectId[]
  ligthMetersIds: objectId[]
  businessId: objectId
  activeContractId: objectId | null
  roomType: string
  extras: {
    title: string
    price: number
  }[]
  referencePrice: number
  isAvailable: boolean
}
export interface IModelRoom extends Model<IRoom> {}

const roomSchema = new Schema<IRoom>({
  name: { type: String, required: true },
  code: { type: String, required: true },
  description: { type: String, default: null },
  image: { type: String, default: null },
  propertyId: {
    type: Schema.Types.ObjectId,
    ref: 'Property'
  },
  bathroomsIds: [{
    type: Schema.Types.ObjectId
  }],
  ligthMetersIds: [{
    type: Schema.Types.ObjectId
  }],
  businessId: {
    type: Schema.Types.ObjectId,
    ref: 'Business'
  },
  activeContractId: {
    type: Schema.Types.ObjectId,
    ref: 'Contract',
    default: null
  },
  roomType: { type: String },
  extras: {
    type: [{
      _id: false,
      title: { type: String },
      price: { type: Number }
    }],
    default: []
  },
  referencePrice: { type: Number },
  isAvailable: { type: Boolean, default: true },
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

const Room = model<IRoom, IModelRoom>('Room', roomSchema, 'rooms')

export { Room }
