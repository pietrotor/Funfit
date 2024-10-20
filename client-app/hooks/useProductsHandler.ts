import React, { SetStateAction } from 'react'
import Decimal from 'decimal.js'
import { TPointOfSaleData } from '../pages/administration-panel/point-of-sale'
import { TProductBranchData } from '@/interfaces/TData'

type Params = {
  item: TProductBranchData
  selectedProducts: TPointOfSaleData
  setSelectedProducts: React.Dispatch<SetStateAction<TPointOfSaleData>>
}

export const useProductHandler = ({
  setSelectedProducts,
  selectedProducts,
  item
}: Params) => {
  const increment = (id: string) => {
    setSelectedProducts(prevValue => ({
      ...prevValue,
      products: selectedProducts.products.map(item => {
        if (item.productId === id) {
          return {
            ...item,
            quantity: (item.quantity || 0) + 1,
            total: new Decimal(item.price)
              .mul((item.quantity || 0) + 1)
              .toNumber()
          }
        }
        return item
      }),
      subTotal: new Decimal(item.price)
        .plus(selectedProducts.subTotal)
        .toNumber(),
      total: new Decimal(item.price).plus(selectedProducts.total).toNumber(),
      discount: selectedProducts.discount
    }))
  }

  const decrement = (id: string) => {
    setSelectedProducts(prevValue => ({
      ...prevValue,
      products: selectedProducts.products.map(item => {
        if (item.productId === id) {
          return {
            ...item,
            quantity: (item.quantity || 0) - 1,
            total: new Decimal(item.price)
              .mul((item.quantity || 0) - 1)
              .toNumber()
          }
        }
        return item
      }),
      subTotal: new Decimal(selectedProducts.subTotal)
        .minus(item.price)
        .toNumber(),
      total: new Decimal(selectedProducts.total).minus(item.price).toNumber(),
      discount: selectedProducts.discount
    }))
  }

  return {
    increment,
    decrement
  }
}
