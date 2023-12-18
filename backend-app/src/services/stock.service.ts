import {
  CreateStockInput,
  CreateStockMovementInput,
  PaginationInput,
  UpdateConfigurationInput,
  WarehouseStockPaginationInput,
} from "@/graphql/graphql_types";
import { BadRequestError } from "@/lib/graphqlerrors";
import { updateGenericInstance } from "@/lib/updateInstance";
import Configuration from "@/models/configuration.model";
import { StockRepository } from "../repositories";
import { getInstancesPagination } from "./generic.service";
import { IModelStock, IStock } from "../models";
import Stock from "@/models/stock.model";
import { stockUseCase } from "useCase";

export class StocksService extends StockRepository<objectId> {
  async getStocksPaginated(paginationInput: PaginationInput) {
    const { filter } = paginationInput;
    if (filter) {
      const filterArgs = {
        $or: [
          { name: { $regex: filter, $options: "i" } },
          { quantity: { $regex: filter, $options: "i" } },
        ],
      };
      return await getInstancesPagination<IStock, IModelStock>(
        Stock,
        paginationInput,
        filterArgs
      );
    }
    return await getInstancesPagination<IStock, IModelStock>(
      Stock,
      paginationInput
    );
  }

  async getStockById(id: objectId) {
    const stockInstance = await Stock.findOne({
      _id: id,
      delted: false,
    });
    if (!stockInstance) throw new BadRequestError("No se encontro el error");
    return stockInstance;
  }

  async getStocksByWarehouseId(
    warehouseStockPaginationInput: WarehouseStockPaginationInput
  ) {
    const { warehouses, ...paginationInput } = warehouseStockPaginationInput;
    const warehousesFilter = { warehouseId: { $in: { warehouses } } };
    return await getInstancesPagination<IStock, IModelStock>(
      Stock,
      paginationInput,
      warehousesFilter
    );
  }

  async getStockByIdInstance(id: objectId) {
    return await Stock.findOne({
      _id: id,
      delted: false,
    });
  }

  async getStocksByProductId(
    paginationInput: PaginationInput,
    productId: objectId
  ) {
    const warehousesFilter = { productId: productId };
    return await getInstancesPagination<IStock, IModelStock>(
      Stock,
      paginationInput,
      warehousesFilter
    );
  }

  async getStocksByProductIdInstance(productId: objectId) {
    return await Stock.find({
      delted: false,
      productId,
    });
  }

  async createStock(createStockInput: CreateStockInput, createdBy?: objectId) {
    const productStock = await this.getStocksByProductIdInstance(
      createStockInput.productId
    );
    const isDuplicatedStock = productStock.find(
      (stock) =>
        stock.productId.toString() === createStockInput.productId.toString() &&
        stock.warehouseId.toString() === createStockInput.warehouseId.toString()
    );
    if (isDuplicatedStock)
      throw new BadRequestError(
        "El product ya se encuentra registrado en este almacen"
      );
    const stockInstance = new Stock({ ...createStockInput, createdBy });
    return await stockInstance.save();
  }

  async createStockMovement(
    createStockMovementInput: CreateStockMovementInput,
    createdBy?: objectId
  ) {
    const { stockId, quantity, type } = createStockMovementInput;
    const stockInstance = await this.getStockById(stockId);
    if (quantity < 1)
      throw new BadRequestError(
        "La cantidad de stock movido debe ser mayor a 0"
      );
    // Update stock according to movement type
    stockUseCase.stockMovement(stockInstance, quantity, type);
    // TODO: add to stock history
    return await stockInstance.save();
  }
}
