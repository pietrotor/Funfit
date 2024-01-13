import { TPointOfSaleProduct } from '../../../pages/administration-panel/point-of-sale'
import IconSelector from '@/components/atoms/IconSelector'
import Counter from '@/components/molecules/Counter'

type SelectedProductItemProps = {
  item: TPointOfSaleProduct
  increment: (id: number) => void
  decrement: (id: number) => void
  handleDelete: (id: number) => void
}
function SelectedProductItem({
  item,
  increment,
  decrement,
  handleDelete
}: SelectedProductItemProps) {
  return (
    <div
      key={item?.id}
      className="flex w-full items-center justify-between border-b-1 border-secondary/30 p-2 px-4 text-gray-500 hover:bg-secondary/10"
    >
      <div className="flex w-2/6 flex-col">
        <p className="font-semibold">{item?.name}</p>
        <p className="">Bs. {item?.price}</p>
      </div>
      <div className="flex w-2/3 justify-center">
        <Counter
          quantity={item.quantity}
          increment={() => increment(item.id)}
          decrement={() => decrement(item.id)}
        />
      </div>
      <div className="flex h-full w-1/6 flex-col items-center justify-between">
        <p className="font-semibold">
          Bs. {item.quantity ? item.quantity * item.price : 0}
        </p>
        <span
          className="hover: rounded-full px-1 transition hover:bg-gray-200 hover:text-danger hover:duration-300"
          onClick={() => handleDelete(item.id)}
        >
          <IconSelector name="trash" width="w-4" />
        </span>
      </div>
    </div>
  )
}

export default SelectedProductItem
