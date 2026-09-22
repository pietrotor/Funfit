import React, { SetStateAction } from 'react'
import { TPointOfSaleData } from '../pages/administration-panel/point-of-sale'
import { TProductBranchData } from '@/interfaces/TData'
import { changeProductQuantity, removeProduct } from '@/utils/pointOfSale'

type Params = {
  item: TProductBranchData
  selectedProducts: TPointOfSaleData
  setSelectedProducts: React.Dispatch<SetStateAction<TPointOfSaleData>>
}

export const useProductHandler = ({ setSelectedProducts, item }: Params) => {
  const increment = (id: string) => {
    setSelectedProducts(prevValue =>
      changeProductQuantity(prevValue, id, current => current + 1)
    )
  }

  const decrement = (id: string) => {
    setSelectedProducts(prevValue =>
      changeProductQuantity(prevValue, id, current =>
        current > 1 ? current - 1 : current
      )
    )
  }

  const remove = (id: string = item.productId) => {
    setSelectedProducts(prevValue => removeProduct(prevValue, id))
  }

  return {
    increment,
    decrement,
    remove
  }
}
