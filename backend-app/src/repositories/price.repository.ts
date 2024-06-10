import {
  CreatePriceInput,
  CreatePriceListInput,
  PaginationInput,
  PricePaginationInput,
  UpdatePriceInput,
  UpdatePriceListInput
} from '@/graphql/graphql_types'
import { IPaginatedResponse } from '@/interfaces/generic.interface'
import { OutErrorResponse } from '@/lib/graphqlerrors/custom.error'
import { IPrice } from '../models'

export default abstract class PriceRepository<T> {
  abstract getPricesPaginated(
    pricePaginationInput: PricePaginationInput
  ): Promise<IPaginatedResponse<IPrice[]> | OutErrorResponse>

  abstract getPriceById(id: T): Promise<IPrice | OutErrorResponse>
  abstract getPriceByIdInstance(id: T): Promise<IPrice | null>

  abstract createPrice(
    createPriceInput: CreatePriceInput,
    createdBy?: T | null
  ): Promise<IPrice | OutErrorResponse>

  abstract updatePrice(
    UpdatePriceInput: UpdatePriceInput
  ): Promise<IPrice | OutErrorResponse>

  abstract deletePrice(
    id: T,
    deletedBy?: T | null
  ): Promise<IPrice | OutErrorResponse>
}
