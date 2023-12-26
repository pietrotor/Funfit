import {
  CreateStockInput,
  CreateStockMovementInput,
  PaginationInput,
  WarehouseStockPaginationInput,
} from "@/graphql/graphql_types";
import { IPaginatedResponse } from "@/interfaces/generic.interface";
import { OutErrorResponse } from "@/lib/graphqlerrors/custom.error";
import { IStockHistory } from "@/models/stockHistory";

export abstract class StockHistoryRepository<T> {
  abstract getWarehouseHistory(
    paginationInput: PaginationInput,
    warehouseId: T
  ): Promise<IPaginatedResponse<IStockHistory> | OutErrorResponse>;

  abstract getStockHistory(
    paginationInput: PaginationInput,
    stockId: T
  ): Promise<IPaginatedResponse<IStockHistory> | OutErrorResponse>;
}
