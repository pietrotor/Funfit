import { UpdateConfigurationInput } from '@/graphql/graphql_types'
import { OutErrorResponse } from '@/lib/graphqlerrors/custom.error'
import { IConfiguration } from '@/models/configuration.model'
import { IOrder } from '../models'
import { IPaginatedResponse } from '@/interfaces/generic.interface'

export abstract class OrderRepository<T> {
  abstract getOrderById(id: T): Promise<IOrder | OutErrorResponse>
  abstract getOrderByIdInstance(id: T): Promise<IOrder | null>

  // abstract getUsersPaginated(
  //   paginationInput: PaginationInput
  // ): Promise<IPaginatedResponse<IOrder[]> | OutErrorResponse>

  abstract createOrder(
    updateConfigurationInput: UpdateConfigurationInput
  ): Promise<IConfiguration | OutErrorResponse>
}
