import { WarehouseRepository } from '@/repositories/index'
import { IWarehouse } from '../models'
import Warehouse, { IModelWarehouse } from '@/models/warehouse.model'
import { BadRequestError } from '@/lib/graphqlerrors'
import {
  CreateWarehouseInput,
  PaginationInput,
  UpdateWarehouseInput
} from '@/graphql/graphql_types'
import { getInstancesPagination } from './generic.service'
import { updateGenericInstance } from '@/lib/updateInstance'

export class WarehouseService extends WarehouseRepository<objectId> {
  async getWarehousesPaginated(paginationInput: PaginationInput) {
    const { filter } = paginationInput
    if (filter) {
      const filterArgs = {
        $or: [
          { name: { $regex: filter, $options: 'i' } },
          { code: { $regex: filter, $options: 'i' } }
        ]
      }
      return await getInstancesPagination<IWarehouse, IModelWarehouse>(
        Warehouse,
        paginationInput,
        filterArgs
      )
    }
    return await getInstancesPagination<IWarehouse, IModelWarehouse>(
      Warehouse,
      paginationInput
    )
  }

  async getWarehousesOfProduct(
    paginationInput: PaginationInput,
    productId: objectId
  ) {
    const { filter } = paginationInput
    const productFilter = {
      productsIds: {
        $in: [productId]
      }
    }
    if (filter) {
      const filterArgs = {
        $or: [
          { name: { $regex: filter, $options: 'i' } },
          { code: { $regex: filter, $options: 'i' } }
        ]
      }
      return await getInstancesPagination<IWarehouse, IModelWarehouse>(
        Warehouse,
        paginationInput,
        { ...filterArgs, ...productFilter }
      )
    }
    return await getInstancesPagination<IWarehouse, IModelWarehouse>(
      Warehouse,
      paginationInput,
      productFilter
    )
  }

  async getWarehouseById(id: objectId) {
    const warehouseInstance = await Warehouse.findOne({
      _id: id,
      deleted: false
    })
    if (!warehouseInstance) throw new BadRequestError('No existe el almacen')
    return warehouseInstance
  }

  async getWarehouseByIdInstance(id: objectId) {
    return await Warehouse.findOne({
      _id: id,
      deleted: false
    })
  }

  async creatWarehouse(createWarehouseInput: CreateWarehouseInput) {
    const warehouseInstance = new Warehouse(createWarehouseInput)
    return await warehouseInstance.save()
  }

  async updateWarehouse(updateWarehouseInput: UpdateWarehouseInput) {
    const warehouseInstance = await this.getWarehouseById(
      updateWarehouseInput.id
    )
    updateGenericInstance(warehouseInstance, updateWarehouseInput, [])
    return await warehouseInstance.save()
  }

  async deleteWarehouse(id: objectId, deletedBy?: objectId) {
    const warehouseInstance = await this.getWarehouseById(id)
    warehouseInstance.deleted = true
    warehouseInstance.deletedBy = deletedBy
    warehouseInstance.deletedAt = new Date()
    return await warehouseInstance.save()
  }
}
