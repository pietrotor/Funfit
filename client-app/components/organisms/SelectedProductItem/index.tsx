import React, { SetStateAction } from 'react'
import Decimal from 'decimal.js'
import { Trash2 } from 'lucide-react'
import { TPointOfSaleData } from '../../../pages/administration-panel/point-of-sale'
import Counter from '@/components/molecules/Counter'
import { TProductBranchData } from '@/interfaces/TData'
import { useProductHandler } from '@/hooks/useProductsHandler'
import { canIncrementQuantity, getQuantityLimit } from '@/utils/pointOfSale'
import { formatBs } from '@/utils/formatBs'

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
    <div className="flex items-center gap-3 border-b border-stone-100 px-4 py-3 hover:bg-secondary/10">
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-tertiary">
          {item?.product?.name}
        </p>
        <p className="num text-xs text-stone-400">{formatBs(item.price)}</p>
      </div>
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
      <div className="flex w-16 flex-col items-end gap-1">
        <p className="num text-sm font-semibold text-tertiary">
          {formatBs(new Decimal(item.price).mul(quantity).toNumber())}
        </p>
        <button
          type="button"
          aria-label="Quitar producto"
          className="rounded-full p-1 text-stone-400 transition hover:bg-red-50 hover:text-red-600"
          onClick={() => remove(item.productId)}
        >
          <Trash2 className="h-4 w-4" strokeWidth={1.75} />
        </button>
      </div>
    </div>
  )
}

export default SelectedProductItem
