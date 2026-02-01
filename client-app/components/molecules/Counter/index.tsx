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
        variant={isDisabledRemove ? 'flat' : 'flat'}
        color={isDisabledRemove ? 'default' : 'primary'}
        onClick={() => decrement(productId)}
        disabled={isDisabledRemove}
        isDisabled={isDisabledRemove}
        className={
          isDisabledRemove
            ? '!bg-gray-100 !text-gray-300 !opacity-100 cursor-not-allowed border border-gray-200'
            : '!bg-primary/20 !text-primary hover:!bg-primary/30 active:!bg-primary/40'
        }
      >
        <IconSelector
          name="Minus"
          width="w-3"
          className={isDisabledRemove ? 'text-gray-300' : 'text-primary'}
        />
      </Button>
      <span className="font-medium text-gray-700 min-w-[24px] text-center">{quantity}</span>
      <Button
        isIconOnly
        size="sm"
        variant={isDisabledIncrement ? 'flat' : 'flat'}
        color={isDisabledIncrement ? 'default' : 'primary'}
        onClick={() => increment(productId)}
        disabled={isDisabledIncrement}
        isDisabled={isDisabledIncrement}
        className={
          isDisabledIncrement
            ? '!bg-gray-100 !text-gray-300 !opacity-100 cursor-not-allowed border border-gray-200'
            : '!bg-primary/20 !text-primary hover:!bg-primary/30 active:!bg-primary/40'
        }
      >
        <IconSelector
          name="Plus"
          width="w-3"
          className={isDisabledIncrement ? 'text-gray-300' : 'text-primary'}
        />
      </Button>
    </div>
  )
}

export default Counter
