import IconSelector from '../IconSelector'

function EmptySale() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <div className="flex flex-col items-center justify-center">
        <IconSelector
          name="cart"
          width="w-20"
          height="h-20"
          color="text-gray-500"
        />
        <p className="text-2xl font-bold text-gray-500">No tiene productos añadidos</p>
        <p className="text-xl text-gray-500">Acá verá los productos añadidos para su venta</p>
      </div>
    </div>
  )
}

export default EmptySale
