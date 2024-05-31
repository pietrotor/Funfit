import { DistributorSaleItemInput } from '@/graphql/graphql_types'
import { BadRequestError } from '@/lib/graphqlerrors'

export class DistributorSaleUseCase {
  isOkProductSubTotal(product: DistributorSaleItemInput) {
    return product.price * product.qty === product.total
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
    const calculatedTotal =
      products.reduce((total, product) => total + product.total, 0) - discount
    return calculatedTotal === total
  }
}
