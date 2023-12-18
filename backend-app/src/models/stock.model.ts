import { Document, Model, Schema, model } from "mongoose";
import IGeneric from "@/interfaces/generic.interface";

export interface IStock extends Document, IGeneric {
  id: objectId;
  productId: objectId;
  warehouseId: objectId;
  quantity: number;
  securityStock: number;
  lastStockEntry: number;
  units: string;
}
export interface IModelStock extends Model<IStock> {}
const stockSchema = new Schema<IStock>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    warehouseId: {
      type: Schema.Types.ObjectId,
      ref: "Warehouse",
    },
    quantity: {
      type: Number,
      required: [true, "cantidad es obligatorio"],
    },
    securityStock: {
      type: Number,
    },
    units: {
      type: String,
    },
    // ============= Generic Types ===========
    status: { type: Boolean, default: true },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
    deletedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Stock = model<IStock, IModelStock>("Stock", stockSchema, "stocks");

export default Stock;
