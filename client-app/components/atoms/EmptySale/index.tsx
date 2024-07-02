import IconSelector from '../IconSelector'

function EmptySale() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center justify-center">
        <IconSelector
          name="cart"
          width="md:w-20 w-10"
          height="md:h-20 h-10"
          color="text-gray-500"
        />
        <p className="text-md font-bold text-gray-500 md:text-2xl text-center">
          No tiene productos añadidos
        </p>
        <p className="text-sm text-gray-500 md:text-xl text-center">
          Acá verá los productos añadidos para su venta
        </p>
      </div>
    </div>
  )
}

export default EmptySale
