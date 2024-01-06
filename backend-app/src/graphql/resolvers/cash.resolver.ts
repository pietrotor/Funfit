import {
  StatusEnum,
  CreateTurnInput,
  CashResponse,
  CloseTurnInput,
  Cash,
  Turn
} from '@/graphql/graphql_types'
import { ContextGraphQl } from '@/interfaces/context.interface'
import { errorHandler } from '@/lib/graphqlerrors'
import { cashCore, turnCore } from '@/services/index'

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
      message: 'Caja abierta correactamente',
      data: cashInstance
    }
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

export const cashQuery = {
  getCashById
}
export const cashMutation = {
  openCash,
  closeCash
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
  }
}
