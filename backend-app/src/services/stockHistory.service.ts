import { PaginationInput } from "@/graphql/graphql_types";
import { StockHistoryRepository } from "../repositories";
import { getInstancesPagination } from "./generic.service";
import StockHistory, {
  IModelStockHistory,
  IStockHistory,
} from "@/models/stockHistory";

export class StocksHistoryService extends StockHistoryRepository<objectId> {
  async getStockHistory(paginationInput: PaginationInput, stockId: objectId) {
    const filterArgs = {
      stockId,
    };
    return await getInstancesPagination<IStockHistory, IModelStockHistory>(
      StockHistory,
      paginationInput,
      filterArgs
    );
  }
  async getWarehouseHistory(
    paginationInput: PaginationInput,
    warehouseId: objectId
  ) {
    const filterArgs = {
      warehouseId,
    };
    return await getInstancesPagination<IStockHistory, IModelStockHistory>(
      StockHistory,
      paginationInput,
      filterArgs
    );
  }
}
