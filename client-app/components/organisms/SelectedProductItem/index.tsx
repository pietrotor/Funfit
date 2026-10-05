import React, { SetStateAction } from 'react'
import Decimal from 'decimal.js'
import { TPointOfSaleData } from '../../../pages/administration-panel/point-of-sale'
import IconSelector from '@/components/atoms/IconSelector'
import Counter from '@/components/molecules/Counter'
import { TProductBranchData } from '@/interfaces/TData'
import { useProductHandler } from '@/hooks/useProductsHandler'
import { canIncrementQuantity, getQuantityLimit } from '@/utils/pointOfSale'

type SelectedProductItemProps = {
  item: TProductBranchData
  selectedProducts: TPointOfSaleData
  setSelectedProducts: React.Dispatch<SetStateAction<TPointOfSaleData>>
}
function SelectedProductItem({
  item,
  selectedProducts,
  setSelectedProducts
}: SelectedProductItemProps) {
  const { decrement, increment, remove } = useProductHandler({
    item,
    selectedProducts,
    setSelectedProducts
  })

  const quantity = item.quantity || 0
  const canAdd = canIncrementQuantity(item, quantity)

  return (
    <div
      key={item?.id}
      className="flex w-full items-center justify-between border-b-1 border-secondary/30 p-2 px-4 text-gray-500 hover:bg-secondary/10"
    >
      <div className="flex w-2/6 flex-col">
        <p className="font-semibold">{item?.product?.name}</p>
        <p className="">Bs. {item.price}</p>
      </div>
      <div className="flex w-2/3 justify-center">
        <Counter
          productId={item.productId}
          quantity={quantity}
          stock={getQuantityLimit(item)}
          decrement={() => {
            quantity > 1 && decrement(item.productId)
          }}
          increment={() => {
            canAdd && increment(item.productId)
          }}
        />
      </div>
      <div className="flex h-full w-1/6 flex-col items-center justify-between">
        <p className="font-semibold">
          Bs. {new Decimal(item.price).mul(quantity).toNumber()}
        </p>
        <span
          className=" rounded-full px-1 transition hover:bg-gray-200 hover:text-danger hover:duration-300"
          onClick={() => remove(item.productId)}
        >
          <IconSelector name="trash" width="w-4" />
        </span>
      </div>
    </div>
  )
}

export default SelectedProductItem
