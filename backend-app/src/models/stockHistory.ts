/* eslint-disable no-unused-vars */
import { Document, Model, Schema, model } from 'mongoose'
import IGeneric from '@/interfaces/generic.interface'

enum StockMovementTypeEnum {
  INWARD = 'INWARD',
  OUTWARD = 'OUTWARD',
  DISPOSE = 'DISPOSE'
}

export interface IStockHistory extends Document, IGeneric {
  id: objectId;
  stockId: objectId;
  warehouseId: objectId;
  quantity: number;
  type: StockMovementTypeEnum;
  date: Date;
  stockBefore: number;
  stockLater: number;
}
export interface IModelStockHistory extends Model<IStockHistory> { }
const stockSchema = new Schema<IStockHistory>(
  {
    stockId: {
      type: Schema.Types.ObjectId,
      ref: 'Stock'
    },
    warehouseId: {
      type: Schema.Types.ObjectId,
      ref: 'Warehouse'
    },
    quantity: {
      type: Number,
      required: [true, 'cantidad es obligatorio']
    },
    type: {
      type: String,
      enum: StockMovementTypeEnum
    },
    date: {
      type: Date,
      default: Date.now()
    },
    stockBefore: {
      type: Number
    },
    stockLater: {
      type: Number,
      required: true
    },
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

const StockHistory = model<IStockHistory, IModelStockHistory>('StockHistory', stockSchema, 'stocksHistory')

export default StockHistory
