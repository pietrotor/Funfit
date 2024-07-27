import {
  CreateComboInput,
  CreateProductInput,
  PaginationInput,
  ProductTypeEnum,
  UpdateComboInput,
  UpdateProductInput
} from '@/graphql/graphql_types'
import { IPaginatedResponse } from '@/interfaces/generic.interface'
import { OutErrorResponse } from '@/lib/graphqlerrors/custom.error'
import { IProduct } from '@/models/product.model'

export default abstract class ProductRepository<T> {
  abstract getProductsPaginated(
    paginationInput: PaginationInput,
    type: ProductTypeEnum
  ): Promise<IPaginatedResponse<IProduct[]> | OutErrorResponse>

  abstract getProductById(id: T): Promise<IProduct | OutErrorResponse>
  abstract getProductByIdInstance(id: T): Promise<IProduct | null>
  abstract getProductByIdSaleItemFieldResolver(id: T): Promise<IProduct | null>
  abstract getProductsAndSubProductsById(id: T): Promise<IProduct[]>
  abstract getProductsOutWarehouse(
    paginationInput: PaginationInput,
    warehouseId: T
  ): Promise<IPaginatedResponse<IProduct[]> | OutErrorResponse>

  abstract getProductsOutOfPriceList(
    paginationInput: PaginationInput,
    priceListId: T
  ): Promise<IPaginatedResponse<IProduct[]> | OutErrorResponse>

  abstract createProducto(
    createProductInput: CreateProductInput,
    createdBy?: T | null
  ): Promise<IProduct | OutErrorResponse>

  abstract createCombo(
    createComboInput: CreateComboInput,
    createdBy?: T | null
  ): Promise<IProduct | OutErrorResponse>

  abstract updateProduct(
    updateProductInput: UpdateProductInput
  ): Promise<IProduct | OutErrorResponse>

  abstract updateCombo(
    updateComboInput: UpdateComboInput
  ): Promise<IProduct | OutErrorResponse>

  abstract deleteProduct(
    id: T,
    deletedBy?: T | null
  ): Promise<IProduct | OutErrorResponse>
}
