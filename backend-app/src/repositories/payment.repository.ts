import {
  CreatePaymentInput,
  PaymentPaginationInput
} from '@/graphql/graphql_types'
import { IPaginatedResponse } from '@/interfaces/generic.interface'
import { OutErrorResponse } from '@/lib/graphqlerrors/custom.error'
import { IPayment } from '../models'

export abstract class PaymentRepository<T> {
  abstract getPaymentsPaginated(
    paymentPaginationInput: PaymentPaginationInput
  ): Promise<IPaginatedResponse<IPayment[]> | OutErrorResponse>

  abstract getPaymentById(id: T): Promise<IPayment | OutErrorResponse>
  abstract getgetPaymentByIdInstance(id: T): Promise<IPayment | null>

  abstract createPayment(
    createPriceInput: CreatePaymentInput,
    modifySale: boolean,
    createdBy?: T | null
  ): Promise<IPayment | OutErrorResponse>
}
