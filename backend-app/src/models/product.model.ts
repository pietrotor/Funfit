/* eslint-disable no-unused-vars */
import { Document, Model, Schema, model, models } from 'mongoose'
import IGeneric from '@/interfaces/generic.interface'

export enum ProductTypeEnum {
  SIMPLE = 'SIMPLE',
  COMBO = 'COMBO'
}

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
  subProducts: {
    productId: objectId
    stockRequirement: number
  }[]
  type: ProductTypeEnum
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
    type: {
      type: String,
      enum: ProductTypeEnum,
      default: ProductTypeEnum.SIMPLE
    },
    image: {
      type: String
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category'
    },
    subProducts: [
      {
        _id: false,
        productId: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: 'Product'
        },
        stockRequirement: {
          type: Number,
          required: true
        }
      }
    ],
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

const Product = (models.Product as IModelProduct) || model<IProduct, IModelProduct>(
  'Product',
  productSchema,
  'product'
)

export default Product
