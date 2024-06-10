import { CreateCustomerInput } from '@/graphql/graphql_types'
import { OutErrorResponse } from '@/lib/graphqlerrors/custom.error'
import { ICustomer } from '../models'

export abstract class CustomerRepository<T> {
  abstract getCustomerById(id: T): Promise<ICustomer | OutErrorResponse>
  abstract getCustomerByIdInstance(id: T): Promise<ICustomer | null>

  abstract createCustomer(
    createCustomerInput: CreateCustomerInput
  ): Promise<ICustomer | OutErrorResponse>
}
