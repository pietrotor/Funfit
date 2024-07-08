import {
  BranchProductCategorized,
  CreateBranchProductInput,
  CreateBranchProductStockMovementInput,
  PaginationInput,
  UpdateBranchProductInput
} from '@/graphql/graphql_types'
import { IPaginatedResponse } from '@/interfaces/generic.interface'
import { OutErrorResponse } from '@/lib/graphqlerrors/custom.error'

import { IBranchProduct } from '@/models/index'

export abstract class BranchProductRepository<T> {
  abstract getBranchesProductsPaginated(
    paginationInput: PaginationInput,
    branchId: T,
    posMenu: boolean
  ): Promise<IPaginatedResponse<IBranchProduct[]> | OutErrorResponse>

  abstract getBranchProductsByCategory(
    branchId: T
  ): Promise<BranchProductCategorized[] | OutErrorResponse>

  abstract getBranchProductById(
    id: T
  ): Promise<IBranchProduct | OutErrorResponse>

  abstract getBranchProductByIdInstance(id: T): Promise<IBranchProduct | null>

  abstract getBranchProudctByProudctAndBranchId(
    productId: T,
    branchId: T
  ): Promise<IBranchProduct | null>

  abstract getBranchProductStock(id: T): Promise<number | null>

  abstract createBranchProduct(
    createBranchProductInput: CreateBranchProductInput,
    createdBy?: T | null
  ): Promise<IBranchProduct | OutErrorResponse>

  abstract updateBranchProduct(
    updateBranchProductInput: UpdateBranchProductInput
  ): Promise<IBranchProduct | OutErrorResponse>

  abstract deleteBranchProdcut(
    id: T,
    deletedBy?: T | null
  ): Promise<IBranchProduct | OutErrorResponse>

  abstract createBranchProductStockMovement(
    createBranchProductStockMovementInput: CreateBranchProductStockMovementInput,
    createdBy?: objectId
  ): Promise<IBranchProduct | OutErrorResponse>
}
