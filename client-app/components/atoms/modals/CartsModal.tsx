import React, { useState } from 'react'
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@nextui-org/react'
import { useRouter } from 'next/router'
import Images from '../Image/Image'
import IconSelector from '../IconSelector'

import { useAppDispatch, useAppSelector } from '@/store/index'
import {
  clearCart,
  decreaseCart,
  increaseCart,
  removeFromCart,
  updateCartDetails,
  updateCartSubTotal
} from '@/store/slices'

type TProps = {
  onOpen: () => void
  onClose: () => void
  isOpen: boolean
  title?: string
  description?: string
  price?: number
  images?: string[]
}

const CartModal: React.FC<TProps> = ({
  onOpen,
  onClose,
  isOpen,
  title,
  description,
  price,
  images
}) => {
  const [showTextArea, setShowTextArea] = useState(false)
  const [actualDetails, setActualDetails] = useState('')
  const cartItems = useAppSelector(
    state => state.cartReducer.initialState.cartItems
  )
  const dispatch = useAppDispatch()
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0)
  const router = useRouter()
  const reserveOrder = () => {
    dispatch(updateCartDetails(actualDetails))
    dispatch(updateCartSubTotal(totalPrice))
    router.push('/order')
    setActualDetails('')
    setShowTextArea(false)
    onClose()
  }
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalContent>
          {close => (
            <>
              <ModalHeader className="mx-auto text-3xl font-bold">
                {title}
              </ModalHeader>
              <div className="max-h-[65vh] overflow-y-auto">
                <ModalBody>
                  {cartItems.map(item => (
                    <div
                      key={item.productName}
                      className="flex w-full items-center border-y-2 shadow-lg"
                    >
                      <div className="flex w-full flex-row items-center  p-2">
                        <Images
                          src={`${item.pictureUrl}`}
                          radius="md"
                          alt="Banner de la empresa"
                          className="h-20 w-1/4"
                          removeWrapper={true}
                        />
                        <section className="flex w-3/4 items-center justify-between">
                          <div className="flex flex-col justify-between ps-3">
                            <p className="font-bold">{item.productName}</p>
                            <p className="my-1 font-semibold">
                              Precio unitario {item.price / item.quantity} Bs
                            </p>
                            <p className="flex justify-between font-semibold">
                              <div>Precio total</div>
                              <div>{item.price} Bs</div>
                            </p>
                          </div>
                          <div className="my-2 flex h-full flex-col items-center justify-around rounded-md">
                            <div className="w-fu flex">
                              <button
                                className="w-10 rounded-s-full border-2 text-xl hover:border-black/30"
                                onClick={() => dispatch(decreaseCart(item))}
                              >
                                -
                              </button>
                              <p className="flex min-w-[40px] items-center justify-center border-y-2">
                                {item.quantity}
                              </p>
                              <button
                                className="w-10 rounded-e-full border-2 text-xl transition-all hover:border-black/30"
                                onClick={() => dispatch(increaseCart(item))}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </section>
                      </div>
                      <div className="flex cursor-pointer justify-end rounded-full pe-2">
                        <span onClick={() => dispatch(removeFromCart(item))}>
                          <IconSelector name="trash" color="text-danger" />
                        </span>
                      </div>
                    </div>
                  ))}
                  {cartItems.length > 0 ? (
                    <div className="">
                      <span
                        onClick={() => setShowTextArea(!showTextArea)}
                        className="mx-auto cursor-pointer hover:underline"
                      >{`Haga click para ${
                        showTextArea ? 'cancelar' : 'agregar'
                      } las especificaciones de su pedido`}</span>
                      <textarea
                        onChange={e => {
                          setActualDetails(e.target.value)
                        }}
                        className={`transition-all ${
                          showTextArea
                            ? 'h-24 w-full border-2 p-2 shadow-lg'
                            : 'h-0 w-full'
                        }   resize-none overflow-hidden duration-700 ease-in-out focus:outline-none`}
                        placeholder="Describa las especificaciones para su producto (espacio no obligatorio)"
                      ></textarea>
                      <hr />
                    </div>
                  ) : (
                    <h4 className="mx-auto text-gray-400">
                      No tiene agregado ningún producto a su carrito
                    </h4>
                  )}
                </ModalBody>
              </div>

              <ModalFooter className="flex w-full flex-col md:flex-row">
                <Button
                  onPress={() => dispatch(clearCart())}
                  color="warning"
                  className=" text-white shadow-md transition-all duration-500"
                  isDisabled={cartItems.length <= 0}
                >
                  <IconSelector name="trash" />
                </Button>
                <Button
                  color="primary"
                  onPress={() => reserveOrder()}
                  className="flex w-full justify-between text-white shadow-md transition-all duration-500 hover:text-gray-500"
                  isDisabled={cartItems.length <= 0}
                >
                  <p className="text-lg font-bold">Reservar pedido</p>
                  <p className="text-lg font-semibold">
                    SubTotal: {totalPrice} Bs.
                  </p>
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
export default CartModal
