import { Document, model, Model, Schema } from 'mongoose'
import IGeneric from '../interfaces/generic.interface'

export interface ITenant extends Document, IGeneric {
  id: objectId
  name: string
  lastName: string
  code: string
  identification: string
  email?: string
  profession?: string
  socialReason?: string
  nit?: string
  businessId: objectId
  phones: {
    name: string
    phone: string
    observation?: string
    principal: boolean
  }[]
  directions: {
    name: string
    direction: string
    latitude: string
    longitude: string
    observation?: string
    principal: boolean
  }[]
  business?: {
    name: string
    phone?: string
    nit?: string
    centralDirection?: string
  }
  references: {
    name: string
    lastName: string
    phone: string
    direction?: string
    latitude?: string
    longitude?: string
    observation?: string
  }[]

}
export interface IModelTenant extends Model<ITenant> {}

const tenantSchema = new Schema<ITenant>({
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
  code: { type: String, required: true },
  identification: { type: String, required: true },
  email: { type: String, default: null },
  profession: { type: String, default: null },
  socialReason: { type: String, default: null },
  nit: { type: String, default: null },
  businessId: {
    type: Schema.Types.ObjectId,
    ref: 'Business'
  },
  phones: {
    type: [{
      _id: false,
      name: { type: String },
      phone: { type: String },
      observation: { type: String },
      principal: { type: Boolean }
    }],
    default: []
  },
  directions: {
    type: [{
      _id: false,
      name: { type: String },
      direction: { type: String },
      latitude: { type: String },
      longitude: { type: String },
      observation: { type: String },
      principal: { type: Boolean }
    }],
    default: []
  },
  business: {
    _id: false,
    name: { type: String },
    phone: { type: String },
    nit: { type: String },
    centralDirection: { type: String }
  },
  references: {
    type: [{
      _id: false,
      name: { type: String },
      lastName: { type: String },
      phone: { type: String },
      direction: { type: String },
      latitude: { type: String },
      longitude: { type: String },
      observation: { type: String }
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

const Tenant = model<ITenant, IModelTenant>('Tenant', tenantSchema, 'tenants')

export { Tenant }
