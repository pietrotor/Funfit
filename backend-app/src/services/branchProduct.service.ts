import {
  BranchProductCategorized,
  CreateBranchProductInput,
  CreateBranchProductStockMovementInput,
  PaginationInput,
  StockMovementTypeEnum,
  UpdateBranchProductInput
} from '@/graphql/graphql_types'
import { BadRequestError } from '@/lib/graphqlerrors'
import { updateGenericInstance } from '@/lib/updateInstance'
import { getInstancesPagination } from './generic.service'
import { BranchProduct, IBranchProduct, IModelBranchProduct } from '../models'
import { BranchProductRepository } from '../repositories'
import { branchCore, productCore } from '.'
import { branchUseCaseCore } from 'useCase'
import Product from '@/models/product.model'

export class BranchProductService extends BranchProductRepository<objectId> {
  async getBranchesProductsPaginated(
    paginationInput: PaginationInput,
    branchId: objectId
  ) {
    const { filter } = paginationInput
    if (filter) {
      const products = await Product.find({
        deleted: false,
        $or: [
          { name: { $regex: filter, $options: 'i' } },
          { code: { $regex: filter, $options: 'i' } }
        ],
        branchesIds: {
          $in: [branchId]
        }
      })
      const productsIds = products.map(product => product._id)
      return await getInstancesPagination<IBranchProduct, IModelBranchProduct>(
        BranchProduct,
        paginationInput,
        { productId: productsIds, branchId, deleted: false }
      )
    }
    const extraArgs = {
      branchId
    }
    return await getInstancesPagination<IBranchProduct, IModelBranchProduct>(
      BranchProduct,
      paginationInput,
      extraArgs
    )
  }

  async getBranchProductsByCategory(branchId: objectId) {
    const results: BranchProductCategorized[] = await BranchProduct.aggregate([
      {
        $match: {
          deleted: false,
          branchId
        }
      },
      {
        $lookup: {
          from: 'product',
          localField: 'productId',
          foreignField: '_id',
          as: 'product'
        }
      },
      {
        $unwind: '$product'
      },
      {
        $lookup: {
          from: 'category', // Nombre de la colección Category en la base de datos
          localField: 'product.categoryId',
          foreignField: '_id',
          as: 'category'
        }
      },
      {
        $unwind: '$category'
      },
      {
        $project: {
          branchId: 1,
          productId: 1,
          stock: 1,
          lastStockEntry: 1,
          price: 1,
          isVisibleOnWeb: 1,
          isVisibleOnMenu: 1,
          status: 1,
          createdBy: 1,
          deleted: 1,
          deletedAt: 1,
          deletedBy: 1,
          product: 1,
          category: {
            _id: '$category._id',
            id: '$category._id',
            name: '$category.name',
            code: '$category.code'
          } // Incluye el ID, nombre y código de la categoría
        }
      },
      {
        $group: {
          _id: '$category._id',
          id: { $first: '$category.id' },
          name: { $first: '$category.name' },
          code: { $first: '$category.code' },
          products: { $push: '$$ROOT' } // Agrupa los documentos por categoría y almacena los documentos completos en el array 'products'
        }
      }
    ])
    const items = results.map(category => ({
      ...category,
      products: (category.products || [])?.map((branchProductProduct: any) => ({
        ...branchProductProduct,
        id: branchProductProduct._id,
        product: {
          ...branchProductProduct.product,
          id: branchProductProduct.product._id
        }
      }))
    }))
    console.log('-items - ', JSON.stringify(items))
    return items
  }

  async getBranchProductById(id: objectId) {
    const branchInstance = await BranchProduct.findOne({
      _id: id,
      deleted: false
    })
    if (!branchInstance) {
      throw new BadRequestError('No se encontro el producto en la sucursal')
    }
    return branchInstance
  }

  async getBranchProductByIdInstance(id: objectId) {
    return await BranchProduct.findOne({
      _id: id,
      deleted: false
    })
  }

  async createBranchProduct(
    createBranchProductInput: CreateBranchProductInput,
    createdBy?: objectId
  ) {
    const { branchId, productId, price } = createBranchProductInput
    if (price < 0) throw new BadRequestError('El precio no puede ser negativo')
    const [branchInstance, productInstance] = await Promise.all([
      branchCore.getBranchById(branchId),
      productCore.getProductById(productId)
    ])
    const existsProductOnBranch = branchInstance.productsIds.some(
      branchProductId => branchProductId.toString() === productId.toString()
    )
    if (existsProductOnBranch) {
      throw new BadRequestError(
        'El producto ya se encuentra registrado en la sucursal'
      )
    }
    const existsBranchOnProduct = productInstance.branchesIds.some(
      productBranchId => productBranchId.toString() === branchId.toString()
    )
    if (existsBranchOnProduct) {
      throw new BadRequestError(
        'El producto ya se encuentra registrado en la sucursal'
      )
    }
    const branchProductInstance = new BranchProduct({
      ...createBranchProductInput,
      createdBy
    })
    branchInstance.productsIds.push(productId)
    await branchInstance.save()
    productInstance.branchesIds.push(branchId)
    await productInstance.save()
    return await branchProductInstance.save()
  }

  async updateBranchProduct(
    updateBranchProductInput: UpdateBranchProductInput
  ) {
    const { id, price } = updateBranchProductInput
    const branchProductInstance = await this.getBranchProductById(id)
    if (typeof price === 'number') {
      if (price < 0) {
        throw new BadRequestError('El precio no puede ser negativo')
      }
    }
    updateGenericInstance(branchProductInstance, updateBranchProductInput)

    return await branchProductInstance.save()
  }

  async deleteBranchProdcut(id: objectId, deletedBy?: objectId) {
    const branchProduct = await this.getBranchProductById(id)
    const branchInstance = await branchCore.getBranchById(
      branchProduct.branchId
    )
    const productInstance = await productCore.getProductById(
      branchProduct.productId
    )
    branchInstance.productsIds = branchInstance.productsIds.filter(
      productId => productId.toString() !== branchProduct.productId.toString()
    )
    productInstance.branchesIds = productInstance.branchesIds.filter(
      branchId => branchId.toString() !== branchProduct.branchId.toString()
    )
    branchProduct.deleted = true
    branchProduct.deletedAt = new Date()
    branchProduct.deletedBy = deletedBy
    const [branchProductResponse] = await Promise.all([
      branchProduct.save(),
      branchInstance.save(),
      productInstance.save()
    ])
    return branchProductResponse
  }

  async createBranchProductStockMovement(
    createBranchProductStockMovementInput: CreateBranchProductStockMovementInput,
    createdBy?: objectId
  ) {
    const { branchId, type, stockId, branchProductId } =
      createBranchProductStockMovementInput

    if (!stockId && type === StockMovementTypeEnum.INWARD) {
      throw new BadRequestError(
        'Es necesario el stock para un movimiento de ingreso'
      )
    }

    await branchCore.getBranchById(branchId)

    await branchUseCaseCore.stockUpdate(
      createBranchProductStockMovementInput,
      createdBy
    )

    return await this.getBranchProductById(branchProductId)
  }
}
