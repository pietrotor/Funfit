import IGeneric from '../interfaces/generic.interface'
import { Document, Model, Schema, model } from 'mongoose'

export interface IProperty extends Document, IGeneric {
  id: objectId
  name: string
  code: string
  direction: string
  socialReason: string
  nit: string
  businessId: objectId
  phone: string
  inChargePerson?: objectId
  roomsIds: objectId[]
  configuration: {
    delayAccepted?: number
    roomItems: string[]
    bathroomItems: string[]
  }
  roomTypes: string[]
  inventory: {
    title: string
    date: Date
    items: {
      name: string
      verification: boolean
      observation: string
    }[]
    registerBy: objectId
  }[]
  extras: {
    title: string
    price: number
  }[]
}
export interface IModelProperty extends Model<IProperty> {}
const propertySchema = new Schema<IProperty>({
  name: { type: String, trim: true },
  code: { type: String },
  direction: { type: String },
  socialReason: { type: String },
  nit: { type: String },
  phone: { type: String },
  inChargePerson: {
    type: Schema.Types.ObjectId,
    ref: 'Staff'
  },
  roomsIds: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Room'
    }],
    default: []
  },
  businessId: {
    type: Schema.Types.ObjectId,
    ref: 'Business'
  },
  configuration: {
    _id: false,
    delayAccepted: { type: Number, default: 4 },
    roomItems: {
      type: [String],
      default: []
    },
    bathroomItems: {
      type: [String],
      default: []
    }
  },
  roomTypes: {
    type: [String],
    default: []
  },
  inventory: [{
    _id: false,
    title: { type: String },
    date: {
      type: Date,
      default: Date.now()
    },
    items: [{
      name: { type: String },
      verification: { type: Boolean, default: false },
      observation: { type: String }
    }],
    registerBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  extras: {
    type: [{
      _id: false,
      title: { type: String },
      price: { type: Number }
    }],
    default: []
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

const Property = model<IProperty, IModelProperty>('Property', propertySchema, 'properties')

export default Property
