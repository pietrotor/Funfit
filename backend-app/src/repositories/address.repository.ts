import { CreateAddressInput } from '@/graphql/graphql_types'
import { OutErrorResponse } from '@/lib/graphqlerrors/custom.error'
import { IAddress } from '../models'

export abstract class AddressRepository<T> {
  abstract getAddressById(id: T): Promise<IAddress | OutErrorResponse>
  abstract getAddressByIdInstance(id: T): Promise<IAddress | null>

  abstract createAddress(
    createAddressInput: CreateAddressInput
  ): Promise<IAddress | OutErrorResponse>
}
