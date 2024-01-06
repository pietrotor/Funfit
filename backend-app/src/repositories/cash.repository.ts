import { OutErrorResponse } from '@/lib/graphqlerrors/custom.error'
import { ICash } from '../models'
import { CloseTurnInput, CreateTurnInput } from '@/graphql/graphql_types'

export abstract class CashRepository<T> {
  abstract getCashById(id: T): Promise<ICash | OutErrorResponse>;
  abstract getCashByIdInstance(id: T): Promise<ICash | null>;
  abstract isCashOpen(id: T): Promise<boolean | OutErrorResponse>;
  abstract openCash(turn: CreateTurnInput, createdBy?: objectId): Promise<ICash | OutErrorResponse>;
  abstract closeCash(turn: CloseTurnInput, createdBy?: objectId): Promise<ICash | OutErrorResponse>;
}
