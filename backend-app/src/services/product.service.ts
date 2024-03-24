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
import Stock from '@/models/stock.model'
import { Branch, BranchProduct } from '../models'
import Warehouse from '@/models/warehouse.model'

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

  async getProductByIdSaleItemFieldResolver(id: objectId) {
    return await Product.findOne({
      _id: id
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
    productInstance.deletedAt = new Date()
    productInstance.deletedBy = deletedBy || undefined
    const stocksInstance = await Stock.find({
      deleted: false,
      productId: id
    })
    await Promise.all(
      stocksInstance.map(async stock => {
        stock.deleted = true
        stock.deletedAt = new Date()
        stock.deletedBy = deletedBy || undefined
        await stock.save()
      })
    )
    // ------ Branch Products
    const branchProdutsInstances = await BranchProduct.find({
      deleted: false,
      productId: id
    })
    await Promise.all(
      branchProdutsInstances.map(async branchProduct => {
        branchProduct.deleted = true
        branchProduct.deletedAt = new Date()
        branchProduct.deletedBy = deletedBy || undefined
        await branchProduct.save()
      })
    )
    // ------ Warehouses
    const warehousesInstances = await Warehouse.find({
      deleted: false,
      productsIds: {
        $in: [id]
      }
    })
    await Promise.all(
      warehousesInstances.map(async warehouse => {
        warehouse.productsIds = warehouse.productsIds.filter(
          productId => productId.toString() !== id.toString()
        )
        await warehouse.save()
      })
    )
    // ------ Branch
    const branchesInstances = await Branch.find({
      deleted: false,
      productsIds: {
        $in: [id]
      }
    })
    await Promise.all(
      branchesInstances.map(async branch => {
        branch.productsIds = branch.productsIds.filter(
          productId => productId.toString() !== id.toString()
        )
        await branch.save()
      })
    )
    return await productInstance.save()
  }
}
