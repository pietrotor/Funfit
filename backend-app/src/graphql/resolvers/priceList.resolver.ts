import {
  StatusEnum,
  PaginationInput,
  PriceListsResponse,
  PriceListResponse,
  CreatePriceListInput,
  UpdatePriceListInput
} from '@/graphql/graphql_types'
import { ContextGraphQl } from '@/interfaces/context.interface'
import { errorHandler } from '@/lib/graphqlerrors'
import { priceListCore } from '@/services/index'

// ========================================== Mutations ====================================================
const getPriceListsPaginated = async (
  _: any,
  args: { paginationInput: PaginationInput }
): Promise<PriceListsResponse> => {
  try {
    const { paginationInput } = args
    return await priceListCore.getPriceListsPaginated(paginationInput)
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}
const getPriceListById = async (
  _: any,
  args: { id: objectId }
): Promise<PriceListResponse> => {
  try {
    const { id } = args
    const priceListInstance = await priceListCore.getPriceListById(id)
    return {
      status: StatusEnum.OK,
      message: 'Lista de precios encontrado',
      data: priceListInstance
    }
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}
// ========================================== Mutations ====================================================
const createPriceList = async (
  _: any,
  args: { createPriceListInput: CreatePriceListInput },
  context: ContextGraphQl
): Promise<PriceListResponse> => {
  try {
    const { createPriceListInput } = args
    const priceListInstance = await priceListCore.createPriceList(
      createPriceListInput,
      context.req.currentUser?.id
    )
    return {
      status: StatusEnum.OK,
      message: 'Lista de precios creado correctamente',
      data: priceListInstance
    }
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}
const updatePriceList = async (
  _: any,
  args: { updatePriceListInput: UpdatePriceListInput }
): Promise<PriceListResponse> => {
  try {
    const { updatePriceListInput } = args
    const priceListInstance = await priceListCore.updatePriceList(
      updatePriceListInput
    )
    return {
      status: StatusEnum.OK,
      message: 'Lista de precios actualizado correcatmente',
      data: priceListInstance
    }
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}
const deletePriceList = async (
  _: any,
  args: { id: objectId },
  context: ContextGraphQl
): Promise<PriceListResponse> => {
  try {
    const { id } = args
    const priceListInstance = await priceListCore.deletePriceList(
      id,
      context.req.currentUser?.id
    )
    return {
      status: StatusEnum.OK,
      message: 'Lista de precios eliminado correcatmente',
      data: priceListInstance
    }
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}

export const priceListQuery = {
  getPriceListById,
  getPriceListsPaginated
}
export const priceListMutation = {
  createPriceList,
  updatePriceList,
  deletePriceList
}

export const priceListType = {}
