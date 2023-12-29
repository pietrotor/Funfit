'use client'
import React, { useRef, useState } from 'react'
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@nextui-org/react'
import Slide from '../../molecules/Slide/slide'
import { showSuccessToast } from '../Toast/toasts'
import { useAppDispatch } from '@/components/redux/hooks'
import { addToCart, TCartItem } from '@/components/redux/features/cartSlice'
type TProps = {
  onOpen: () => void
  onClose: () => void
  isOpen: boolean
  title: string
  description: string
  price: number
  images: string[]
}

const ProductModal: React.FC<TProps> = ({
  onOpen,
  onClose,
  isOpen,
  title,
  description,
  price,
  images
}) => {
  const dispatch = useAppDispatch()
  const [count, setCount] = useState(1)
  const data = useRef<TCartItem>({
    productName: title,
    quantity: count,
    price: price * count,
    pictureUrl: ''
  })
  const close = () => {
    onClose()
    setCount(1)
  }
  const addProduct = (units: number) => {
    showSuccessToast('Producto añadido exitosamente', 'success')
    data.current = {
      productName: title,
      quantity: units,
      price: price * units,
      pictureUrl: images[0]
    }
    dispatch(addToCart(data.current))
    close()
  }
  return (
    <>
      <Modal isOpen={isOpen} onClose={close} size="lg" isDismissable={false}>
        <ModalContent>
          {close => (
            <>
              <ModalHeader className="flex flex-col items-center text-3xl font-bold">
                {title}
              </ModalHeader>
              <ModalBody className="flex px-10">
                <Slide images={images} />
                <div className="grid grid-cols-5 gap-1 ">
                  <div className="col-start-1 col-end-5 px-2">
                    <h3>Descripción:</h3>
                    <p className="">{description}</p>
                  </div>
                  <div className="col-start-5 flex items-center">
                    <span className="w-full rounded-md bg-primary p-3 text-center font-bold text-white md:rounded-full">
                      {price} Bs
                    </span>
                  </div>
                </div>
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
                <hr className="" />
              </ModalBody>
              <ModalFooter className="mx-auto">
                <Button
                  color="primary"
                  onPress={() => {
                    addProduct(count)
                  }}
                  className="h-14 w-64 text-lg font-bold hover:bg-primary/80 hover:shadow-lg "
                >
                  Añadir al carrito
                  <div>{`${price * count} Bs`}</div>
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
export default ProductModal
