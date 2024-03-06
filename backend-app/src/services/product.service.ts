import {
  CreateProductInput,
  PaginationInput,
  UpdateProductInput
} from '@/graphql/graphql_types'
import ProductRepository from '@/repositories/product.repository'
import Product, { IModelProduct, IProduct } from '@/models/product.model'
import { getInstancesPagination } from './generic.service'
import { BadRequestError } from '@/lib/graphqlerrors'
import { updateGenericInstance } from '@/lib/updateInstance'
import { internalCodeGenerator } from '@/lib/codeGenerator'

export class ProductService extends ProductRepository<objectId> {
  async getProductsPaginated(paginationInput: PaginationInput) {
    const { filter } = paginationInput
    if (filter) {
      const filterArgs = {
        $or: [
          { name: { $regex: filter, $options: 'i' } },
          { code: { $regex: filter, $options: 'i' } }
        ]
      }
      return await getInstancesPagination<IProduct, IModelProduct>(
        Product,
        paginationInput,
        filterArgs
      )
    }
    return await getInstancesPagination<IProduct, IModelProduct>(
      Product,
      paginationInput
    )
  }

  async getProductById(id: objectId) {
    const productInstance = await Product.findOne({
      _id: id,
      deleted: false
    })
    if (!productInstance) {
      throw new BadRequestError('No se encontro el Producto')
    }
    return productInstance
  }

  async getProductByIdInstance(id: objectId) {
    return await Product.findOne({
      _id: id,
      deleted: false
    })
  }

  async getProductsOutWarehouse(
    paginationInput: PaginationInput,
    warehouseId: objectId
  ) {
    const warehouseFilter = {
      warehouses: {
        $nin: [warehouseId]
      }
    }
    const { filter } = paginationInput
    if (filter) {
      const filterArgs = {
        $or: [
          { name: { $regex: filter, $options: 'i' } },
          { code: { $regex: filter, $options: 'i' } }
        ]
      }
      return await getInstancesPagination<IProduct, IModelProduct>(
        Product,
        paginationInput,
        { ...filterArgs, ...warehouseFilter }
      )
    }
    return await getInstancesPagination<IProduct, IModelProduct>(
      Product,
      paginationInput,
      warehouseFilter
    )
  }

  async getProductsOutOfPriceList(
    paginationInput: PaginationInput,
    priceListId: objectId
  ) {
    const priceListFilter = {
      priceListsIds: {
        $nin: [priceListId]
      }
    }
    const { filter } = paginationInput
    if (filter) {
      const filterArgs = {
        $or: [
          { name: { $regex: filter, $options: 'i' } },
          { code: { $regex: filter, $options: 'i' } }
        ]
      }
      return await getInstancesPagination<IProduct, IModelProduct>(
        Product,
        paginationInput,
        { ...filterArgs, ...priceListFilter }
      )
    }
    return await getInstancesPagination<IProduct, IModelProduct>(
      Product,
      paginationInput,
      priceListFilter
    )
  }

  async createProducto(
    createProductInput: CreateProductInput,
    createdBy?: objectId | null
  ) {
    const { name, code } = createProductInput
    const [duplicatedProductName, duplicatedProductCode] = await Promise.all([
      Product.findOne({
        name,
        deleted: false
      }),
      Product.findOne({
        code,
        deleted: false
      })
    ])
    if (duplicatedProductName) {
      throw new BadRequestError(
        'Ya existe un producto registrado con el mismo nombre'
      )
    }
    if (duplicatedProductCode) {
      throw new BadRequestError(
        `El producto "${duplicatedProductCode.name}" ya esta registrado con este código`
      )
    }
    const internalCode = internalCodeGenerator(name)
    const productInstance = new Product({
      ...createProductInput,
      internalCode,
      createdBy
    })
    return await productInstance.save()
  }

  async updateProduct(updateProductInput: UpdateProductInput) {
    const { id, ...product } = updateProductInput
    const productInstance = await Product.findOne({
      _id: id,
      deleted: false
    })
    if (!productInstance) throw new BadRequestError('El producto no existe')
    const [duplicatedProductName, duplicatedProductCode] = await Promise.all([
      Product.findOne({
        name: product.name,
        deleted: false
      }),
      Product.findOne({
        code: product.code,
        deleted: false
      })
    ])
    if (duplicatedProductName) {
      throw new BadRequestError(
        'Ya existe un producto registrado con el mismo nombre'
      )
    }
    if (duplicatedProductCode) {
      throw new BadRequestError(
        `El producto "${duplicatedProductCode.name}" ya esta registrado con este código`
      )
    }
    updateGenericInstance(productInstance, product)
    return await productInstance.save()
  }

  async deleteProduct(id: objectId, deletedBy?: objectId | null) {
    const productInstance = await Product.findOne({
      _id: id,
      deleted: false
    })
    if (!productInstance) throw new BadRequestError('El producto no existe')
    productInstance.deleted = true
    productInstance.deletedBy = deletedBy || undefined
    return await productInstance.save()
  }
}
