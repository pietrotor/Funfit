import IGeneric from '../interfaces/generic.interface'
import { Document, Model, Schema, model } from 'mongoose'

interface IPriceList extends Document, IGeneric {
  id: objectId
  name: string
  code: string
  description: string
  productsIds: objectId[]
}

interface IModelPriceList extends Model<IPriceList> {}

const priceListSchema = new Schema<IPriceList>(
  {
    name: {
      type: String
    },
    code: {
      type: String
    },
    description: {
      type: String
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

const PriceList = model<IPriceList, IModelPriceList>(
  'PriceList',
  priceListSchema,
  'priceList'
)

export { PriceList, IModelPriceList, IPriceList }
