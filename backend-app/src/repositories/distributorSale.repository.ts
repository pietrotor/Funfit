import {
  CreateDistributorSaleInput,
  DistributorSalePaginationInput,
  DistributorSaleProduct,
  DistributorsSalesSummary
} from '@/graphql/graphql_types'
import { OutErrorResponse } from '@/lib/graphqlerrors/custom.error'
import { IDistributorSale } from '../models'
import { IPaginatedResponse } from '@/interfaces/generic.interface'
import { AddDistributorSalePayment } from 'dtos'

export abstract class DistributorSaleRepository<T> {
  abstract getDistributorSaleById(
    id: T
  ): Promise<IDistributorSale | OutErrorResponse>

  abstract getDistributorSaleByIdInstance(
    id: T
  ): Promise<IDistributorSale | null>

  abstract getDistributorSalesPaginated(
    distributorSalePaginationInput: DistributorSalePaginationInput
  ): Promise<IPaginatedResponse<IDistributorSale[]> | OutErrorResponse>

  abstract createDistributorSale(
    createSaleInput: CreateDistributorSaleInput
  ): Promise<IDistributorSale | OutErrorResponse>

  abstract addDistributorSalePayment(
    addDistributorSalePayment: AddDistributorSalePayment
  ): Promise<IDistributorSale | OutErrorResponse>

  abstract getDistributorSalesProducts(
    warehouseId: objectId,
    priceListId: objectId
  ): Promise<DistributorSaleProduct[] | OutErrorResponse>

  abstract getTotalSaled(
    distributorSalePaginationInput: DistributorSalePaginationInput
  ): Promise<DistributorsSalesSummary | OutErrorResponse>
}
