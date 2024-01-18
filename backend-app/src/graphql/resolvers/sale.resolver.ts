import {
  StatusEnum,
  CreateSaleInput,
  SaleResponse
} from '@/graphql/graphql_types'
import { errorHandler } from '@/lib/graphqlerrors'
import { saleCore } from '@/services/index'

// ========================================== Queries ====================================================

// ========================================== Mutations ====================================================
const createSale = async (
  _: any,
  args: { createSaleInput: CreateSaleInput }
): Promise<SaleResponse> => {
  try {
    const { createSaleInput } = args
    const configurationInstance = await saleCore.createSale(createSaleInput)
    return {
      status: StatusEnum.OK,
      message: 'Venta creada correactamente',
      data: configurationInstance
    }
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}

export const saleQuery = {}
export const saleMutation = {
  createSale
}

export const saleType = {}
