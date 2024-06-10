import {
  StatusEnum,
  PaginationInput,
  DistributorResponse,
  DistributorsResponse,
  CreateDistributorInput,
  UpdateDistributorInput
} from '@/graphql/graphql_types'
import { ContextGraphQl } from '@/interfaces/context.interface'
import { errorHandler } from '@/lib/graphqlerrors'
import { distributorCore } from '@/services/index'

// ========================================== Queries ====================================================
const getDistributorsPaginated = async (
  _: any,
  args: { paginationInput: PaginationInput },
  context: ContextGraphQl
): Promise<DistributorsResponse> => {
  try {
    const { paginationInput } = args
    return await distributorCore.getDistributorsPaginated(paginationInput)
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}
const getDistributorById = async (
  _: any,
  args: { id: objectId },
  context: ContextGraphQl
): Promise<DistributorResponse> => {
  try {
    const { id } = args
    const distributor = await distributorCore.getDistributorById(id)
    return {
      status: StatusEnum.OK,
      message: 'Distribuidor encontrado',
      data: distributor
    }
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}
// ========================================== Mutations ====================================================
const createDistributor = async (
  _: any,
  args: { createDistributorInput: CreateDistributorInput },
  context: ContextGraphQl
): Promise<DistributorResponse> => {
  try {
    const { createDistributorInput } = args
    const branchInstance = await distributorCore.createDistributor(
      createDistributorInput,
      context.req.currentUser?.id
    )
    return {
      status: StatusEnum.OK,
      message: 'Distribuidor creado correctamente',
      data: branchInstance
    }
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}
const updateDistributor = async (
  _: any,
  args: { updateDistributorInput: UpdateDistributorInput },
  context: ContextGraphQl
): Promise<DistributorResponse> => {
  try {
    const { updateDistributorInput } = args
    const categoryInstance = await distributorCore.updateDistributor(
      updateDistributorInput
    )
    return {
      status: StatusEnum.OK,
      message: 'Distribuidor actualizado correactamente',
      data: categoryInstance
    }
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}
export const distributorQuery = {
  getDistributorById,
  getDistributorsPaginated
}
export const distributorMutation = {
  createDistributor,
  updateDistributor
}

export const distributorType = {}
