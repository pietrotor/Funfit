import { BadRequestError } from '@/lib/graphqlerrors'
import { Address } from '../models'
import { AddressRepository } from '../repositories'
import { CreateAddressInput } from '@/graphql/graphql_types'
import { customerCore } from '.'

export class AddressService extends AddressRepository<objectId> {
  async getAddressById(id: objectId) {
    const addressInstance = await Address.findOne({
      _id: id,
      deleted: false
    })
    if (!addressInstance) {
      throw new BadRequestError('No se encontro la sucursal')
    }
    return addressInstance
  }

  async getAddressByIdInstance(id: objectId) {
    return await Address.findOne({
      _id: id,
      deleted: false
    })
  }

  async createAddress(
    createAddressInput: CreateAddressInput,
    createdBy?: objectId
  ) {
    const { customerId } = createAddressInput
    const customerInstance = await customerCore.getCustomerById(customerId)
    const addressInstance = new Address({ ...createAddressInput, createdBy })
    customerInstance.addressesIds.push(addressInstance._id)
    await customerInstance.save()
    return await addressInstance.save()
  }
}
