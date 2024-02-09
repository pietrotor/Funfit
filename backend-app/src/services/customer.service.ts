import { BadRequestError } from '@/lib/graphqlerrors'
import { Customer } from '../models'
import { CustomerRepository } from '../repositories'
import { CreateCustomerInput } from '@/graphql/graphql_types'

export class CustomerService extends CustomerRepository<objectId> {
  async getCustomerById(id: objectId) {
    const customerInstance = await Customer.findOne({
      _id: id,
      deleted: false
    })
    if (!customerInstance) {
      throw new BadRequestError('No se encontro la sucursal')
    }
    return customerInstance
  }

  async getCustomerByIdInstance(id: objectId) {
    return await Customer.findOne({
      _id: id,
      deleted: false
    })
  }

  async createCustomer(
    createCustomerInput: CreateCustomerInput,
    createdBy?: objectId
  ) {
    const { phone, name, lastName, email } = createCustomerInput
    const existsCustomer = await Customer.findOne({
      deleted: false,
      phone
    })
    if (existsCustomer) {
      existsCustomer.name = name
      existsCustomer.lastName = lastName
      if (email) existsCustomer.email = email
      return await existsCustomer.save()
    } else {
      const customerInstance = new Customer({
        ...createCustomerInput,
        createdBy
      })
      return await customerInstance.save()
    }
  }
}
