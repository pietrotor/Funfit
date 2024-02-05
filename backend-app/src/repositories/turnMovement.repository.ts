import { CreateTurnMovementInput, PaginationInput } from '@/graphql/graphql_types'
import { ITurnMovements } from '../models'
import { OutErrorResponse } from '@/lib/graphqlerrors/custom.error'
import { IPaginatedResponse } from '@/interfaces/generic.interface'

export abstract class TurnMovementRepository<T> {
  abstract getTurnMovementsPaginated(
    paginationInput: PaginationInput,
    turnId: objectId
  ): Promise<IPaginatedResponse<ITurnMovements[]> | OutErrorResponse>;

  abstract createMovement(createTurnMovementInput: CreateTurnMovementInput, createdBy?: T): Promise<ITurnMovements | OutErrorResponse>
}
