import { StockMovementTypeEnum } from "@/graphql/graphql_types";
import { IStock } from "../models";
import { BadRequestError } from "@/lib/graphqlerrors";
import StockHistory from "@/models/stockHistory";

export class StockHistoryUseCase {
  async createStockHistory(
    initialStock: IStock,
    quantity: number,
    movementType: StockMovementTypeEnum,
    createdBy?: objectId | null
  ) {
    const stockHistoryInstance = new StockHistory({
      date: new Date(),
      quantity,
      type: movementType,
      stockId: initialStock.id,
      warehouseId: initialStock.warehouseId,
      stockBefore: initialStock.quantity,
      createdBy,
    });
    switch (movementType) {
      case StockMovementTypeEnum.INWARD: {
        stockHistoryInstance.stockLater = initialStock.quantity + quantity;
        break;
      }
      case StockMovementTypeEnum.OUTWARD: {
        if (initialStock.quantity - quantity < 0) {
          throw new BadRequestError(
            "El stock actual es menor  a la cantidad que se desea retirar"
          );
        }
        stockHistoryInstance.stockLater = initialStock.quantity - quantity;
        break;
      }
      case StockMovementTypeEnum.DISPOSE: {
        if (initialStock.quantity - quantity < 0) {
          throw new BadRequestError(
            "El stock actual es menor a la cantidad que se desea desechar"
          );
        }
        stockHistoryInstance.stockLater = initialStock.quantity - quantity;
        break;
      }
    }
    console.log("AQUI ====");
    return await stockHistoryInstance.save();
  }
}
