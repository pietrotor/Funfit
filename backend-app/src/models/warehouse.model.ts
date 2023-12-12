import { Document, Types, Model, Schema, model } from "mongoose";
import IGeneric from "@/interfaces/generic.interface";

export interface IWarehouse extends Document, IGeneric {
  id: objectId;
  name: string;
  productsIds: objectId[];
}
export interface IModelWarehouse extends Model<IWarehouse> {}
const warehouseSchema = new Schema<IWarehouse>(
  {
    name: {
      type: String,
      required: [true, "nombre es obligatorio"],
      trim: true,
    },
    productsIds: {
      type: [
        {
          _id: false,
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
      ],
      default: [],
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

const Warehouse = model<IWarehouse, IModelWarehouse>(
  "Warehouse",
  warehouseSchema,
  "warehouse"
);

export default Warehouse;
