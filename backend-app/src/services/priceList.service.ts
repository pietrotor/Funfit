import {
  CreatePriceListInput,
  PaginationInput,
  UpdatePriceListInput
} from '@/graphql/graphql_types'
import { getInstancesPagination } from './generic.service'
import { BadRequestError } from '@/lib/graphqlerrors'
import { updateGenericInstance } from '@/lib/updateInstance'
import { internalCodeGenerator } from '@/lib/codeGenerator'
import PriceListRepository from '@/repositories/priceList.repository'
import { IModelPriceList, IPriceList, PriceList } from '../models'

export class PriceListService extends PriceListRepository<objectId> {
  async getPriceListsPaginated(paginationInput: PaginationInput) {
    const { filter } = paginationInput
    if (filter) {
      const filterArgs = {
        $or: [{ name: { $regex: filter, $options: 'i' } }]
      }
      return await getInstancesPagination<IPriceList, IModelPriceList>(
        PriceList,
        paginationInput,
        filterArgs
      )
    }
    return await getInstancesPagination<IPriceList, IModelPriceList>(
      PriceList,
      paginationInput
    )
  }

  async getPriceListById(id: objectId) {
    const priceListInstance = await PriceList.findOne({
      _id: id,
      deleted: false
    })
    if (!priceListInstance) {
      throw new BadRequestError('No se encontro la lista de precios')
    }
    return priceListInstance
  }

  async getPriceListByIdInstance(id: objectId) {
    return await PriceList.findOne({
      _id: id,
      deleted: false
    })
  }

  async createPriceList(
    createPriceListInput: CreatePriceListInput,
    createdBy?: objectId | null
  ) {
    const { name } = createPriceListInput
    const [duplicatedPriceListName] = await Promise.all([
      PriceList.findOne({
        name,
        deleted: false
      })
    ])
    if (duplicatedPriceListName) {
      throw new BadRequestError(
        'Ya existe una lista de precios registrado con el mismo nombre'
      )
    }

    const code = internalCodeGenerator(name)
    const priceListInstance = new PriceList({
      ...createPriceListInput,
      code,
      createdBy
    })
    return await priceListInstance.save()
  }

  async updatePriceList(updatePriceListInput: UpdatePriceListInput) {
    const { id, ...priceList } = updatePriceListInput
    const priceListInstance = await PriceList.findOne({
      _id: id,
      deleted: false
    })
    if (!priceListInstance)
      throw new BadRequestError('La lista de precios no existe')
    const [duplicatedPriceListName] = await Promise.all([
      PriceList.findOne({
        name: priceList.name,
        deleted: false
      })
    ])
    if (duplicatedPriceListName) {
      throw new BadRequestError(
        'Ya existe una lista de precios registrada con el mismo nombre'
      )
    }
    updateGenericInstance(priceListInstance, priceList)
    return await priceListInstance.save()
  }

  async deletePriceList(id: objectId, deletedBy?: objectId | null) {
    const priceListInstance = await PriceList.findOne({
      _id: id,
      deleted: false
    })
    if (!priceListInstance)
      throw new BadRequestError('La lista de precios no existe')
    priceListInstance.deleted = true
    priceListInstance.deletedBy = deletedBy || undefined
    return await priceListInstance.save()
  }
}
