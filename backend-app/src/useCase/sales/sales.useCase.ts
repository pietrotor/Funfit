import { PaymentMethodEnum, SaleItem } from '@/graphql/graphql_types'
import { BadRequestError } from '@/lib/graphqlerrors'
import { cashCore } from '@/services/index'

export class SalesUseCase {
  isOkProductSubTotal(product: SaleItem) {
    return (product.price * product.qty) === product.total
  }

  validateSaleSubTotal(product: SaleItem) {
    if (!this.isOkProductSubTotal(product)) throw new BadRequestError('El total de uno de los productos no es correcto')
  }

  validateSaleTotal(products: SaleItem[], total: number) {
    const calculatedTotal = products.reduce((total, product) => total + product.total, 0)
    return calculatedTotal === total
  }

  async cashPayment(cashId: objectId, total: number, createdBy?: objectId) {
    const cashInstance = await cashCore.getCashById(cashId)
  }

  async executePayment(total: number, paymentMethod: PaymentMethodEnum, createdBy?: objectId) {

  }
}
