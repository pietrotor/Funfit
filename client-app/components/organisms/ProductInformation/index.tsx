import { Button } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'

import { showSuccessToast } from '@/components/atoms/Toast/toasts'
import { useAppDispatch } from '@/store/index'
import { addToCart, TCartItem } from '@/store/slices'
import Slide from '@/components/atoms/slide'
import useProductsByIdQuery from '@/services/UseProductById'

function ProductInformation() {
  const router = useRouter()
  const { productName } = router.query
  const { data } = useProductsByIdQuery(productName as string)
  const dispatch = useAppDispatch()

  const [count, setCount] = useState(1)
  const saveData = useRef<TCartItem>({
    id: data?.getProductById?.data?.id as string,
    productName: data?.getProductById?.data?.name as string,
    quantity: count,
    price: (data?.getProductById?.data?.suggetedPrice as number * count),
    pictureUrl: ''
  })

  const addProduct = (units: number) => {
    showSuccessToast('Producto añadido exitosamente', 'success')
    saveData.current = {
      id: data?.getProductById?.data?.id as string,
      productName: data?.getProductById?.data?.name as string,
      quantity: units,
      price: data?.getProductById?.data?.suggetedPrice as number * units,
      pictureUrl: data?.getProductById?.data?.image as string
    }
    dispatch(addToCart(saveData.current))
  }
  return (
    <article className='bg-white py-10 '>
      <div className=' py-10 md:px-20 md:flex md:space-x-32 md:justify-center'>
        <div className='lg:w-1/3 '>
          <Slide
            images={[data?.getProductById?.data?.image as string]}
            infiniteLoop={false}
            radius='none'
            showArrows={true}
          />
        </div>
        <section className='p-3 space-y-4'>
          <h2 className='text-3xl text-center'>
            {data?.getProductById?.data?.name}
          </h2>
          <p className='font-bold'>
           Precio unitario Bs. {data?.getProductById?.data?.suggetedPrice}
          </p>
          <p>
            {data?.getProductById?.data?.description}
          </p>
          <section className="my-2 flex h-10 items-center justify-between rounded-md px-5 shadow-medium ">
            <h4>Unidades</h4>
            <div className="flex">
              <button
                className="me-1 w-10 rounded-s-full border-2 text-2xl hover:border-black/30"
                onClick={() => {
                  count > 1 ? setCount(count - 1) : setCount(1)
                }}
              >
                -
              </button>
              <h4 className="flex min-w-[40px] items-center justify-center">
                {count}
              </h4>
              <button
                className="ms-1 w-10 rounded-e-full border-2 text-2xl transition-all hover:border-black/30"
                onClick={() => {
                  count < 100 ? setCount(count + 1) : setCount(100)
                }}
              >
                +
              </button>
            </div>
          </section>
          <div className='flex justify-center'>
            <Button
              color="primary"
              onPress={() => {
                addProduct(count)
              }}
              className="h-14 w-64 text-lg font-bold hover:bg-primary/80 hover:shadow-lg "
            >
              Añadir al carrito
              <div>{`${data?.getProductById?.data?.suggetedPrice as number * count} Bs`}</div>
            </Button>
          </div>
          </section>
        </div>
        <h2 className='text-3xl my-4 px-20'>
          Ingredientes
        </h2>
        <p className=' px-20 '>
              asdasd
        </p>
      </article>
  )
}
export default ProductInformation
