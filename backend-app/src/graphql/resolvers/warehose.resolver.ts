import { CreateWarehouseInput, PaginationInput, StatusEnum, UpdateWarehouseInput, WarehouseResponse, WarehousesResponse } from '@/graphql/graphql_types'
import { errorHandler } from '@/lib/graphqlerrors'
import { warehouseCore } from '@/services/index'

// ========================================== Mutations ====================================================
const getWarehouses = async (
  _: any,
  args: { paginationInput: PaginationInput }
): Promise<WarehousesResponse> => {
  try {
    const { paginationInput } = args
    return await warehouseCore.getWarehousesPaginated(paginationInput)
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}
const getWarehouseById = async (
  _: any,
  args: { id: objectId }
): Promise<WarehouseResponse> => {
  try {
    const { id } = args
    const warehouseInstance = await warehouseCore.getWarehouseById(id)
    return {
      status: StatusEnum.OK,
      message: 'Almacen encontrado',
      data: warehouseInstance
    }
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}

// ========================================== Mutations ====================================================
const createWarehouse = async (
  _: any,
  args: { createWarehouseInput: CreateWarehouseInput }
): Promise<WarehouseResponse> => {
  try {
    const { createWarehouseInput } = args
    const warehouseInstance = await warehouseCore.creatWarehouse(createWarehouseInput)
    return {
      status: StatusEnum.OK,
      message: 'Almacen creado correctamente',
      data: warehouseInstance
    }
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}
const updateWarehouse = async (
  _: any,
  args: { updateWarehouseInput: UpdateWarehouseInput }
): Promise<WarehouseResponse> => {
  try {
    const { updateWarehouseInput } = args
    const warehouseInstance = await warehouseCore.updateWarehouse(updateWarehouseInput)
    return {
      status: StatusEnum.OK,
      message: 'Almacen actualizado correctamente',
      data: warehouseInstance
    }
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}
export const warehouseQuery = {
  getWarehouses,
  getWarehouseById
}
export const warehouseMutation = {
  createWarehouse,
  updateWarehouse
}

export const warehouseType = {}
