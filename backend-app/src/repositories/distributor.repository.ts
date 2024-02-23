import {
  CreateCustomerInput,
  CreateDistributorInput,
  PaginationInput,
  UpdateDistributorInput
} from '@/graphql/graphql_types'
import { OutErrorResponse } from '@/lib/graphqlerrors/custom.error'
import { IDistributor } from '../models'
import { IPaginatedResponse } from '@/interfaces/generic.interface'

export abstract class DistributorRepository<T> {
  abstract getDistributorById(id: T): Promise<IDistributor | OutErrorResponse>
  abstract getDistributorByIdInstance(id: T): Promise<IDistributor | null>

  abstract updateDistributor(
    updateDistributorInput: UpdateDistributorInput
  ): Promise<IDistributor | OutErrorResponse>

  abstract getDistributorsPaginated(
    paginationInput: PaginationInput
  ): Promise<IPaginatedResponse<IDistributor[]> | OutErrorResponse>

  abstract createDistributor(
    createDistributorInput: CreateDistributorInput
  ): Promise<IDistributor | OutErrorResponse>
}
