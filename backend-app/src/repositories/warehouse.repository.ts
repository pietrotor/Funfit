import { CreateWarehouseInput, PaginationInput, UpdateWarehouseInput } from '@/graphql/graphql_types'
import { IPaginatedResponse } from '@/interfaces/generic.interface'
import { OutErrorResponse } from '@/lib/graphqlerrors/custom.error'
import { IWarehouse } from '@/models/index'

export abstract class WarehouseRepository<T> {
  abstract getWarehouseById(id: T): Promise<IWarehouse | OutErrorResponse>;
  abstract getWarehousesPaginated(
    paginationInput: PaginationInput
  ): Promise<IPaginatedResponse<IWarehouse[]> | OutErrorResponse>;

  abstract getWarehouseByIdInstance(id: T): Promise<IWarehouse | null>;
  abstract creatWarehouse(
    createWarehouseInput: CreateWarehouseInput
  ): Promise<IWarehouse | OutErrorResponse>;

  abstract updateWarehouse(
    createWarehouseInput: UpdateWarehouseInput
  ): Promise<IWarehouse | OutErrorResponse>;

  abstract deleteWarehouse(
    id: objectId, deletedBy?: objectId
  ): Promise<IWarehouse | OutErrorResponse>;
}
