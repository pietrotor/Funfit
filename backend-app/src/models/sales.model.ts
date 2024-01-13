// import IGeneric from "@/interfaces/generic.interface";
// import { Model } from "mongoose";

// export interface ISale extends Document, IGeneric {
//   id: Types.ObjectId;
//   branch: Types.ObjectId;
//   products: {
//     id: Types.ObjectId;
//     price: number;
//     qty: number;
//     total: number;
//   }[];
//   ticketNumber: number;
//   paymentMethod: string;
//   total: number;
//   date: Date;
//   code: string;
//   client: string;
//   moneyRecived: number;
//   change: number;
//   observations: string;
//   user: Types.ObjectId | null;
//   canceled: boolean;
//   reason: string;
//   canceledAt: Date | null;
// }
// export interface IModelSale extends Model<ISale> { }
// const saleSchema = new Schema<ISale>({
//   branch: {
//     type: Schema.Types.ObjectId,
//     ref: 'Branch'
//   },
//   products: [{
//     _id: false,
//     id: {
//       type: Schema.Types.ObjectId,
//       ref: 'Product'
//     },
//     price: {
//       type: Number,
//       required: [true, 'el precio es requerido']
//     },
//     qty: {
//       type: Number,
//       required: [true, 'la cantidad es requerido']
//     },
//     total: {
//       type: Number,
//       required: [true, 'el total del producto es requerido']
//     }
//   }],
//   ticketNumber: {
//     type: Number,
//     required: [true, 'el ticket es requerido']
//   },
//   paymentMethod: {
//     type: String,
//     enum: ['efectivo', 'qr', 'tarjeta', 'transferencia']
//   },
//   total: {
//     type: Number,
//     required: [true, 'Total de venta es requerido']
//   },
//   date: {
//     type: Date,
//     default: Date.now
//   },
//   code: {
//     type: String,
//     default: ''
//   },
//   client: {
//     type: String,
//     default: ''
//   },
//   moneyRecived: {
//     type: Number,
//     default: 0
//   },
//   change: {
//     type: Number,
//     default: 0
//   },
//   observations: {
//     type: String
//   },
//   user: {
//     type: Schema.Types.ObjectId,
//     ref: 'User'
//   },
//   canceled: {
//     type: Boolean,
//     default: false
//   },
//   reason: {
//     type: String
//   },
//   canceledAt: {
//     type: Date,
//     default: null
//   },
//   // Generic Types
//   status: { type: Boolean, default: true },
//   createdBy: {
//     type: Schema.Types.ObjectId,
//     ref: 'User'
//   },
//   deleted: { type: Boolean, default: false },
//   deletedAt: { type: Date, default: null },
//   deletedBy: {
//     type: Schema.Types.ObjectId,
//     ref: 'User'
//   }
// }, { timestamps: true })

// const Sale = model<ISale, IModelSale>('Sale', saleSchema, 'sale')

// export default Sale
