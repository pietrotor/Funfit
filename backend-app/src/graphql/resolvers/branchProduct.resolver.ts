import {
  StatusEnum,
  PaginationInput,
  BranchProductsResponse,
  BranchProductResponse,
  CreateBranchProductInput,
  UpdateBranchProductInput,
  BranchProduct,
  Product,
  Branch,
  CreateBranchProductStockMovementInput,
  BranchProductStockResponse
} from '@/graphql/graphql_types'
import { ContextGraphQl } from '@/interfaces/context.interface'
import { errorHandler } from '@/lib/graphqlerrors'
import { branchCore, branchProductCore, productCore } from '@/services/index'

// ========================================== Queries ====================================================
const getBranchProductsPaginated = async (
  _: any,
  args: {
    paginationInput: PaginationInput
    branchId: objectId
    posMenu?: boolean | undefined | null
  }
): Promise<BranchProductsResponse> => {
  try {
    const { paginationInput, branchId, posMenu = false } = args
    return await branchProductCore.getBranchesProductsPaginated(
      paginationInput,
      branchId,
      Boolean(posMenu)
    )
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}
const getBranchProductById = async (
  _: any,
  args: { id: objectId }
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
const getBranchProductStock = async (
  _: any,
  args: { id: objectId }
): Promise<BranchProductStockResponse> => {
  try {
    const { id } = args
    const stock = await branchProductCore.getBranchProductStock(id)
    return {
      status: StatusEnum.OK,
      message: 'Stock encontrado',
      data: stock
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

const createBranchProductStockMovement = async (
  _: any,
  args: {
    createBranchProductStockMovementInput: CreateBranchProductStockMovementInput
  },
  context: ContextGraphQl
): Promise<BranchProductResponse> => {
  try {
    const { createBranchProductStockMovementInput } = args
    const branchProductInstance =
      await branchProductCore.createBranchProductStockMovement(
        createBranchProductStockMovementInput,
        context.req.currentUser?.id
      )
    return {
      status: StatusEnum.OK,
      message: 'Producto actualizado su stock Correctamente',
      data: branchProductInstance
    }
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}

export const branchProductQuery = {
  getBranchProductsPaginated,
  getBranchProductById,
  getBranchProductStock
}
export const branchProductMutation = {
  createBranchProduct,
  updateBranchProduct,
  deleteBranchProduct,
  createBranchProductStockMovement
}

export const branchProductType = {
  BranchProduct: {
    async product(
      parent: BranchProduct,
      _: any,
      __: any
    ): Promise<Product | null> {
      if (parent.productId && !parent.product) {
        const product = await productCore.getProductByIdInstance(
          parent.productId
        )
        return product
      }
      return parent.product || null
    },
    async branch(
      parent: BranchProduct,
      _: any,
      __: any
    ): Promise<Branch | null> {
      if (parent.branchId) {
        const branch = await branchCore.getBranchByIdInstance(parent.branchId)
        return branch
      }
      return null
    }
  }
}
