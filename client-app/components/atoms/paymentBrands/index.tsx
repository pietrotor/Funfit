import clsx from 'clsx'

type MarkProps = {
  className?: string
}

export function CardBrands({ className }: MarkProps) {
  return (
    <img
      src="/payment-methods/visa-mastercard.jpg"
      alt="Visa y Mastercard"
      className={clsx('w-auto object-contain', className ?? 'h-8')}
    />
  )
}

export function PedidosYaLogo({ className }: MarkProps) {
  return (
    <img
      src="/payment-methods/pedidosya.jpg"
      alt="PedidosYa"
      className={clsx('w-auto rounded-md object-contain', className ?? 'h-8')}
    />
  )
}
