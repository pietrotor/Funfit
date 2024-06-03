import {
  CreatePaymentInput,
  PaymentPaginationInput
} from '@/graphql/graphql_types'
import { getInstancesPagination } from './generic.service'
import { BadRequestError } from '@/lib/graphqlerrors'
import { IModelPayment, IPayment, Payment } from '../models'
import { PaymentRepository } from '../repositories'
import { distributorCore, distributorSaleCore } from '.'

export class PaymentService extends PaymentRepository<objectId> {
  async getPaymentsPaginated(paymentPaginationInput: PaymentPaginationInput) {
    const { filter, endDate, initialDate, ...paginationInput } =
      paymentPaginationInput
    if (filter) {
      const filterArgs = {
        $or: [{ name: { $regex: filter, $options: 'i' } }]
      }
      return await getInstancesPagination<IPayment, IModelPayment>(
        Payment,
        paginationInput,
        filterArgs
      )
    }
    return await getInstancesPagination<IPayment, IModelPayment>(
      Payment,
      paginationInput
    )
  }

  async getPaymentById(id: objectId) {
    const paymentInstance = await Payment.findOne({
      _id: id,
      deleted: false
    })
    if (!paymentInstance) {
      throw new BadRequestError('No se encontro el pago')
    }
    return paymentInstance
  }

  async getgetPaymentByIdInstance(id: objectId) {
    return await Payment.findOne({
      _id: id,
      deleted: false
    })
  }

  async getSalePayments(distributorSaleId: objectId) {
    return await Payment.find({
      distributorSaleId,
      deleted: false
    })
  }

  async createPayment(
    createPaymentInput: CreatePaymentInput,
    modifySale: boolean,
    createdBy?: objectId | null
  ) {
    const { distributorId, amount, distributorSaleId } = createPaymentInput

    await distributorCore.getDistributorById(distributorId)

    const paymentInstance = new Payment({
      ...createPaymentInput,
      createdBy
    })
    if (modifySale) {
      await distributorSaleCore.addDistributorSalePayment({
        amount,
        id: distributorSaleId
      })
    }
    return await paymentInstance.save()
  }
}
