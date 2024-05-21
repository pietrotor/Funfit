import {
  StatusEnum,
  CreateTurnInput,
  CashResponse,
  CloseTurnInput,
  Cash,
  Turn,
  PaginationInput,
  CashTurnMovementsResponse,
  TurnMovements,
  User,
  CreateTurnMovementInput,
  CashTurnMovementResponse,
  OpenTurnInfo
} from '@/graphql/graphql_types'
import { ContextGraphQl } from '@/interfaces/context.interface'
import { errorHandler } from '@/lib/graphqlerrors'
import {
  cashCore,
  turnCore,
  turnMovementCore,
  userCore
} from '@/services/index'

// ========================================== Queries ====================================================
const getCashById = async (
  _: any,
  args: { id: objectId }
): Promise<CashResponse> => {
  try {
    const { id } = args
    const cashInstance = await cashCore.getCashById(id)
    return {
      status: StatusEnum.OK,
      message: 'Caja encontrada correactamente',
      data: cashInstance
    }
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}
const getCashTurnMovements = async (
  _: any,
  args: { paginationInput: PaginationInput; turnId: objectId }
): Promise<CashTurnMovementsResponse> => {
  try {
    const { paginationInput, turnId } = args
    return await turnMovementCore.getTurnMovementsPaginated(
      paginationInput,
      turnId
    )
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}
// ========================================== Mutations ====================================================
const openCash = async (
  _: any,
  args: { createTurnInput: CreateTurnInput },
  context: ContextGraphQl
): Promise<CashResponse> => {
  try {
    const { createTurnInput } = args
    const cashInstance = await cashCore.openCash(
      createTurnInput,
      context.req.currentUser?.id
    )
    return {
      status: StatusEnum.OK,
      message: 'Caja abierta correactamente',
      data: cashInstance
    }
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}
const closeCash = async (
  _: any,
  args: { closeTurnInput: CloseTurnInput },
  context: ContextGraphQl
): Promise<CashResponse> => {
  try {
    const { closeTurnInput } = args
    const cashInstance = await cashCore.closeCash(
      closeTurnInput,
      context.req.currentUser?.id
    )
    return {
      status: StatusEnum.OK,
      message: 'Caja cerrada correactamente',
      data: cashInstance
    }
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}
const createCashMovement = async (
  _: any,
  args: { createTurnMovementInput: CreateTurnMovementInput },
  context: ContextGraphQl
): Promise<CashTurnMovementResponse> => {
  try {
    const { createTurnMovementInput } = args
    const movementInstance = await turnMovementCore.createMovement(
      createTurnMovementInput,
      context.req.currentUser?.id
    )
    return {
      status: StatusEnum.OK,
      message: 'Movimiento de dinero realizado exitosamente',
      data: movementInstance
    }
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}
export const cashQuery = {
  getCashById,
  getCashTurnMovements
}
export const cashMutation = {
  openCash,
  closeCash,
  createCashMovement
}

export const cashType = {
  Cash: {
    async currentTurn(parent: Cash, _: any, __: any): Promise<Turn | null> {
      if (parent.currentTurnId) {
        const turn = await turnCore.getTurnByIdInstance(parent.currentTurnId)
        return turn
      }
      return null
    }
  },
  TurnMovements: {
    async createdByInfo(
      parent: TurnMovements,
      _: any,
      __: any
    ): Promise<User | null> {
      if (parent.createdBy) {
        const user = await userCore.getUserByIdInstance(parent.createdBy)
        return user
      }
      return null
    }
  },
  OpenTurnInfo: {
    async openByInfo(
      parent: OpenTurnInfo,
      _: any,
      __: any
    ): Promise<User | null> {
      if (parent.openBy) {
        const user = await userCore.getUserByIdInstance(parent.openBy)
        return user
      }
      return null
    }
  }
}
