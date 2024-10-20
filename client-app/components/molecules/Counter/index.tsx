import { Button } from '@nextui-org/react'
import { useMemo } from 'react'
import IconSelector from '@/components/atoms/IconSelector'

type CounterProps = {
  productId: string
  quantity: number
  stock?: number
  increment: (id: string) => void
  decrement: (id: string) => void
}

function Counter({
  productId,
  quantity,
  stock,
  increment,
  decrement
}: CounterProps) {
  const isDisabledIncrement = useMemo(() => {
    if (typeof stock === 'number') {
      return quantity >= stock
    }

    return false
  }, [quantity, stock])

  const isDisabledRemove = useMemo(() => {
    if (quantity <= 1) return true

    return false
  }, [quantity])

  return (
    <div className="flex w-24 items-center justify-between">
      <Button
        isIconOnly
        size="sm"
        variant="flat"
        color="primary"
        onClick={() => decrement(productId)}
        disabled={isDisabledRemove}
        isDisabled={isDisabledRemove}
      >
        <IconSelector name="Minus" width="w-3" />
      </Button>
      <span>{quantity}</span>
      <Button
        isIconOnly
        size="sm"
        variant="flat"
        color="primary"
        onClick={() => increment(productId)}
        disabled={isDisabledIncrement}
        isDisabled={isDisabledIncrement}
      >
        {<IconSelector name="Plus" width="w-3" />}
      </Button>
    </div>
  )
}

export default Counter
