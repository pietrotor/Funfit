import { Document, Model, Schema, model, models } from 'mongoose'
import IGeneric from '@/interfaces/generic.interface'

export interface IWarehouse extends Document, IGeneric {
  id: objectId
  name: string
  description: string
  address: string
  productsIds: objectId[]
}
export interface IModelWarehouse extends Model<IWarehouse> {}
const warehouseSchema = new Schema<IWarehouse>(
  {
    name: {
      type: String,
      required: [true, 'nombre es obligatorio'],
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    address: {
      type: String,
      trim: true
    },
    productsIds: [
      {
        type: Schema.Types.ObjectId,
        default: [],
        ref: 'Product'
      }
    ],
    // ============= Generic Types ===========
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

const Warehouse = (models.Warehouse as IModelWarehouse) || model<IWarehouse, IModelWarehouse>(
  'Warehouse',
  warehouseSchema,
  'warehouse'
)

export default Warehouse
