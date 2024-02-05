import {
  CreateSaleInput,
  PaymentMethodEnum,
  Sale,
  SalesPaginationInput,
  SalesSummaryInput
} from '@/graphql/graphql_types'
import { OutErrorResponse } from '@/lib/graphqlerrors/custom.error'
import { ISale } from '../models'
import { IPaginatedResponse } from '@/interfaces/generic.interface'

export abstract class SalesRepository<T> {
  abstract getSaleById(id: T): Promise<ISale | OutErrorResponse>
  abstract getSaleByIdInstance(id: T): Promise<ISale | null>
  abstract getSalesPaginated(
    salesPaginationInput: SalesPaginationInput
  ): Promise<IPaginatedResponse<ISale[]> | OutErrorResponse>

  abstract getSummaryByPaymentMethod(
    salesSummaryInput: SalesSummaryInput
  ): Promise<{ method: PaymentMethodEnum; total: number }[] | OutErrorResponse>

  abstract getTotalSales(
    salesSummaryInput: SalesSummaryInput
  ): Promise<number | OutErrorResponse>

  abstract createSale(
    createSaleInput: CreateSaleInput
  ): Promise<Sale | OutErrorResponse>
}
