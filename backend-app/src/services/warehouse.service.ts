import { WarehouseRepository } from "@/repositories/index";
import { Types } from "mongoose";
import { IWarehouse } from "../models";
import Warehouse, { IModelWarehouse } from "@/models/warehouse.model";
import { BadRequestError } from "@/lib/graphqlerrors";
import { PaginationInput } from "@/graphql/graphql_types";
import { getInstancesPagination } from "./generic.service";

export class WarehouseService extends WarehouseRepository<objectId> {
  async getWarehousesPaginated(paginationInput: PaginationInput) {
    const { filter } = paginationInput;
    if (filter) {
      const filterArgs = {
        $or: [
          { name: { $regex: filter, $options: "i" } },
          { code: { $regex: filter, $options: "i" } },
        ],
      };
      return await getInstancesPagination<IWarehouse, IModelWarehouse>(
        Warehouse,
        paginationInput,
        filterArgs
      );
    }
    return await getInstancesPagination<IWarehouse, IModelWarehouse>(
      Warehouse,
      paginationInput
    );
  }
  async getWarehouseById(id: objectId) {
    const warehouseInstance = await Warehouse.findOne({
      _id: id,
      deleted: false,
    });
    if (!warehouseInstance) throw new BadRequestError("No existe el almacen");
    return warehouseInstance;
  }
  async getWarehouseByIdInstance(id: objectId) {
    return await Warehouse.findOne({
      _id: id,
      deleted: false,
    });
  }
}
