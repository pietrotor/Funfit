import { CashRepository } from '@/repositories/cash.repository'
import { Cash } from '../models'
import { BadRequestError } from '@/lib/graphqlerrors'
import { CloseTurnInput, CreateTurnInput } from '@/graphql/graphql_types'
import { turnCore } from '.'

export class CashService extends CashRepository<objectId> {
  async getCashById(id: objectId) {
    const cashInstance = await Cash.findOne({
      _id: id,
      deleted: false
    })
    if (!cashInstance) throw new BadRequestError('No se encontro la caja')
    return cashInstance
  }

  async getCashByIdInstance(id: objectId) {
    return await Cash.findOne({
      _id: id,
      deleted: false
    })
  }

  async isCashOpen(id: objectId) {
    const cashInstance = await this.getCashById(id)
    if (!cashInstance.isOpen && !cashInstance.currentTurnId) return false
    if (!cashInstance.isOpen && cashInstance.currentTurnId) throw new BadRequestError('Existe un turno asignado, sin embargo la caja no esta abierta')
    if (cashInstance.isOpen && !cashInstance.currentTurnId) throw new BadRequestError('La caja esta abierta, sin embargo no existe un turno asignado')
    return true
  }

  async openCash(turn: CreateTurnInput, createdBy?: objectId) {
    const { cashId } = turn
    await turnCore.createTurn(turn, createdBy)
    return await this.getCashById(cashId)
  }

  async closeCash(turn: CloseTurnInput, createdBy?: objectId) {
    const { cashId } = turn
    await turnCore.closeTurn(turn, createdBy)
    return await this.getCashById(cashId)
  }
}
