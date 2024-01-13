import { Button } from '@nextui-org/react'
import IconSelector from '@/components/atoms/IconSelector'

type CounterProps = {
  quantity: number
  increment: (id: number) => void
  decrement: (id: number) => void
}

function Counter({ quantity, increment, decrement }: CounterProps) {
  return (
    <div className="flex w-24 items-center justify-between">
      <Button
        isIconOnly
        size="sm"
        variant="flat"
        color="secondary"
        onClick={() => decrement(quantity)}
      >
        {<IconSelector name="Minus" width="w-3" />}
      </Button>
      <span>{quantity}</span>
      <Button
        isIconOnly
        size="sm"
        variant="flat"
        color="secondary"
        onClick={() => increment(quantity)}
      >
        {<IconSelector name="Plus" width="w-3" />}
      </Button>
    </div>
  )
}

export default Counter
