import { TPointOfSaleData } from '../../../pages/administration-panel/point-of-sale'
import IconSelector from '@/components/atoms/IconSelector'
import Counter from '@/components/molecules/Counter'
import { TProductBranchData } from '@/interfaces/TData'

type SelectedProductItemProps = {
  item: TProductBranchData
  selectedProducts: TPointOfSaleData
  setSelectedProducts: (prevProducts: TPointOfSaleData) => void
}
function SelectedProductItem({
  item,
  selectedProducts,
  setSelectedProducts
}: SelectedProductItemProps) {
  const increment = (id: string) => {
    setSelectedProducts({
      products: selectedProducts.products.map(item => {
        if (item.productId === id) {
          return {
            ...item,
            quantity: item.quantity! + 1
          }
        }
        return item
      }),
      subTotal: selectedProducts.subTotal + item.price,
      total: selectedProducts.total + item.price,
      discount: selectedProducts.discount
    })
  }

  const decrement = (id: string) => {
    setSelectedProducts({
      products: selectedProducts.products.map(item => {
        if (item.productId === id) {
          return {
            ...item,
            quantity: item.quantity! - 1
          }
        }
        return item
      }),
      subTotal: selectedProducts.subTotal - item.price,
      total: selectedProducts.total - item.price,
      discount: selectedProducts.discount
    })
  }

  const handleDelete = (id: string) => {
    setSelectedProducts({
      products: selectedProducts.products.filter(item => item.productId !== id),
      subTotal: selectedProducts.subTotal - (item.price * item.quantity!),
      total: selectedProducts.total - (item.price * item.quantity!),
      discount: selectedProducts.discount
    })
  }

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
          quantity={item.quantity!}
          decrement={() => increment(item.productId)}
          increment={() => decrement(item.productId)}
        />
      </div>
      <div className="flex h-full w-1/6 flex-col items-center justify-between">
        <p className="font-semibold">Bs. {item.price * item.quantity!}</p>
        <span
          className=" rounded-full px-1 transition hover:bg-gray-200 hover:text-danger hover:duration-300"
          onClick={() => handleDelete(item.productId)}
        >
          <IconSelector name="trash" width="w-4" />
        </span>
      </div>
    </div>
  )
}

export default SelectedProductItem
