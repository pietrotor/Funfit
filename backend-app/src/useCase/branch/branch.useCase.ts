import {
  CreateBranchProductStockMovementInput,
  PaymentMethodEnum,
  SaleItem,
  StockMovementTypeEnum
} from '@/graphql/graphql_types'
import { BadRequestError } from '@/lib/graphqlerrors'
import { branchProductCore, stockCore } from '@/services/index'

export class BranchUseCase {
  private async createInwardMovement(
    branchProductId: objectId,
    stockId: objectId,
    qty: number,
    date: Date,
    observation?: string | null,
    createdBy?: objectId
  ) {
    const [branchProductInstance, stockInstance] = await Promise.all([
      branchProductCore.getBranchProductById(branchProductId),
      stockCore.getStockById(stockId)
    ])

    if (qty > stockInstance.quantity)
      throw new BadRequestError(
        'La cantidad que desea agregar es menor a la existe en almacenes'
      )
    branchProductInstance.stock += qty
    branchProductInstance.lastStockEntry = branchProductInstance.stock
    await Promise.all([
      stockCore.createStockMovement(
        {
          date,
          quantity: qty,
          stockId,
          type: StockMovementTypeEnum.OUTWARD,
          detail: observation
        },
        createdBy
      ),
      branchProductInstance.save()
    ])
  }

  private async createOutWardMovement(branchProductId: objectId, qty: number) {
    const [branchProductInstance] = await Promise.all([
      branchProductCore.getBranchProductById(branchProductId)
    ])

    if (qty > branchProductInstance.stock)
      throw new BadRequestError(
        'La cantidad que desea retirar es menor a la existe en almacenes'
      )
    branchProductInstance.stock -= qty
    await branchProductInstance.save()
  }

  public async stockUpdate(
    createBranchProductStockMovementInput: CreateBranchProductStockMovementInput,
    createdBy?: objectId
  ) {
    const { type, branchProductId, date, qty, observation, stockId } =
      createBranchProductStockMovementInput

    switch (type) {
      case StockMovementTypeEnum.INWARD:
        await this.createInwardMovement(
          branchProductId,
          stockId!,
          qty,
          date,
          observation,
          createdBy
        )
        break
      case StockMovementTypeEnum.OUTWARD:
        await this.createOutWardMovement(branchProductId, qty)
        break
      case StockMovementTypeEnum.DISPOSE:
        await this.createOutWardMovement(branchProductId, qty)
        break
    }
  }
}
