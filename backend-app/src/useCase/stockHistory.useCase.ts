import { StockMovementTypeEnum } from '@/graphql/graphql_types'
import { IStock } from '../models'
import { BadRequestError } from '@/lib/graphqlerrors'
import StockHistory from '@/models/stockHistory'

export class StockHistoryUseCase {
  async createStockHistory(
    initialStock: IStock,
    stock: IStock,
    quantity: number,
    movementType: StockMovementTypeEnum
  ) {
    const stockHistoryInstance = new StockHistory({
      date: new Date(),
      quantity,
      stockId: stock.id,
      warehouseId: stock.warehouseId,
      stockBefore: initialStock.quantity
    })
    switch (movementType) {
      case StockMovementTypeEnum.INWARD: {
        stockHistoryInstance.stockLater = initialStock.quantity + quantity
        break
      }
      case StockMovementTypeEnum.OUTWARD: {
        if ((initialStock.quantity - quantity) < 0) {
          throw new BadRequestError('El stock actual es menor  a la cantidad que se desea retirar')
        }
        stockHistoryInstance.stockLater = initialStock.quantity - quantity
        break
      }
      case StockMovementTypeEnum.DISPOSE: {
        if ((initialStock.quantity - quantity) < 0) {
          throw new BadRequestError('El stock actual es menor a la cantidad que se desea desechar')
        }
        stockHistoryInstance.stockLater = initialStock.quantity - quantity
        break
      }
    }
    return await stockHistoryInstance.save()
  }
}
