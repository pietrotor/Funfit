import { CloseTurnInput, CreateTurnInput } from '@/graphql/graphql_types'
import { TurnRepository } from '@/repositories/turn.repository'
import { cashCore } from '.'
import { BadRequestError } from '@/lib/graphqlerrors'
import { Turn } from '../models'

export class TurnService extends TurnRepository<objectId> {
  async getTurnById(id: objectId) {
    const turnInstance = await Turn.findOne({
      _id: id,
      deleted: false
    })
    if (!turnInstance) throw new BadRequestError('No se encontro la caja')
    return turnInstance
  }

  async getTurnByIdInstance(id: objectId) {
    return await Turn.findOne({
      _id: id,
      deleted: false
    })
  }

  async createTurn(createTurnInput: CreateTurnInput, createdBy?: objectId) {
    const { cashId, updateToPhysicialAmount, ...openInfo } = createTurnInput
    if (
      openInfo.amount < 0 ||
      openInfo.physicialAmount < 0
    ) throw new BadRequestError('Los montos no pueden ser negativos')
    if (openInfo.amount - openInfo.physicialAmount !== openInfo.difference) throw new BadRequestError('La diferencia no cuadra')
    const [cashInstance, isAlreadyOpen] = await Promise.all([
      cashCore.getCashById(cashId),
      cashCore.isCashOpen(cashId)
    ])
    if (isAlreadyOpen) throw new BadRequestError('La caja ya se encuentra abierta')
    const turnInstance = new Turn({
      cashId,
      isOpen: true,
      openInfo: {
        ...openInfo,
        date: new Date(),
        openBy: createdBy
      },
      createdBy,
      closeInfo: null
    })
    cashInstance.currentTurnId = turnInstance._id
    cashInstance.isOpen = true
    if (updateToPhysicialAmount) cashInstance.amount = openInfo.physicialAmount
    else cashInstance.amount = openInfo.amount
    const [turnInstanceSaved] = await Promise.all([
      turnInstance.save(),
      cashInstance.save()
    ])
    return turnInstanceSaved
  }

  async closeTurn(closeTurnInput: CloseTurnInput, createdBy?: objectId) {
    const { cashId, turnId, updateToPhysicialAmount, ...closeInfo } = closeTurnInput
    if (
      closeInfo.amount < 0 ||
      closeInfo.physicialAmount < 0
    ) throw new BadRequestError('Los montos no pueden ser negativos')
    if (closeInfo.amount - closeInfo.physicialAmount !== closeInfo.difference) throw new BadRequestError('La diferencia no cuadra')
    const [cashInstance, isAlreadyOpen] = await Promise.all([
      cashCore.getCashById(cashId),
      cashCore.isCashOpen(cashId)
    ])
    if (!isAlreadyOpen) throw new BadRequestError('La caja se encuentra ya cerrada')
    if (cashInstance.currentTurnId?.toString() !== turnId.toString()) throw new BadRequestError('La caja tiene otro turno asignado')
    const turnInstance = await this.getTurnById(turnId)
    turnInstance.isOpen = false
    turnInstance.closeInfo = {
      ...closeInfo,
      date: new Date(),
      closeBy: createdBy as any
    }
    cashInstance.currentTurnId = null
    cashInstance.isOpen = false
    if (updateToPhysicialAmount) cashInstance.amount = closeInfo.physicialAmount
    else cashInstance.amount = closeInfo.amount
    const [turnInstanceSaved] = await Promise.all([
      turnInstance.save(),
      cashInstance.save()
    ])
    return turnInstanceSaved
  }
}
