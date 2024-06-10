import {
  CreatePriceListInput,
  PaginationInput,
  UpdatePriceListInput
} from '@/graphql/graphql_types'
import { IPaginatedResponse } from '@/interfaces/generic.interface'
import { OutErrorResponse } from '@/lib/graphqlerrors/custom.error'
import { IPriceList } from '../models'

export default abstract class PriceListRepository<T> {
  abstract getPriceListsPaginated(
    paginationInput: PaginationInput
  ): Promise<IPaginatedResponse<IPriceList[]> | OutErrorResponse>

  abstract getPriceListById(id: T): Promise<IPriceList | OutErrorResponse>
  abstract getPriceListByIdInstance(id: T): Promise<IPriceList | null>

  abstract createPriceList(
    createPriceListInput: CreatePriceListInput,
    createdBy?: T | null
  ): Promise<IPriceList | OutErrorResponse>

  abstract updatePriceList(
    updatePriceListInput: UpdatePriceListInput
  ): Promise<IPriceList | OutErrorResponse>

  abstract deletePriceList(
    id: T,
    deletedBy?: T | null
  ): Promise<IPriceList | OutErrorResponse>
}
