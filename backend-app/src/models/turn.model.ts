import IGeneric from '@/interfaces/generic.interface'
import { Document, Model, Schema, model, models } from 'mongoose'

export interface ITurn extends Document, IGeneric {
  id: objectId;
  cashId: objectId;
  isOpen: boolean;
  amountOfMovents: number;
  openInfo: {
    amount: number;
    physicialAmount: number;
    difference: number;
    date: Date;
    observation?: string | null;
    openBy: objectId;
  };
  closeInfo: {
    amount: number;
    physicialAmount: number;
    difference: number;
    date: Date;
    observation?: string | null;
    closeBy: objectId;
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
    amountOfMovents: {
      type: Number,
      default: 0
    },
    openInfo: {
      _id: false,
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
      openBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    },
    closeInfo: {
      type: {
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
        closeBy: {
          type: Schema.Types.ObjectId,
          ref: 'User'
        }
      },
      default: null
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

export const Turn = (models.Turn as IModelTurn) || model<ITurn, IModelTurn>('Turn', turnSchema, 'turn')
