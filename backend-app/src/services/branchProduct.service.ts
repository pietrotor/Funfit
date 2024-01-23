import {
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

export class BranchProductService extends BranchProductRepository<objectId> {
  async getBranchesProductsPaginated(
    paginationInput: PaginationInput,
    branchId: objectId
  ) {
    const { filter } = paginationInput
    if (filter) {
      const filterArgs = {
        $or: [{ name: { $regex: filter, $options: 'i' } }],
        branchId
      }
      return await getInstancesPagination<IBranchProduct, IModelBranchProduct>(
        BranchProduct,
        paginationInput,
        filterArgs
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

  async getBranchProductById(id: objectId) {
    const branchInstance = await BranchProduct.findOne({
      _id: id,
      deleted: false
    })
    if (!branchInstance)
      throw new BadRequestError('No se encontro el producto en la sucursal')
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
    if (existsProductOnBranch)
      throw new BadRequestError(
        'El producto ya se encuentra registrado en la sucursal'
      )
    const existsBranchOnProduct = productInstance.branchesIds.some(
      productBranchId => productBranchId.toString() === branchId.toString()
    )
    if (existsBranchOnProduct)
      throw new BadRequestError(
        'El producto ya se encuentra registrado en la sucursal'
      )
    const branchProductInstance = new BranchProduct({
      ...createBranchProductInput,
      createdBy
    })
    branchInstance.productsIds.push(productId)
    productInstance.branchesIds.push(branchId)
    return await branchProductInstance.save()
  }

  async updateBranchProduct(
    updateBranchProductInput: UpdateBranchProductInput
  ) {
    const { id, price } = updateBranchProductInput
    const branchProductInstance = await this.getBranchProductById(id)
    if (typeof price === 'number') {
      if (price < 0)
        throw new BadRequestError('El precio no puede ser negativo')
    }
    updateGenericInstance(branchProductInstance, updateBranchProductInput)

    return await branchProductInstance.save()
  }

  async deleteBranchProdcut(id: objectId, deletedBy?: objectId) {
    const branchProduct = await this.getBranchProductById(id)
    branchProduct.deleted = true
    branchProduct.deletedAt = new Date()
    branchProduct.deletedBy = deletedBy
    return await branchProduct.save()
  }

  async createBranchProductStockMovement(
    createBranchProductStockMovement: CreateBranchProductStockMovementInput,
    createdBy?: objectId
  ) {
    const { branchId, type, stockId, branchProductId } =
      createBranchProductStockMovement

    if (stockId && type !== StockMovementTypeEnum.INWARD)
      throw new BadRequestError(
        'Stock innecesario en un tipo de movimiento de salida'
      )
    if (!stockId && type === StockMovementTypeEnum.INWARD)
      throw new BadRequestError(
        'Es necesario el stock para un movimiento de ingreso'
      )

    await branchCore.getBranchById(branchId)

    await branchUseCaseCore.stockUpdate(
      createBranchProductStockMovement,
      createdBy
    )

    return await this.getBranchProductById(branchProductId)
  }
}
