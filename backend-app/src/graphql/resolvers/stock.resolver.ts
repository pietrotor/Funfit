import {
  StatusEnum,
  PaginationInput,
  StocksResponse,
  StockResponse,
  CreateStockInput,
  CreateStockMovementInput,
  Stock,
  Product,
  Warehouse,
} from "@/graphql/graphql_types";
import { ContextGraphQl } from "@/interfaces/context.interface";
import { errorHandler } from "@/lib/graphqlerrors";
import { productCore, stockCore, warehouseCore } from "@/services/index";

// ========================================== Queries ====================================================
const getStocksPaginated = async (
  _: any,
  args: { paginationInput: PaginationInput }
): Promise<StocksResponse> => {
  try {
    const { paginationInput } = args;
    return await stockCore.getStocksPaginated(paginationInput);
  } catch (error) {
    console.log(error);
    return errorHandler(error);
  }
};
const getStockById = async (
  _: any,
  args: { id: objectId }
): Promise<StockResponse> => {
  try {
    const { id } = args;
    const stockInstance = await stockCore.getStockById(id);
    return {
      status: StatusEnum.OK,
      message: "Stock encontrado correctamente",
      data: stockInstance,
    };
  } catch (error) {
    console.log(error);
    return errorHandler(error);
  }
};
const getProductStock = async (
  _: any,
  args: { paginationInput: PaginationInput; productId: objectId }
): Promise<StocksResponse> => {
  try {
    const { paginationInput, productId } = args;
    return await stockCore.getStocksByProductId(paginationInput, productId);
  } catch (error) {
    console.log(error);
    return errorHandler(error);
  }
};
// ========================================== Mutations ====================================================
const createStock = async (
  _: any,
  args: { createStockInput: CreateStockInput },
  context: ContextGraphQl
): Promise<StockResponse> => {
  try {
    const { createStockInput } = args;
    const stockInstance = await stockCore.createStock(
      createStockInput,
      context.req.currentUser?.id
    );
    return {
      status: StatusEnum.OK,
      message: "Stock creado correactamente",
      data: stockInstance,
    };
  } catch (error) {
    console.log(error);
    return errorHandler(error);
  }
};
const creatStockMovement = async (
  _: any,
  args: { createStockMovementInput: CreateStockMovementInput },
  context: ContextGraphQl
): Promise<StockResponse> => {
  try {
    const { createStockMovementInput } = args;
    const stockInstance = await stockCore.createStockMovement(
      createStockMovementInput,
      context.req.currentUser?.id
    );
    return {
      status: StatusEnum.OK,
      message: "Moviento de stock creado correctamente",
      data: stockInstance,
    };
  } catch (error) {
    console.log(error);
    return errorHandler(error);
  }
};

export const stockQuery = {
  getStocksPaginated,
  getStockById,
  getProductStock,
};
export const stockMutation = {
  createStock,
  creatStockMovement,
};

export const stockType = {
  Stock: {
    async product(parent: Stock, _: any, __: any): Promise<Product | null> {
      if (parent.productId) {
        return await productCore.getProductByIdInstance(parent.productId);
      }
      return null;
    },
    async warehouse(parent: Stock, _: any, __: any): Promise<Warehouse | null> {
      if (parent.warehouseId) {
        return await warehouseCore.getWarehouseByIdInstance(parent.warehouseId);
      }
      return null;
    },
  },
};
