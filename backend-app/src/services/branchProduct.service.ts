import { CreateBranchProductInput, PaginationInput, UpdateBranchProductInput } from '@/graphql/graphql_types'
import { BadRequestError } from '@/lib/graphqlerrors'
import { updateGenericInstance } from '@/lib/updateInstance'
import { getInstancesPagination } from './generic.service'
import { Branch, BranchProduct, IBranch, IBranchProduct, IModelBranch, IModelBranchProduct } from '../models'
import { BranchProductRepository } from '../repositories'
import { branchCore, productCore } from '.'

export class BranchProductService extends BranchProductRepository<objectId> {
  async getBranchesProductsPaginated (paginationInput: PaginationInput, branchId: objectId) {
    const { filter } = paginationInput
    if (filter) {
      const filterArgs = {
        $or: [
          { name: { $regex: filter, $options: 'i' } }
        ],
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

  async getBranchProductById (id: objectId) {
    const branchInstance = await BranchProduct.findOne({
      _id: id,
      deleted: false
    })
    if (!branchInstance) throw new BadRequestError('No se encontro el producto')
    return branchInstance
  }

  async getBranchProductByIdInstance (id: objectId) {
    return await BranchProduct.findOne({
      _id: id,
      deleted: false
    })
  }

  async createBranchProduct (createBranchProductInput: CreateBranchProductInput, createdBy?: objectId) {
    const { branchId, productId, price } = createBranchProductInput
    console.log("🚀 ~ file: branchProduct.service.ts:53 ~ BranchProductService ~ createBranchProduct ~ createBranchProductInput:", createBranchProductInput)
    if (price < 0) throw new BadRequestError('El precio no puede ser negativo')
    await Promise.all([
      branchCore.getBranchById(branchId),
      productCore.getProductById(productId)
    ])
    const branchProductInstance = new BranchProduct({ ...createBranchProductInput, createdBy })
    return await branchProductInstance.save()
  }

  async updateBranchProduct (updateBranchProductInput: UpdateBranchProductInput) {
    const { id, price } = updateBranchProductInput
    const branchProductInstance = await this.getBranchProductById(id)
    if (typeof price === 'number') {
      if (price < 0) throw new BadRequestError('El precio no puede ser negativo')
    }
    updateGenericInstance(branchProductInstance, updateBranchProductInput)

    return await branchProductInstance.save()
  }

  async deleteBranchProdcut (id: objectId, deletedBy?: objectId) {
    const branchProduct = await this.getBranchProductById(id)
    branchProduct.deleted = true
    branchProduct.deletedAt = new Date()
    branchProduct.deletedBy = deletedBy
    return await branchProduct.save()
  }
}
