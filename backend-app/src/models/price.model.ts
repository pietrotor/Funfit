import IGeneric from '../interfaces/generic.interface'
import { Document, Model, Schema, model, models } from 'mongoose'

interface IPrice extends Document, IGeneric {
  id: objectId
  productId: objectId
  priceListId: objectId
  price: number
}

interface IModelPrice extends Model<IPrice> {}

const priceSchema = new Schema<IPrice>(
  {
    price: {
      type: Number
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    },
    priceListId: {
      type: Schema.Types.ObjectId,
      ref: 'Price'
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

const Price = (models.Price as IModelPrice) || model<IPrice, IModelPrice>('Price', priceSchema, 'price')

export { Price, IModelPrice, IPrice }
