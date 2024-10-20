import {
  CreateBranchInput,
  PaginationInput,
  UpdateBranchInput
} from '@/graphql/graphql_types'
import { IPaginatedResponse } from '@/interfaces/generic.interface'
import { OutErrorResponse } from '@/lib/graphqlerrors/custom.error'

import { IBranch } from '@/models/index'

export abstract class BranchRepository<T> {
  abstract getDefaultBranch(): Promise<IBranch | null>

  abstract getBranchesPaginated(
    paginationInput: PaginationInput
  ): Promise<IPaginatedResponse<IBranch[]> | OutErrorResponse>

  abstract getBranchById(id: T): Promise<IBranch | OutErrorResponse>

  abstract getBranchByIdInstance(id: T): Promise<IBranch | null>

  abstract createBranch(
    createBranchInput: CreateBranchInput,
    createdBy?: T | null
  ): Promise<IBranch | OutErrorResponse>

  abstract updateBranch(
    updateBranchInput: UpdateBranchInput
  ): Promise<IBranch | OutErrorResponse>

  abstract deleteBranch(
    id: T,
    deletedBy?: T | null
  ): Promise<IBranch | OutErrorResponse>
}
