import { ShoppingBasket } from 'lucide-react'

function EmptySale() {
  return (
    <div className="flex h-full min-h-[220px] w-full flex-col items-center justify-center px-6 py-10 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/20 text-secondary-darken">
        <ShoppingBasket className="h-8 w-8" strokeWidth={1.5} />
      </div>
      <p className="font-amsipro text-xl font-bold text-tertiary">
        El ticket está vacío
      </p>
      <p className="mt-1 max-w-[16rem] text-sm text-stone-500">
        Agrega productos y aparecen acá para cobrar la venta.
      </p>
    </div>
  )
}

export default EmptySale
