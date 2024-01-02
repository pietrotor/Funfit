import {
  StatusEnum,
  PaginationInput,
  BranchsResponse,
  BranchResponse,
  CreateBranchInput,
  UpdateBranchInput
} from '@/graphql/graphql_types'
import { ContextGraphQl } from '@/interfaces/context.interface'
import { errorHandler } from '@/lib/graphqlerrors'
import { branchCore } from '@/services/index'

// ========================================== Queries ====================================================
const getBranchesPaginated = async (
  _: any,
  args: { paginationInput: PaginationInput },
  context: ContextGraphQl
): Promise<BranchsResponse> => {
  try {
    const { paginationInput } = args
    return await branchCore.getBranchesPaginated(paginationInput)
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}
const getBranchById = async (
  _: any,
  args: { id: objectId },
  context: ContextGraphQl
): Promise<BranchResponse> => {
  try {
    const { id } = args
    const branch = await branchCore.getBranchById(id)
    return {
      status: StatusEnum.OK,
      message: 'Sucursal encontrada',
      data: branch
    }
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}
// ========================================== Mutations ====================================================
const createBranch = async (
  _: any,
  args: { createBranchInput: CreateBranchInput },
  context: ContextGraphQl
): Promise<BranchResponse> => {
  try {
    const { createBranchInput } = args
    const branchInstance = await branchCore.createBranch(
      createBranchInput,
      context.req.currentUser?.id
    )
    return {
      status: StatusEnum.OK,
      message: 'Sucursal creada correactamente',
      data: branchInstance
    }
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}
const updateBranch = async (
  _: any,
  args: { updateBranchInput: UpdateBranchInput },
  context: ContextGraphQl
): Promise<BranchResponse> => {
  try {
    const { updateBranchInput } = args
    const branchInstance = await branchCore.updateBranch(
      updateBranchInput
    )
    return {
      status: StatusEnum.OK,
      message: 'Sucursal actualizada correactamente',
      data: branchInstance
    }
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}
const deleteBranch = async (
  _: any,
  args: { id: objectId },
  context: ContextGraphQl
): Promise<BranchResponse> => {
  try {
    const { id } = args
    const branchInstance = await branchCore.deleteBranch(
      id,
      context.req.currentUser?.id
    )
    return {
      status: StatusEnum.OK,
      message: 'Sucursal eliminada correactamente',
      data: branchInstance
    }
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}

export const branchQuery = {
  getBranchesPaginated,
  getBranchById
}
export const branchMutation = {
  createBranch,
  updateBranch,
  deleteBranch
}

export const branchType = {

}
