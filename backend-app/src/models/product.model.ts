import { Document, Model, Schema, model } from 'mongoose'
import IGeneric from '@/interfaces/generic.interface'

export interface IProduct extends Document, IGeneric {
  id: objectId
  name: string
  suggetedPrice: number
  code: string
  internalCode: string
  description: string
  cost: number | null
  image?: string
  categoryId?: objectId
  warehouses: objectId[]
  branchesIds: objectId[]
  priceListsIds: objectId[]
}
export interface IModelProduct extends Model<IProduct> {}
const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'nombre es obligatorio'],
      trim: true
    },
    suggetedPrice: {
      type: Number,
      required: [true, 'precio sugerido es obligatorio']
    },
    code: {
      type: String,
      required: [true, 'código es obligatorio'],
      trim: true
    },
    internalCode: {
      type: String,
      trim: true
    },
    cost: {
      type: Number,
      default: null
    },
    description: {
      type: String,
      required: [true, 'descripción es obligatorio']
    },
    image: {
      type: String
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category'
    },
    warehouses: [
      {
        type: Schema.Types.ObjectId,
        default: [],
        ref: 'Warehouse'
      }
    ],
    branchesIds: [
      {
        type: Schema.Types.ObjectId,
        default: [],
        ref: 'Branch'
      }
    ],
    priceListsIds: [
      {
        type: Schema.Types.ObjectId,
        default: [],
        ref: 'PriceList'
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

const Product = model<IProduct, IModelProduct>(
  'Product',
  productSchema,
  'product'
)

export default Product
