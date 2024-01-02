import {
  StatusEnum,
  PaginationInput,
  BranchProductsResponse,
  BranchProductResponse,
  CreateBranchProductInput,
  UpdateBranchProductInput,
  BranchProduct,
  Product,
  Branch
} from '@/graphql/graphql_types'
import { ContextGraphQl } from '@/interfaces/context.interface'
import { errorHandler } from '@/lib/graphqlerrors'
import { branchCore, branchProductCore, productCore } from '@/services/index'

// ========================================== Queries ====================================================
const getBranchProductsPaginated = async (
  _: any,
  args: { paginationInput: PaginationInput, branchId: objectId },
): Promise<BranchProductsResponse> => {
  try {
    const { paginationInput, branchId } = args
    return await branchProductCore.getBranchesProductsPaginated(paginationInput, branchId)
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}
const getBranchProductById = async (
  _: any,
  args: { id: objectId },
): Promise<BranchProductResponse> => {
  try {
    const { id } = args
    const branch = await branchProductCore.getBranchProductById(id)
    return {
      status: StatusEnum.OK,
      message: 'Producto encontrado',
      data: branch
    }
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}
// ========================================== Mutations ====================================================
const createBranchProduct = async (
  _: any,
  args: { createBranchProductInput: CreateBranchProductInput },
  context: ContextGraphQl
): Promise<BranchProductResponse> => {
  try {
    const { createBranchProductInput } = args
    const branchProductInstance = await branchProductCore.createBranchProduct(
      createBranchProductInput,
      context.req.currentUser?.id
    )
    return {
      status: StatusEnum.OK,
      message: 'Producto agregado en la sucursal correactamente',
      data: branchProductInstance
    }
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}
const updateBranchProduct = async (
  _: any,
  args: { updateBranchProductInput: UpdateBranchProductInput },
  context: ContextGraphQl
): Promise<BranchProductResponse> => {
  try {
    const { updateBranchProductInput } = args
    const branchProductInstance = await branchProductCore.updateBranchProduct(
      updateBranchProductInput
    )
    return {
      status: StatusEnum.OK,
      message: 'Producto actualizado correactamente',
      data: branchProductInstance
    }
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}
const deleteBranchProduct = async (
  _: any,
  args: { id: objectId },
  context: ContextGraphQl
): Promise<BranchProductResponse> => {
  try {
    const { id } = args
    const branchProductInstance = await branchProductCore.deleteBranchProdcut(
      id,
      context.req.currentUser?.id
    )
    return {
      status: StatusEnum.OK,
      message: 'Producto eliminado correactamente',
      data: branchProductInstance
    }
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}

export const branchProductQuery = {
  getBranchProductsPaginated,
  getBranchProductById
}
export const branchProductMutation = {
  createBranchProduct,
  updateBranchProduct,
  deleteBranchProduct
}

export const branchProductType = {
  BranchProduct: {
    async product(parent: BranchProduct, _: any, __: any): Promise<Product | null> {
      if (parent.productId) {
        const product = await productCore.getProductByIdInstance(parent.productId);
        return product;
      }
      return null;
    },
    async branch(parent: BranchProduct, _: any, __: any): Promise<Branch | null> {
      if (parent.branchId) {
        const branch = await branchCore.getBranchByIdInstance(parent.branchId);
        return branch;
      }
      return null;
    },
  }
}
