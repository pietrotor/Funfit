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
  User,
  SalesSummaryResponse,
  SalesSummaryInput,
  CancelSaleInput,
  BusinessBalanceResponse
} from '@/graphql/graphql_types'
import { ContextGraphQl } from '@/interfaces/context.interface'
import { errorHandler } from '@/lib/graphqlerrors'
import {
  branchCore,
  configurationCore,
  productCore,
  saleCore,
  userCore
} from '@/services/index'

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
const getSalesSummary = async (
  _: any,
  args: { salesSummaryInput: SalesSummaryInput }
): Promise<SalesSummaryResponse> => {
  try {
    const { salesSummaryInput } = args
    const [paymentMethods, total] = await Promise.all([
      saleCore.getSummaryByPaymentMethod(salesSummaryInput),
      saleCore.getTotalSales(salesSummaryInput)
    ])
    return {
      status: StatusEnum.OK,
      message: 'Resumen de ventas generado',
      data: {
        paymentMethods,
        total
      }
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
    console.time('salesPagination')
    const resopnse = await saleCore.getSalesPaginated(salesPaginationInput)
    console.timeEnd('salesPagination')
    return resopnse
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}
const getBusinessBalance = async (
  _: any,
  args: { endDate: Date; initialDate: Date }
): Promise<BusinessBalanceResponse> => {
  try {
    const { endDate, initialDate } = args
    const resopnse = await configurationCore.businessBalance({
      endDate,
      initialDate
    })
    return {
      status: StatusEnum.OK,
      message: 'Balance encontrado',
      data: resopnse
    }
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
const cancelSale = async (
  _: any,
  args: { cancelSaleInput: CancelSaleInput },
  context: ContextGraphQl
): Promise<SaleResponse> => {
  try {
    const { cancelSaleInput } = args
    const saleInstance = await saleCore.cancelSale(
      cancelSaleInput,
      context.req.currentUser?.id
    )
    return {
      status: StatusEnum.OK,
      message: 'Venta anulada',
      data: saleInstance
    }
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}

export const saleQuery = {
  getSaleById,
  getSalesSummary,
  getSalesPaginated,
  getBusinessBalance
}
export const saleMutation = {
  createSale,
  cancelSale
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
    },
    async canceledByInfo(parent: Sale, _: any, __: any): Promise<User | null> {
      if (parent.canceledBy) {
        const user = await userCore.getUserByIdInstance(parent.canceledBy)
        return user
      }
      return null
    }
  },
  SaleItem: {
    async product(parent: SaleItem, _: any, __: any): Promise<Product | null> {
      if (parent.productId) {
        const product = await productCore.getProductByIdSaleItemFieldResolver(
          parent.productId
        )
        return product
      }
      return null
    }
  }
}
