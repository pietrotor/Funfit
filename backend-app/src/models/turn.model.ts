import IGeneric from '@/interfaces/generic.interface'
import { Document, Model, Schema, model } from 'mongoose'

export interface ITurn extends Document, IGeneric {
  id: objectId;
  cashId: objectId;
  isOpen: boolean;
  openInfo: {
    amount: number;
    physicialAmount: number;
    difference: number;
    date: Date;
    observation: string;
    user: objectId;
  };
  closeInfo: {
    amount: number;
    physicialAmount: number;
    difference: number;
    date: Date;
    observation: string;
    user: objectId;
  } | null;
}
export interface IModelTurn extends Model<ITurn> { }

const turnSchema = new Schema<ITurn>(
  {
    cashId: {
      type: Schema.Types.ObjectId,
      ref: 'Cash'
    },
    isOpen: { type: Boolean, default: false },
    openInfo: {
      amount: {
        type: Number,
        required: [true, 'es necesario el monto de apertura de caja']
      },
      physicialAmount: {
        type: Number,
        required: [true, 'es necesario el monto físico de apertura de caja']
      },
      difference: {
        type: Number
      },
      date: {
        type: Date,
        default: Date.now
      },
      observation: {
        type: String
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    },
    closeInfo: {
      amount: {
        type: Number
      },
      physicialAmount: {
        type: Number
      },
      difference: {
        type: Number
      },
      date: {
        type: Date
      },
      observation: {
        type: String
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
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

export const Turn = model<ITurn, IModelTurn>('Turn', turnSchema, 'turn')
