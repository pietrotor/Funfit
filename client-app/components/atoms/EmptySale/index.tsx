import IconSelector from '../IconSelector'

function EmptySale() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <div className="flex flex-col items-center justify-center">
        <IconSelector
          name="cart"
          width="md:w-20 w-10"
          height="md:h-20 h-10"
          color="text-gray-500"
        />
        <p className="md:text-2xl text-md font-bold text-gray-500">No tiene productos añadidos</p>
        <p className="md:text-xl text-sm text-gray-500">Acá verá los productos añadidos para su venta</p>
      </div>
    </div>
  )
}

export default EmptySale
