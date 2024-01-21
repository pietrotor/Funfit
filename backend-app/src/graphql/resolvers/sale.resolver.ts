import {
  StatusEnum,
  CreateSaleInput,
  SaleResponse,
  SalesPaginationInput,
  SalesResponse,
  Product,
  SaleItem,
  Sale,
  Branch,
  User
} from '@/graphql/graphql_types'
import { ContextGraphQl } from '@/interfaces/context.interface'
import { errorHandler } from '@/lib/graphqlerrors'
import { branchCore, productCore, saleCore, userCore } from '@/services/index'

// ========================================== Queries ====================================================
const getSaleById = async (
  _: any,
  args: { id: objectId }
): Promise<SaleResponse> => {
  try {
    const { id } = args
    const saleInstance = await saleCore.getSaleById(id)
    return {
      status: StatusEnum.OK,
      message: 'Venta encontrada',
      data: saleInstance
    }
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}
const getSalesPaginated = async (
  _: any,
  args: { salesPaginationInput: SalesPaginationInput }
): Promise<SalesResponse> => {
  try {
    const { salesPaginationInput } = args
    return await saleCore.getSalesPaginated(salesPaginationInput)
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}
// ========================================== Mutations ====================================================
const createSale = async (
  _: any,
  args: { createSaleInput: CreateSaleInput },
  context: ContextGraphQl
): Promise<SaleResponse> => {
  try {
    const { createSaleInput } = args
    const saleInstance = await saleCore.createSale(
      createSaleInput,
      context.req.currentUser?.id
    )
    return {
      status: StatusEnum.OK,
      message: 'Venta creada correactamente',
      data: saleInstance
    }
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}

export const saleQuery = {
  getSaleById,
  getSalesPaginated
}
export const saleMutation = {
  createSale
}

export const saleType = {
  Sale: {
    async branch(parent: Sale, _: any, __: any): Promise<Branch | null> {
      if (parent.branchId) {
        const branch = await branchCore.getBranchByIdInstance(parent.branchId)
        return branch
      }
      return null
    },
    async createdByInfo(parent: Sale, _: any, __: any): Promise<User | null> {
      if (parent.createdBy) {
        const user = await userCore.getUserByIdInstance(parent.createdBy)
        return user
      }
      return null
    }
  },
  SaleItem: {
    async product(parent: SaleItem, _: any, __: any): Promise<Product | null> {
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
