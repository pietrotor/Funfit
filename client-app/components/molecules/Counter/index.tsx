import { Button } from '@nextui-org/react'
import IconSelector from '@/components/atoms/IconSelector'

type CounterProps = {
  productId: string
  quantity: number
  increment: (id: string) => void
  decrement: (id: string) => void
}

function Counter({ productId, quantity, increment, decrement }: CounterProps) {
  return (
    <div className="flex w-24 items-center justify-between">
      <Button
        isIconOnly
        size="sm"
        variant="flat"
        color="secondary"
        onClick={ () => decrement(productId) }
      >
        {<IconSelector name="Minus" width="w-3" />}
      </Button>
      <span>{quantity}</span>
      <Button
        isIconOnly
        size="sm"
        variant="flat"
        color="secondary"
        onClick={ () => increment(productId) }
      >
        {<IconSelector name="Plus" width="w-3" />}
      </Button>
    </div>
  )
}

export default Counter
