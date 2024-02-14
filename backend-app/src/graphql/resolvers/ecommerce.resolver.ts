import {
  StatusEnum,
  CustomerResponse,
  CreateCustomerInput,
  CreateAddressInput,
  AddressResponse,
  CreateOrderInput,
  OrderResponse,
  Customer,
  Address
} from '@/graphql/graphql_types'
import { ContextGraphQl } from '@/interfaces/context.interface'
import { errorHandler } from '@/lib/graphqlerrors'
import { addressCore, customerCore, orderCore } from '@/services/index'

// ========================================== Queries ====================================================
const getPublicCustomerById = async (
  _: any,
  args: { id: objectId }
): Promise<CustomerResponse> => {
  try {
    const { id } = args
    const customerInstance = await customerCore.getCustomerById(id)
    return {
      status: StatusEnum.OK,
      message: 'Venta encontrada',
      data: customerInstance
    }
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}
// ========================================== Mutations ====================================================
const publicCreateCustomer = async (
  _: any,
  args: { createCustomerInput: CreateCustomerInput },
  context: ContextGraphQl
): Promise<CustomerResponse> => {
  try {
    const { createCustomerInput } = args
    const customerInstance = await customerCore.createCustomer(
      createCustomerInput
    )
    return {
      status: StatusEnum.OK,
      message: 'Cliente creado correactamente',
      data: customerInstance
    }
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}
const publicCreateAddress = async (
  _: any,
  args: { createAddressInput: CreateAddressInput },
  context: ContextGraphQl
): Promise<AddressResponse> => {
  try {
    const { createAddressInput } = args
    const addressInstance = await addressCore.createAddress(createAddressInput)
    return {
      status: StatusEnum.OK,
      message: 'Dirección creado correactamente',
      data: addressInstance
    }
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}
const publicCreateOrder = async (
  _: any,
  args: { createOrderInput: CreateOrderInput },
  context: ContextGraphQl
): Promise<OrderResponse> => {
  try {
    const { createOrderInput } = args
    const orderInstance = await orderCore.createOrder(createOrderInput)
    return {
      status: StatusEnum.OK,
      message: 'Pedido creado correactamente',
      data: orderInstance
    }
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}

export const ecommerceQuery = {
  getPublicCustomerById
}
export const ecommerceMutation = {
  publicCreateCustomer,
  publicCreateAddress,
  publicCreateOrder
}

export const ecommerceType = {
  Customer: {
    async addressInfo(
      parent: Customer,
      _: any,
      __: any
    ): Promise<Address[] | null> {
      if (parent.addressesIds) {
        const address = await Promise.all(
          parent.addressesIds.map(async addressId => {
            return await addressCore.getAddressByIdInstance(addressId)
          })
        )
        return address.filter(address => address) as any
      }
      return null
    }
  }
}
