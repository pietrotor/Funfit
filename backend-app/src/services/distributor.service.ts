import { BadRequestError } from '@/lib/graphqlerrors'
import { Distributor, IDistributor, IModelDistributor } from '../models'
import { DistributorRepository } from '../repositories'
import {
  CreateDistributorInput,
  PaginationInput,
  UpdateDistributorInput
} from '@/graphql/graphql_types'
import { updateGenericInstance } from '@/lib/updateInstance'
import { getInstancesPagination } from './generic.service'

export class DistributorService extends DistributorRepository<objectId> {
  async getDistributorsPaginated(paginationInput: PaginationInput) {
    const { filter } = paginationInput
    if (filter) {
      const filterArgs = {
        $or: [
          { name: { $regex: filter, $options: 'i' } },
          { code: { $regex: filter, $options: 'i' } }
        ]
      }
      return await getInstancesPagination<IDistributor, IModelDistributor>(
        Distributor,
        paginationInput,
        filterArgs
      )
    }
    return await getInstancesPagination<IDistributor, IModelDistributor>(
      Distributor,
      paginationInput
    )
  }

  async getDistributorById(id: objectId) {
    const distributorInstance = await Distributor.findOne({
      _id: id,
      deleted: false
    })
    if (!distributorInstance) {
      throw new BadRequestError('No se encontro el distribuidor')
    }
    return distributorInstance
  }

  async getDistributorByIdInstance(id: objectId) {
    return await Distributor.findOne({
      _id: id,
      deleted: false
    })
  }

  async createDistributor(
    createDistributorInput: CreateDistributorInput,
    createdBy?: objectId
  ) {
    const distributorInstance = new Distributor({
      ...createDistributorInput,
      createdBy
    })
    return await distributorInstance.save()
  }

  async updateDistributor(updateDistributorInput: UpdateDistributorInput) {
    const distributorInstance = await this.getDistributorById(
      updateDistributorInput.id
    )
    updateGenericInstance(distributorInstance, updateDistributorInput, [])

    await distributorInstance.save()
    return distributorInstance
  }
}
