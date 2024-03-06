import {
  StatusEnum,
  PricesResponse,
  PricePaginationInput,
  PriceResponse,
  CreatePriceInput,
  UpdatePriceInput,
  Price,
  Product,
  PriceList
} from '@/graphql/graphql_types'
import { ContextGraphQl } from '@/interfaces/context.interface'
import { errorHandler } from '@/lib/graphqlerrors'
import { priceCore, priceListCore, productCore } from '@/services/index'

// ========================================== Mutations ====================================================
const getPricesPaginated = async (
  _: any,
  args: { pricePaginationInput: PricePaginationInput }
): Promise<PricesResponse> => {
  try {
    const { pricePaginationInput } = args
    return await priceCore.getPricesPaginated(pricePaginationInput)
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}
const getPriceById = async (
  _: any,
  args: { id: objectId }
): Promise<PriceResponse> => {
  try {
    const { id } = args
    const priceInstance = await priceCore.getPriceById(id)
    return {
      status: StatusEnum.OK,
      message: 'Precio encontrado',
      data: priceInstance
    }
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}
// ========================================== Mutations ====================================================
const createPrice = async (
  _: any,
  args: { createPriceInput: CreatePriceInput },
  context: ContextGraphQl
): Promise<PriceResponse> => {
  try {
    const { createPriceInput } = args
    const priceInstance = await priceCore.createPrice(
      createPriceInput,
      context.req.currentUser?.id
    )
    return {
      status: StatusEnum.OK,
      message: 'Precio creado correctamente',
      data: priceInstance
    }
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}
const updatePrice = async (
  _: any,
  args: { updatePriceInput: UpdatePriceInput }
): Promise<PriceResponse> => {
  try {
    const { updatePriceInput } = args
    const priceInstance = await priceCore.updatePrice(updatePriceInput)
    return {
      status: StatusEnum.OK,
      message: 'Precio actualizado correcatmente',
      data: priceInstance
    }
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}
const deletePrice = async (
  _: any,
  args: { id: objectId },
  context: ContextGraphQl
): Promise<PriceResponse> => {
  try {
    const { id } = args
    const priceInstance = await priceCore.deletePrice(
      id,
      context.req.currentUser?.id
    )
    return {
      status: StatusEnum.OK,
      message: 'Precio eliminado correctamente',
      data: priceInstance
    }
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}

export const priceQuery = {
  getPricesPaginated,
  getPriceById
}
export const priceMutation = {
  createPrice,
  updatePrice,
  deletePrice
}

export const priceType = {
  Price: {
    async product(parent: Price, _: any, __: any): Promise<Product | null> {
      if (parent.productId) {
        const product = await productCore.getProductByIdInstance(
          parent.productId
        )
        return product
      }
      return null
    },
    async priceList(parent: Price, _: any, __: any): Promise<PriceList | null> {
      if (parent.priceListId) {
        const priceList = await priceListCore.getPriceListByIdInstance(
          parent.priceListId
        )
        return priceList
      }
      return null
    }
  }
}
