import {
  CreatePaymentInput,
  PaymentPaginationInput
} from '@/graphql/graphql_types'
import { getInstancesPagination } from './generic.service'
import { BadRequestError } from '@/lib/graphqlerrors'
import { IModelPayment, IPayment, Payment } from '../models'
import { PaymentRepository } from '../repositories'
import { distributorCore, distributorSaleCore } from '.'
import Decimal from 'decimal.js'

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
    }).sort({ _id: -1 })
  }

  async createPayment(
    createPaymentInput: CreatePaymentInput,
    modifySale: boolean,
    createdBy?: objectId | null
  ) {
    const { distributorId, amount, distributorSaleId } = createPaymentInput

    if (amount <= 0)
      throw new BadRequestError('El monto no puede ser menor a 0')

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
