import { Button, Image } from '@nextui-org/react'
import React, { SetStateAction } from 'react'
import { Plus } from 'lucide-react'
import clsx from 'clsx'
import Counter from '../Counter'
import { TPointOfSaleData } from '../../../pages/administration-panel/point-of-sale'
import { TProductBranchData } from '@/interfaces/TData'
import { DEFAULT_IMAGE } from '@/lib/constants'
import { useProductHandler } from '@/hooks/useProductsHandler'
import { canIncrementQuantity, getQuantityLimit } from '@/utils/pointOfSale'
import { formatBs } from '@/utils/formatBs'

export type TPointOfSaleCardProps = {
  product: TProductBranchData
  quantity: number
  isLoading?: boolean
  handleSelected: (id: string) => void
  selectedProducts: TPointOfSaleData
  setSelectedProducts: React.Dispatch<SetStateAction<TPointOfSaleData>>
}

function PointOfSaleCard({
  product,
  quantity,
  handleSelected,
  selectedProducts,
  setSelectedProducts
}: TPointOfSaleCardProps) {
  const { decrement, increment } = useProductHandler({
    item: product,
    selectedProducts,
    setSelectedProducts
  })
  const canAdd = canIncrementQuantity(product, quantity)
  const handleClick = () => {
    if (quantity || !canAdd) return
    handleSelected(product.id)
  }

  return (
    <article
      className={clsx(
        'flex h-full flex-col overflow-hidden rounded-2xl border bg-white shadow-[0_8px_20px_-16px_rgba(53,56,56,0.35)] transition-shadow hover:shadow-md',
        quantity ? 'border-secondary' : 'border-stone-200',
        canAdd || quantity ? 'cursor-pointer' : 'opacity-70'
      )}
      onClick={handleClick}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100 sm:aspect-square lg:aspect-[5/4]">
        <Image
          alt={product.product?.name || 'Producto'}
          removeWrapper
          src={product.product?.image || DEFAULT_IMAGE}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        {quantity > 0 && (
          <span className="absolute right-2 top-2 z-10 flex h-7 min-w-7 items-center justify-center rounded-full bg-secondary px-2 text-xs font-bold text-tertiary shadow">
            {quantity}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className="min-w-0">
          <h4 className="line-clamp-2 font-amsipro text-base font-bold leading-tight text-tertiary">
            {product.product?.name}
          </h4>
          <p className="mt-1 line-clamp-2 text-xs text-stone-400">
            {product.product?.description}
          </p>
        </div>
        <p className="text-xs font-medium text-secondary-darken">
          {product?.stock} disponibles
        </p>
        <div className="mt-auto flex flex-col gap-2 pt-1 sm:flex-row sm:items-center sm:justify-between">
          <p className="num text-lg font-semibold text-primary-600">
            {formatBs(product?.price)}
          </p>
          {quantity ? (
            <div onClick={event => event.stopPropagation()}>
              <Counter
                productId={product.productId}
                quantity={quantity || 0}
                stock={getQuantityLimit(product)}
                decrement={() => {
                  quantity > 1 && decrement(product.productId)
                }}
                increment={() => {
                  canAdd && increment(product.productId)
                }}
              />
            </div>
          ) : (
            <Button
              size="sm"
              isDisabled={!canAdd}
              className="h-8 bg-primary-600 font-semibold text-white data-[hover=true]:bg-primary-darken data-[hover=true]:opacity-100"
              onClick={event => {
                event.stopPropagation()
                handleClick()
              }}
              startContent={<Plus className="h-3.5 w-3.5" strokeWidth={2.5} />}
            >
              Agregar
            </Button>
          )}
        </div>
      </div>
    </article>
  )
}

export default PointOfSaleCard
