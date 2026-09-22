import Decimal from 'decimal.js'
import type { TPointOfSaleData } from '../pages/administration-panel/point-of-sale'
import { ProductTypeEnum } from '@/graphql/graphql-types'
import { TProductBranchData } from '@/interfaces/TData'

/**
 * Combos have no stock of their own: the backend validates the stock of their
 * sub products when the sale is registered.
 */
export const getQuantityLimit = (
  product: TProductBranchData
): number | undefined => {
  if (product.product?.type === ProductTypeEnum.COMBO) return undefined
  return typeof product.stock === 'number' ? product.stock : undefined
}

export const canIncrementQuantity = (
  product: TProductBranchData,
  quantity: number
) => {
  const limit = getQuantityLimit(product)
  return limit === undefined || quantity < limit
}

const applyProducts = (
  state: TPointOfSaleData,
  products: TProductBranchData[]
): TPointOfSaleData => {
  const subTotal = products
    .reduce(
      (acc, item) => acc.plus(new Decimal(item.price).mul(item.quantity || 0)),
      new Decimal(0)
    )
    .toNumber()
  const discount = Math.min(state?.discount || 0, subTotal)

  return {
    ...state,
    products,
    subTotal,
    discount,
    total: new Decimal(subTotal).minus(discount).toNumber()
  }
}

export const changeProductQuantity = (
  state: TPointOfSaleData,
  productId: string,
  getQuantity: (current: number) => number
): TPointOfSaleData => {
  const products = (state?.products ?? []).map(item => {
    if (item.productId !== productId) return item
    const quantity = getQuantity(item.quantity || 0)
    return {
      ...item,
      quantity,
      total: new Decimal(item.price).mul(quantity).toNumber()
    }
  })

  return applyProducts(state, products)
}

export const addProductQuantity = (
  state: TPointOfSaleData,
  product: TProductBranchData
): TPointOfSaleData => {
  const products = state?.products ?? []

  if (products.some(item => item.productId === product.productId)) {
    return changeProductQuantity(
      state,
      product.productId,
      current => current + 1
    )
  }

  return applyProducts(state, [
    ...products,
    { ...product, quantity: 1, total: product.price }
  ])
}

export const removeProduct = (
  state: TPointOfSaleData,
  productId: string
): TPointOfSaleData =>
  applyProducts(
    state,
    (state?.products ?? []).filter(item => item.productId !== productId)
  )
