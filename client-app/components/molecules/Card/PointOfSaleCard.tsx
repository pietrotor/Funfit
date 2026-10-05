import { Badge, Button, Image } from '@nextui-org/react'
import React, { SetStateAction } from 'react'
import Counter from '../Counter'
import { TPointOfSaleData } from '../../../pages/administration-panel/point-of-sale'
import { TProductBranchData } from '@/interfaces/TData'
import { DEFAULT_IMAGE } from '@/lib/constants'
import IconSelector from '@/components/atoms/IconSelector'
import { useProductHandler } from '@/hooks/useProductsHandler'
import { canIncrementQuantity, getQuantityLimit } from '@/utils/pointOfSale'

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
  isLoading = false,
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
    <Badge
      content={quantity}
      color="secondary"
      size="lg"
      variant="shadow"
      className="hidden"
    >
      <div
        className=" flex w-full flex-col justify-between rounded-lg bg-white p-2 shadow transition-all duration-300 hover:cursor-pointer hover:shadow-xl"
        onClick={handleClick}
      >
        <div className="flex flex-col gap-2 lg:flex-row">
          <div className="m-auto w-full lg:m-0 lg:w-[100px]">
            <Image
              alt="Product image"
              removeWrapper
              src={product.product?.image || DEFAULT_IMAGE}
              className="m-auto aspect-square w-full rounded border-b object-cover object-center"
            />
          </div>
          <div className="flex-1 ">
            <h4 className="text-secondary">{product.product?.name}</h4>
            <p className="text-clamp-2  mt-1 text-xs text-gray-400 ">
              {product.product?.description}
            </p>
            <p className="pt-3 text-sm font-semibold text-gray-400">
              {product?.stock} Disponible
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-1 pt-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h5 className="text-xl font-bold text-primary">
              {product?.price?.toFixed(2)?.toLocaleString()}{' '}
              <span className="text-sm ">Bs.</span>
            </h5>
          </div>
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
              variant="solid"
              color="primary"
              size="sm"
              onClick={event => {
                event.stopPropagation()
                handleClick()
              }}
              isDisabled={!canAdd}
            >
              <IconSelector name="Plus" width="w-3" />
              <span className="font-bold">Agregar</span>
            </Button>
          )}
        </div>
      </div>
    </Badge>
  )
}
export default PointOfSaleCard
