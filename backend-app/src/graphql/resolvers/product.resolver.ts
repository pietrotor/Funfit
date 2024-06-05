import {
  StatusEnum,
  PaginationInput,
  ProductsResponse,
  ProductResponse,
  CreateProductInput,
  UpdateProductInput,
  Product,
  Category,
  BranchProductsResponse,
  FileInput,
  ProductImageResponse
} from '@/graphql/graphql_types'
import { ContextGraphQl } from '@/interfaces/context.interface'
import { errorHandler } from '@/lib/graphqlerrors'
import { branchProductCore, categoryCore, productCore } from '@/services/index'
import { uploadFileToS3Bucket } from 'helpers/upload-files'

// ========================================== Mutations ====================================================
const getPublicProducts = async (
  _: any,
  args: { paginationInput: PaginationInput; branchId: objectId }
): Promise<BranchProductsResponse> => {
  try {
    const { paginationInput, branchId } = args
    return await branchProductCore.getBranchesProductsPaginated(
      paginationInput,
      branchId
    )
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}
const getProducts = async (
  _: any,
  args: { paginationInput: PaginationInput }
): Promise<ProductsResponse> => {
  try {
    const { paginationInput } = args
    return await productCore.getProductsPaginated(paginationInput)
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}
const getProductById = async (
  _: any,
  args: { id: objectId }
): Promise<ProductResponse> => {
  try {
    const { id } = args
    const product = await productCore.getProductById(id)
    return {
      status: StatusEnum.OK,
      message: 'Producto encontrado',
      data: product
    }
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}
const getProductsOutOfWarehouse = async (
  _: any,
  args: { paginationInput: PaginationInput; warehouseId: objectId }
): Promise<ProductsResponse> => {
  try {
    const { paginationInput, warehouseId } = args
    return await productCore.getProductsOutWarehouse(
      paginationInput,
      warehouseId
    )
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}
const getProductsOutOfPriceList = async (
  _: any,
  args: { paginationInput: PaginationInput; priceListId: objectId }
): Promise<ProductsResponse> => {
  try {
    const { paginationInput, priceListId } = args
    return await productCore.getProductsOutOfPriceList(
      paginationInput,
      priceListId
    )
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}
// ========================================== Mutations ====================================================
const createProduct = async (
  _: any,
  args: { createProductInput: CreateProductInput },
  context: ContextGraphQl
): Promise<ProductResponse> => {
  try {
    const { createProductInput } = args
    const product = await productCore.createProducto(
      createProductInput,
      context.req.currentUser?.id
    )
    return {
      status: StatusEnum.OK,
      message: 'Producto creado correctamente',
      data: product
    }
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}
const updateProduct = async (
  _: any,
  args: { updateProductInput: UpdateProductInput }
): Promise<ProductResponse> => {
  try {
    const { updateProductInput } = args
    const product = await productCore.updateProduct(updateProductInput)
    return {
      status: StatusEnum.OK,
      message: 'Producto actualizado correcatmente',
      data: product
    }
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}
const deleteProduct = async (
  _: any,
  args: { id: objectId },
  context: ContextGraphQl
): Promise<ProductResponse> => {
  try {
    const { id } = args
    const product = await productCore.deleteProduct(
      id,
      context.req.currentUser?.id
    )
    return {
      status: StatusEnum.OK,
      message: 'Producto eliminado correcatmente',
      data: product
    }
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}
const uploadFile = async (
  _: any,
  args: { fileInput: FileInput; productId: objectId },
  context: ContextGraphQl
): Promise<ProductImageResponse> => {
  try {
    const {
      fileInput: { file, productId }
    } = args

    const { createReadStream, mimetype } = await file

    const extension = mimetype.split('/')?.[1]

    const stream = createReadStream()

    const url = await uploadFileToS3Bucket({
      file: stream,
      folder: 'products/',
      contenType: mimetype,
      extension
    })

    await productCore.updateProduct({
      id: productId,
      image: url
    })

    return {
      status: StatusEnum.OK,
      message: 'Imagen de producto actualizada',
      data: url
    }
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}

export const productQuery = {
  getProducts,
  getPublicProducts,
  getProductById,
  getProductsOutOfWarehouse,
  getProductsOutOfPriceList
}
export const productMutation = {
  createProduct,
  updateProduct,
  deleteProduct,
  uploadFile
}

export const productType = {
  Product: {
    async category(parent: Product, _: any, __: any): Promise<Category | null> {
      if (parent.categoryId) {
        const category = await categoryCore.getCategoryByIdInstance(
          parent.categoryId
        )
        return category
      }
      return null
    }
  }
}
