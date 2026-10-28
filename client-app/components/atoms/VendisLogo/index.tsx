import clsx from 'clsx'

type VendisLogoProps = {
  className?: string
}

function VendisLogo({ className }: VendisLogoProps) {
  return (
    <img
      src="/payment-methods/vendis.png"
      alt="Vendis"
      className={clsx('h-6 w-auto object-contain', className)}
    />
  )
}

export default VendisLogo
