import { PaginationInput, WarehousesResponse } from "@/graphql/graphql_types";
import { errorHandler } from "@/lib/graphqlerrors";
import { warehouseCore } from "@/services/index";

// ========================================== Mutations ====================================================
const getWarehouses = async (
  _: any,
  args: { paginationInput: PaginationInput }
): Promise<WarehousesResponse> => {
  try {
    const { paginationInput } = args;
    return await warehouseCore.getWarehousesPaginated(paginationInput);
  } catch (error) {
    console.log(error);
    return errorHandler(error);
  }
};

// ========================================== Mutations ====================================================
export const warehouseQuery = {
  getWarehouses,
};
export const warehouseMutation = {};

export const warehouseType = {};
