import {
  CancelSaleInput,
  CreateDistributorSaleInput,
  DistributorSalePaginationInput,
  Sale
} from '@/graphql/graphql_types'
import { OutErrorResponse } from '@/lib/graphqlerrors/custom.error'
import { IDistributorSale } from '../models'
import { IPaginatedResponse } from '@/interfaces/generic.interface'

export abstract class DistributorSaleRepository<T> {
  abstract getDistributorSaleById(
    id: T
  ): Promise<IDistributorSale | OutErrorResponse>

  abstract getDistributorSaleByIdInstance(
    id: T
  ): Promise<IDistributorSale | null>

  abstract getDistributorSalesPaginated(
    distributorSalePaginationInput: DistributorSalePaginationInput
  ): Promise<IPaginatedResponse<IDistributorSale[]> | OutErrorResponse>

  abstract createDistributorSale(
    createSaleInput: CreateDistributorSaleInput
  ): Promise<Sale | OutErrorResponse>

  abstract cancelDistributorSale(
    cancelSaleInput: CancelSaleInput
  ): Promise<Sale | OutErrorResponse>
}
