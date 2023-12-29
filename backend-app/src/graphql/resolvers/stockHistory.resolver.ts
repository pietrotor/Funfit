import {
  StocksHistoryResponse,
  PaginationInput,
  StockHistory,
  Stock,
  Warehouse,
  User,
} from "@/graphql/graphql_types";
import { errorHandler } from "@/lib/graphqlerrors";
import {
  stockCore,
  stockHistoryCore,
  userCore,
  warehouseCore,
} from "@/services/index";

// ========================================== Queries ====================================================
const getStockHistory = async (
  _: any,
  args: { paginationInput: PaginationInput; stockId: objectId }
): Promise<StocksHistoryResponse> => {
  try {
    const { paginationInput, stockId } = args;
    return await stockHistoryCore.getStockHistory(paginationInput, stockId);
  } catch (error) {
    console.log(error);
    return errorHandler(error);
  }
};
const getWarehouseHistory = async (
  _: any,
  args: { paginationInput: PaginationInput; warehouseId: objectId }
): Promise<StocksHistoryResponse> => {
  try {
    const { paginationInput, warehouseId } = args;
    return await stockHistoryCore.getWarehouseHistory(
      paginationInput,
      warehouseId
    );
  } catch (error) {
    console.log(error);
    return errorHandler(error);
  }
};
// ========================================== Mutations ====================================================

export const stockHistoryQuery = {
  getStockHistory,
  getWarehouseHistory,
};
export const stockHistoryMutation = {};

export const stockHistoryType = {
  StockHistory: {
    async stock(parent: StockHistory, _: any, __: any): Promise<Stock | null> {
      if (parent.stockId) {
        const stock = await stockCore.getStockByIdInstance(parent.stockId);
        return stock;
      }
      return null;
    },
    async warehouse(
      parent: StockHistory,
      _: any,
      __: any
    ): Promise<Warehouse | null> {
      if (parent.warehouseId) {
        const warehouse = await warehouseCore.getWarehouseByIdInstance(
          parent.warehouseId
        );
        return warehouse;
      }
      return null;
    },
    async createdByInfo(
      parent: StockHistory,
      _: any,
      __: any
    ): Promise<User | null> {
      if (parent.createdBy) {
        const user = await userCore.getUserByIdInstance(parent.createdBy);
        return user;
      }
      return null;
    },
  },
};
