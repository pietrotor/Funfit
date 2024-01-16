import { CreateSaleInput, Sale } from '@/graphql/graphql_types'
import { OutErrorResponse } from '@/lib/graphqlerrors/custom.error'

export abstract class SalesRepository<T> {
  abstract createSale(createSaleInput: CreateSaleInput): Promise<Sale | OutErrorResponse>
}
