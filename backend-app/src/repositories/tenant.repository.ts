import { CreateTenantInput, PaginationInput, UpdateTenantInput } from '@/graphql/graphql_types'
import { IPaginatedResponse } from '@/interfaces/generic.interface'
import { OutErrorResponse } from '@/lib/graphqlerrors/custom.error'
import { ITenant } from '@/models/tenant.model'

export default abstract class TenantRepository<T> {
  abstract getTenantById(id: T, businessId: T): Promise<ITenant | OutErrorResponse>
  abstract getTenantsPaginated(paginationInput: PaginationInput): Promise<IPaginatedResponse<T> | OutErrorResponse>
  abstract createTenant(createTenantInput: CreateTenantInput, createdBy?: T): Promise<ITenant | OutErrorResponse>
  abstract updateTenant(updateTenantInput: UpdateTenantInput): Promise<ITenant | OutErrorResponse>
  abstract deleteTenant(id: T, busienssId: T, deletedBy?: T): Promise<ITenant | OutErrorResponse>
}
