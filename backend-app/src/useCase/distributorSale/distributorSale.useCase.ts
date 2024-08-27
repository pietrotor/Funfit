import { DistributorSaleItemInput } from '@/graphql/graphql_types'
import { BadRequestError } from '@/lib/graphqlerrors'
import Decimal from 'decimal.js'

export class DistributorSaleUseCase {
  isOkProductSubTotal(product: DistributorSaleItemInput) {
    return (
      new Decimal(product.price).mul(product.qty).toNumber() === product.total
    )
  }

  validateSaleSubTotal(product: DistributorSaleItemInput) {
    if (!this.isOkProductSubTotal(product)) {
      throw new BadRequestError(
        'El total de uno de los productos no es correcto'
      )
    }
  }

  validateSaleTotal(
    products: DistributorSaleItemInput[],
    total: number,
    discount: number
  ) {
    const calculatedTotal = new Decimal(
      products.reduce(
        (total, product) => new Decimal(total).plus(product.total).toNumber(),
        0
      )
    )
      .minus(discount)
      .toNumber()
    console.log(calculatedTotal, total)
    return calculatedTotal === total
  }
}
