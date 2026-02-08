import IGeneric from '../interfaces/generic.interface'
import { Document, Model, Schema, model, models } from 'mongoose'

interface IDistributor extends Document, IGeneric {
  id: objectId
  name: string
  code: string
  address: string
  email?: string
  phone: string
  nit?: string
  socialReason?: string
  ownerInformation: {
    name: string
    lastName?: string
    phone?: string
    address?: string
  }
}

interface IModelDistributor extends Model<IDistributor> {}

const distributorSchema = new Schema<IDistributor>(
  {
    name: {
      type: String,
      required: [true, 'nombre es obligatorio'],
      maxlength: [150, 'nombre es muy largo'],
      trim: true
    },
    code: {
      type: String,
      required: true,
      trim: true
    },
    address: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      default: null
    },
    phone: {
      type: String,
      required: [true, 'telefono es obligatorio']
    },
    nit: {
      type: String,
      default: null
    },
    socialReason: {
      type: String,
      default: null
    },
    ownerInformation: {
      _id: false,
      name: {
        type: String
      },
      lastName: {
        type: String
      },
      phone: {
        type: String
      },
      address: {
        type: String
      }
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

const Distributor = (models.Distributor as IModelDistributor) || model<IDistributor, IModelDistributor>(
  'Distributor',
  distributorSchema,
  'distributor'
)

export { Distributor, IModelDistributor, IDistributor }
