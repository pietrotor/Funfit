import {
  CreateStockInput,
  CreateStockMovementInput,
  PaginationInput,
  WarehouseStockPaginationInput,
} from "@/graphql/graphql_types";
import { IPaginatedResponse } from "@/interfaces/generic.interface";
import { OutErrorResponse } from "@/lib/graphqlerrors/custom.error";
import { IStock } from "@/models/stock.model";

export abstract class StockRepository<T> {
  abstract getStocksPaginated(
    paginationInput: PaginationInput
  ): Promise<IPaginatedResponse<IStock> | OutErrorResponse>;

  abstract getStockById(id: T): Promise<IStock | OutErrorResponse>;
  abstract getStockByIdInstance(id: T): Promise<IStock | null>;

  abstract getStocksByProductId(
    paginationInput: PaginationInput,
    productId: T
  ): Promise<IPaginatedResponse<IStock> | OutErrorResponse>;

  abstract getStocksByProductIdInstance(productId: T): Promise<IStock[] | null>;

  abstract getStocksByWarehouseId(
    warehouseStockPaginationInput: WarehouseStockPaginationInput
  ): Promise<IStock[] | OutErrorResponse>;

  abstract createStock(
    createStockInput: CreateStockInput,
    createdBy?: objectId
  ): Promise<IStock | OutErrorResponse>;

  abstract createStockMovement(
    createStockMovementInput: CreateStockMovementInput,
    createdBy?: objectId
  ): Promise<IStock | OutErrorResponse>;
}
