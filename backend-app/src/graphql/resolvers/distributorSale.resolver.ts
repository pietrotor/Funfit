import {
  StatusEnum,
  DistributorSaleProductsResponse,
  DistributorSaleResponse,
  DistributorSalePaginationInput,
  DistributorSalesResponse,
  CreateDistributorSaleInput,
  DistributorSale,
  Warehouse,
  PriceList,
  User,
  DistributorSaleItem,
  Product,
  DistributorSaleProduct,
  Distributor,
  DistributorsSalesSummaryResponse
} from '@/graphql/graphql_types'
import { ContextGraphQl } from '@/interfaces/context.interface'
import { errorHandler } from '@/lib/graphqlerrors'
import {
  distributorCore,
  distributorSaleCore,
  priceListCore,
  productCore,
  userCore,
  warehouseCore
} from '@/services/index'

// ========================================== Queries ====================================================
const getDistributorSaleProducts = async (
  _: any,
  args: { warehouseId: objectId; priceListId: objectId },
  context: ContextGraphQl
): Promise<DistributorSaleProductsResponse> => {
  try {
    const { priceListId, warehouseId } = args
    const data = await distributorSaleCore.getDistributorSalesProducts(
      warehouseId,
      priceListId
    )
    return {
      status: StatusEnum.OK,
      message: 'Productos para distribuidor encontrados',
      data
    }
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}
const getDistributorSalesPaginated = async (
  _: any,
  args: { distributorSalePaginationInput: DistributorSalePaginationInput },
  context: ContextGraphQl
): Promise<DistributorSalesResponse> => {
  try {
    const { distributorSalePaginationInput } = args
    return await distributorSaleCore.getDistributorSalesPaginated(
      distributorSalePaginationInput
    )
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}
const getDistributorSale = async (
  _: any,
  args: { id: objectId },
  context: ContextGraphQl
): Promise<DistributorSaleResponse> => {
  try {
    const { id } = args
    const distributor = await distributorSaleCore.getDistributorSaleById(id)
    return {
      status: StatusEnum.OK,
      message: 'Distribuidor encontrado',
      data: distributor
    }
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}
const getDistributorsSalesSummary = async (
  _: any,
  args: { distributorSalePaginationInput: DistributorSalePaginationInput },
  context: ContextGraphQl
): Promise<DistributorsSalesSummaryResponse> => {
  try {
    const { distributorSalePaginationInput } = args
    const distributor = await distributorSaleCore.getTotalSaled(
      distributorSalePaginationInput
    )
    return {
      status: StatusEnum.OK,
      message: 'Distribuidor encontrado',
      data: distributor
    }
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}
// ========================================== Mutations ====================================================
const createDistributorSale = async (
  _: any,
  args: { createDistributorSaleInput: CreateDistributorSaleInput },
  context: ContextGraphQl
): Promise<DistributorSaleResponse> => {
  try {
    const { createDistributorSaleInput } = args
    const distributorSaleInstance =
      await distributorSaleCore.createDistributorSale(
        createDistributorSaleInput,
        context.req.currentUser?.id
      )
    return {
      status: StatusEnum.OK,
      message: 'Distribuidor creado correctamente',
      data: distributorSaleInstance
    }
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}

export const distributorSaleQuery = {
  getDistributorSaleProducts,
  getDistributorSalesPaginated,
  getDistributorSale,
  getDistributorsSalesSummary
}
export const distributorSaleMutation = {
  createDistributorSale
}

export const distributorSaleType = {
  DistributorSale: {
    async warehouse(
      parent: DistributorSale,
      _: any,
      __: any
    ): Promise<Warehouse | null> {
      if (parent.warehouseId) {
        const warehouse = await warehouseCore.getWarehouseByIdInstance(
          parent.warehouseId
        )
        return warehouse
      }
      return null
    },
    async distributor(
      parent: DistributorSale,
      _: any,
      __: any
    ): Promise<Distributor | null> {
      if (parent.distributorId) {
        const distributor = await distributorCore.getDistributorByIdInstance(
          parent.distributorId
        )
        return distributor
      }
      return null
    },
    async priceList(
      parent: DistributorSale,
      _: any,
      __: any
    ): Promise<PriceList | null> {
      if (parent.priceListId) {
        const priceList = await priceListCore.getPriceListByIdInstance(
          parent.priceListId
        )
        return priceList
      }
      return null
    },
    async createdByInfo(
      parent: DistributorSale,
      _: any,
      __: any
    ): Promise<User | null> {
      if (parent.createdBy) {
        const user = await userCore.getUserByIdInstance(parent.createdBy)
        return user
      }
      return null
    }
  },
  DistributorSaleItem: {
    async product(
      parent: DistributorSaleItem,
      _: any,
      __: any
    ): Promise<Product | null> {
      console.log('--- PRODUCTO --, ', parent.productId)
      if (parent.productId) {
        const product = await productCore.getProductByIdInstance(
          parent.productId
        )
        return product
      }
      return null
    }
  },
  DistributorSaleProduct: {
    async product(
      parent: DistributorSaleProduct,
      _: any,
      __: any
    ): Promise<Product | null> {
      if (parent.productId) {
        const product = await productCore.getProductByIdInstance(
          parent.productId
        )
        return product
      }
      return null
    }
  }
}
