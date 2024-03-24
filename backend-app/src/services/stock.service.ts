import {
  CreateStockInput,
  CreateStockMovementInput,
  PaginationInput,
  StockMovementTypeEnum,
  WarehouseStockPaginationInput
} from '@/graphql/graphql_types'
import { BadRequestError } from '@/lib/graphqlerrors'
import { StockRepository } from '../repositories'
import { getInstancesPagination } from './generic.service'
import { IModelStock, IStock } from '../models'
import Stock from '@/models/stock.model'
import { stockHistoryUseCase, stockUseCase } from 'useCase'
import { productCore, warehouseCore } from '.'
import Product from '@/models/product.model'

export class StocksService extends StockRepository<objectId> {
  async getStocksPaginated(paginationInput: PaginationInput) {
    const { filter } = paginationInput
    if (filter) {
      const filterArgs = {
        $or: [
          { name: { $regex: filter, $options: 'i' } },
          { quantity: { $regex: filter, $options: 'i' } }
        ]
      }
      return await getInstancesPagination<IStock, IModelStock>(
        Stock,
        paginationInput,
        filterArgs
      )
    }
    return await getInstancesPagination<IStock, IModelStock>(
      Stock,
      paginationInput
    )
  }

  async getStockById(id: objectId) {
    const stockInstance = await Stock.findOne({
      _id: id,
      deleted: false
    })
    if (!stockInstance) throw new BadRequestError('No se encontro el stock')
    return stockInstance
  }

  async getStocksByWarehouseId(
    warehouseStockPaginationInput: WarehouseStockPaginationInput
  ) {
    const { warehouses, filter, ...paginationInput } =
      warehouseStockPaginationInput
    if (filter) {
      const products = await Product.find({
        deleted: false,
        $or: [
          { name: { $regex: filter, $options: 'i' } },
          { code: { $regex: filter, $options: 'i' } }
        ],
        warehouses: {
          $in: [...warehouses]
        }
      })
      const productsIds = products.map(product => product._id)
      const warehousesFilter =
        warehouses.length > 0 ? { warehouseId: { $in: warehouses } } : {}
      return await getInstancesPagination<IStock, IModelStock>(
        Stock,
        paginationInput,
        { ...warehousesFilter, productId: productsIds, deleted: false }
      )
    }
    const warehousesFilter =
      warehouses.length > 0 ? { warehouseId: { $in: warehouses } } : {}
    return await getInstancesPagination<IStock, IModelStock>(
      Stock,
      paginationInput,
      warehousesFilter
    )
  }

  async getStockByIdInstance(id: objectId) {
    return await Stock.findOne({
      _id: id,
      deleted: false
    })
  }

  async getStocksByProductId(
    paginationInput: PaginationInput,
    productId: objectId,
    warehouseId?: objectId
  ) {
    const warehouseFilter = warehouseId ? { warehouseId } : {}
    const filters = { productId, ...warehouseFilter }
    return await getInstancesPagination<IStock, IModelStock>(
      Stock,
      paginationInput,
      filters
    )
  }

  async getStocksByProductIdInstance(productId: objectId) {
    return await Stock.find({
      delted: false,
      productId
    })
  }

  async createStock(createStockInput: CreateStockInput, createdBy?: objectId) {
    const { quantity, warehouseId, productId } = createStockInput
    const productInstance = await productCore.getProductById(
      createStockInput.productId
    )
    const productStock = await this.getStocksByProductIdInstance(
      createStockInput.productId
    )
    const isDuplicatedStock = productStock.find(
      stock =>
        stock.productId.toString() === createStockInput.productId.toString() &&
        stock.warehouseId.toString() === createStockInput.warehouseId.toString()
    )
    if (isDuplicatedStock) {
      throw new BadRequestError(
        'El producto ya se encuentra registrado en este almacen'
      )
    }
    const warehouseInstance = await warehouseCore.getWarehouseById(warehouseId)
    const stockInstance = new Stock({ ...createStockInput, createdBy })
    productInstance.warehouses.push(createStockInput.warehouseId)
    warehouseInstance.productsIds.push(productId)
    const [stockResponse] = await Promise.all([
      stockInstance.save(),
      stockHistoryUseCase.createStockHistory(
        stockInstance,
        quantity,
        StockMovementTypeEnum.INWARD,
        createdBy
      ),
      warehouseInstance.save(),
      productInstance.save()
    ])
    return stockResponse
  }

  async createStockMovement(
    createStockMovementInput: CreateStockMovementInput,
    createdBy?: objectId
  ) {
    const { stockId, quantity, type } = createStockMovementInput
    const stockInstance = await this.getStockById(stockId)
    const initialStockInstance = await this.getStockById(stockId)
    if (quantity < 1) {
      throw new BadRequestError(
        'La cantidad de stock movido debe ser mayor a 0'
      )
    }
    // Update stock according to movement type
    stockUseCase.stockMovement(stockInstance, quantity, type)
    await stockHistoryUseCase.createStockHistory(
      initialStockInstance,
      quantity,
      type,
      createdBy
    )
    return await stockInstance.save()
  }
}
