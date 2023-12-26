import { StockMovementTypeEnum } from "@/graphql/graphql_types";
import { IStock } from "../models";
import { BadRequestError } from "@/lib/graphqlerrors";

export class StockUseCase {
  stockMovement(
    stock: IStock,
    quantity: number,
    movementType: StockMovementTypeEnum
  ) {
    switch (movementType) {
      case StockMovementTypeEnum.INWARD: {
        stock.lastStockEntry = stock.quantity + quantity;
        stock.quantity += quantity;
        return stock;
      }
      case StockMovementTypeEnum.OUTWARD: {
        if (stock.quantity < quantity)
          throw new BadRequestError(
            "La cantidad de stock que quiere retirar es menor a los existentes"
          );
        stock.quantity -= quantity;
        return stock;
      }
      case StockMovementTypeEnum.DISPOSE: {
        if (stock.quantity < quantity)
          throw new BadRequestError(
            "La cantidad de stock que quiere desechar es menor a los existentes"
          );
        stock.quantity -= quantity;
        return stock;
      }
    }
  }
}
