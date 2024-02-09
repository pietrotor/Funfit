import {
  StatusEnum,
  Customer,
  Address,
  OrderPaginationInput,
  OrdersResponse,
  Order,
  User,
  OrderResponse
} from '@/graphql/graphql_types'
import { ContextGraphQl } from '@/interfaces/context.interface'
import { errorHandler } from '@/lib/graphqlerrors'
import { addressCore, customerCore, orderCore, userCore } from '@/services/index'

// ========================================== Queries ====================================================
const getOrderById = async (
  _: any,
  args: { id: objectId }
): Promise<OrderResponse> => {
  try {
    const { id } = args
    const customerInstance = await orderCore.getOrderById(id)
    return {
      status: StatusEnum.OK,
      message: 'Pedido encontrada correctamente',
      data: customerInstance
    }
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}
const getOrdersPaginated = async (
  _: any,
  args: { orderPaginationInput: OrderPaginationInput },
  context: ContextGraphQl
): Promise<OrdersResponse> => {
  try {
    const { orderPaginationInput } = args
    return await orderCore.getOrdersPaginated(orderPaginationInput)
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}
// ========================================== Mutations ====================================================

export const orderQuery = {
  getOrdersPaginated,
  getOrderById
}
export const orderMutation = {
}

export const orderType = {
  Order: {
    async addressInfo(
      parent: Order,
      _: any,
      __: any
    ): Promise<Address | null> {
      if (parent.addressId) {
        return await addressCore.getAddressByIdInstance(parent.addressId)
      }
      return null
    },
    async customerInfo(
      parent: Order,
      _: any,
      __: any
    ): Promise<Customer | null> {
      if (parent.customerId) {
        return await customerCore.getCustomerByIdInstance(parent.customerId)
      }
      return null
    },
    async orderAceptedByInfo(
      parent: Order,
      _: any,
      __: any
    ): Promise<User | null> {
      if (parent.orderAceptedBy) {
        return await userCore.getUserByIdInstance(parent.orderAceptedBy)
      }
      return null
    },
    async rejectedByInfo(
      parent: Order,
      _: any,
      __: any
    ): Promise<User | null> {
      if (parent.rejectedBy) {
        return await userCore.getUserByIdInstance(parent.rejectedBy)
      }
      return null
    }
  }
}
