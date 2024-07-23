import { BillPaginationInput, CreateBillInput } from '@/graphql/graphql_types'
import { OutErrorResponse } from '@/lib/graphqlerrors/custom.error'
import { IBill } from '../models'
import { IPaginatedResponse } from '@/interfaces/generic.interface'
import { BusinessBalanceDto } from 'dtos'

export abstract class BillRepository<T> {
  abstract getBills(
    billPaginationInput: BillPaginationInput
  ): Promise<IPaginatedResponse<IBill[]> | OutErrorResponse>

  abstract getBillById(id: T): Promise<IBill | OutErrorResponse>
  abstract getBillByIdInstance(id: T): Promise<IBill | null>

  abstract createBill(
    createBillInput: CreateBillInput
  ): Promise<IBill | OutErrorResponse>

  abstract deleteBill(
    id: T,
    deltedBy: T | undefined
  ): Promise<IBill | OutErrorResponse>

  abstract getTotalBills(
    businessBalanceDto: BusinessBalanceDto
  ): Promise<number>
}
