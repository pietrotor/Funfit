import { CloseTurnInput, CreateTurnInput } from '@/graphql/graphql_types'
import { ITurn } from '../models'
import { OutErrorResponse } from '@/lib/graphqlerrors/custom.error'

export abstract class TurnRepository<T> {
  abstract getTurnById(id: T): Promise<ITurn | OutErrorResponse>;
  abstract getTurnByIdInstance(id: T): Promise<ITurn | null>;
  abstract createTurn(createTurnInput: CreateTurnInput, createdBy?: T): Promise<ITurn | OutErrorResponse>
  abstract closeTurn(closeTurnInput: CloseTurnInput, createdBy?: T): Promise<ITurn | OutErrorResponse>
}
