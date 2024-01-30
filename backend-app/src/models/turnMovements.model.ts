/* eslint-disable no-unused-vars */
import IGeneric from '@/interfaces/generic.interface'
import { Document, Model, Schema, model } from 'mongoose'

export enum TurnMovementTypeEnum {
  ADD = 'ADD',
  WITHDRAW = 'WITHDRAW',
  ADJUST = 'ADJUST'
}

export interface ITurnMovements extends Document, IGeneric {
  id: objectId
  turnId: objectId
  cashId: objectId
  amount: number
  date: Date
  type: TurnMovementTypeEnum
  concept: string
}
export interface IModelTurnMovements extends Model<ITurnMovements> {}

const turnMovementsSchema = new Schema<ITurnMovements>(
  {
    turnId: {
      type: Schema.Types.ObjectId,
      ref: 'Turn'
    },
    cashId: {
      type: Schema.Types.ObjectId,
      ref: 'Cash'
    },
    amount: {
      type: Number
    },
    date: {
      type: Date
    },
    type: {
      type: String,
      enum: TurnMovementTypeEnum
    },
    concept: {
      type: String
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

export const TurnMovements = model<ITurnMovements, IModelTurnMovements>(
  'TurnMovements',
  turnMovementsSchema,
  'turnMovements'
)
