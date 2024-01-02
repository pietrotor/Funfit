import { CreateBranchInput, PaginationInput, UpdateBranchInput } from '@/graphql/graphql_types'
import { BadRequestError } from '@/lib/graphqlerrors'
import { updateGenericInstance } from '@/lib/updateInstance'
// import { BranchRepository } from '@/repositories/index'
import { getInstancesPagination } from './generic.service'
import { Branch, Cash, IBranch, IModelBranch } from '../models'
import { BranchRepository } from '../repositories'

export class BranchService extends BranchRepository<objectId> {
  async getBranchesPaginated (paginationInput: PaginationInput) {
    const { filter } = paginationInput
    if (filter) {
      const filterArgs = {
        $or: [
          { name: { $regex: filter, $options: 'i' } }
        ]
      }
      return await getInstancesPagination<IBranch, IModelBranch>(
        Branch,
        paginationInput,
        filterArgs
      )
    }
    return await getInstancesPagination<IBranch, IModelBranch>(
      Branch,
      paginationInput
    )
  }

  async getBranchById (id: objectId) {
    const branchInstance = await Branch.findOne({
      _id: id,
      deleted: false
    })
    if (!branchInstance) throw new BadRequestError('No se encontro la sucursal')
    return branchInstance
  }

  async getBranchByIdInstance (id: objectId) {
    return await Branch.findOne({
      _id: id,
      deleted: false
    })
  }

  async createBranch (createBranchInput: CreateBranchInput, createdBy?: objectId) {
    const branchInstance = new Branch({ ...createBranchInput, createdBy })
    // TODO: Create a service for this
    const cashInstance = new Cash({
      branchId: branchInstance._id
    })
    await cashInstance.save()
    branchInstance.cashId = branchInstance._id
    return await branchInstance.save()
  }

  async updateBranch (updateBranchInput: UpdateBranchInput) {
    const { id } = updateBranchInput
    const branchInstance = this.getBranchById(id)
    updateGenericInstance(branchInstance, updateBranchInput)

    return (await branchInstance).save()
  }

  async deleteBranch (id: objectId, deletedBy?: objectId) {
    const branchInstance = await this.getBranchById(id)
    branchInstance.deleted = true
    branchInstance.deletedAt = new Date()
    branchInstance.deletedBy = deletedBy
    return await branchInstance.save()
  }
}
