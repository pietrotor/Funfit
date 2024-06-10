import { CreateOrderInput, OrderPaginationInput } from '@/graphql/graphql_types'
import { OutErrorResponse } from '@/lib/graphqlerrors/custom.error'
import { IOrder } from '../models'
import { IPaginatedResponse } from '@/interfaces/generic.interface'

export abstract class OrderRepository<T> {
  abstract getOrderById(id: T): Promise<IOrder | OutErrorResponse>
  abstract getOrderByIdInstance(id: T): Promise<IOrder | null>

  abstract getOrdersPaginated(
    orderPaginationInput: OrderPaginationInput
  ): Promise<IPaginatedResponse<IOrder[]> | OutErrorResponse>

  abstract createOrder(
    createOrderInput: CreateOrderInput
  ): Promise<IOrder | OutErrorResponse>

  abstract acceptOrder(orderId: T): Promise<IOrder | OutErrorResponse>
  abstract deliverOrder(orderId: T): Promise<IOrder | OutErrorResponse>
  abstract rejectOrder(orderId: T): Promise<IOrder | OutErrorResponse>
}
