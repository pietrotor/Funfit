import { CreateTurnMovementInput, PaginationInput } from '@/graphql/graphql_types'
import { IModelTurnMovements, ITurnMovements, TurnMovements } from '../models'
import { TurnMovementRepository } from '../repositories'
import { BadRequestError } from '@/lib/graphqlerrors'
import { cashCore, turnCore } from '.'
import { getInstancesPagination } from './generic.service'

export class TurnMovementService extends TurnMovementRepository<objectId> {
  async createMovement(createTurnMovementInput: CreateTurnMovementInput, createdBy?: objectId) {
    const { amount, cashId, turnId } = createTurnMovementInput
    if (amount < 0) throw new BadRequestError('El monto no puede ser negativo')
    const [, turnInstance] = await Promise.all([
      cashCore.getCashById(cashId),
      turnCore.getTurnById(turnId)
    ])
    const turnMovmementInstance = new TurnMovements({
      ...createTurnMovementInput,
      createdBy
    })
    turnInstance.amountOfMovents += 1
    await turnInstance.save()
    return await turnMovmementInstance.save()
  }

  async getTurnMovementsPaginated(paginationInput: PaginationInput, turnId: objectId) {
    const { filter } = paginationInput
    const turnArgs = { turnId }
    if (filter) {
      const filterArgs = {
        turnArgs
      }
      return await getInstancesPagination<ITurnMovements, IModelTurnMovements>(
        TurnMovements,
        paginationInput,
        filterArgs
      )
    }
    return await getInstancesPagination<ITurnMovements, IModelTurnMovements>(
      TurnMovements,
      paginationInput,
      turnArgs
    )
  }
}
