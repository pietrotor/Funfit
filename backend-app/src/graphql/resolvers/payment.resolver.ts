import {
  StatusEnum,
  Payment,
  User,
  Distributor,
  DistributorSalePaymentsResponse,
  CreatePaymentInput,
  PaymentResponse,
  DistributorSale
} from '@/graphql/graphql_types'
import { ContextGraphQl } from '@/interfaces/context.interface'
import { errorHandler } from '@/lib/graphqlerrors'
import {
  distributorCore,
  distributorSaleCore,
  paymentCore,
  userCore
} from '@/services/index'

// ========================================== Queries ====================================================
const getDistributorSalePayments = async (
  _: any,
  args: { distibutorSaleId: objectId },
  context: ContextGraphQl
): Promise<DistributorSalePaymentsResponse> => {
  try {
    const { distibutorSaleId } = args
    const data = await paymentCore.getSalePayments(distibutorSaleId)
    return {
      status: StatusEnum.OK,
      message: 'Pagos encontrados',
      data
    }
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}
// ========================================== Mutations ====================================================
const createPayment = async (
  _: any,
  args: { createPaymentInput: CreatePaymentInput },
  context: ContextGraphQl
): Promise<PaymentResponse> => {
  try {
    const { createPaymentInput } = args
    const distributorSaleInstance = await paymentCore.createPayment(
      createPaymentInput,
      true,
      context.req.currentUser?.id
    )
    return {
      status: StatusEnum.OK,
      message: 'Pago creado correctamente',
      data: distributorSaleInstance
    }
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}

export const paymentsQuery = {
  getDistributorSalePayments
}
export const paymentsMutation = {
  createPayment
}

export const paymentType = {
  Payment: {
    async distributorSale(
      parent: Payment,
      _: any,
      __: any
    ): Promise<DistributorSale | null> {
      if (parent.distributorSaleId) {
        return await distributorSaleCore.getDistributorSaleByIdInstance(
          parent.distributorSaleId
        )
      }
      return null
    },
    async distributor(
      parent: Payment,
      _: any,
      __: any
    ): Promise<Distributor | null> {
      if (parent.distributorId) {
        const distributor = await distributorCore.getDistributorByIdInstance(
          parent.distributorId
        )
        return distributor
      }
      return null
    },
    async createdByInfo(
      parent: Payment,
      _: any,
      __: any
    ): Promise<User | null> {
      if (parent.createdBy) {
        return await userCore.getUserByIdInstance(parent.createdBy)
      }
      return null
    }
  }
}
