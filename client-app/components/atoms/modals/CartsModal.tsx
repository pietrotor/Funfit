import React, { useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@nextui-org/react'
import Images from '../Image/Image'
import { useAppSelector, useAppDispatch } from '@/components/redux/hooks'
import { increaseCart, decreaseCart, removeFromCart, clearCart, updateCartDetails, updateCartSubTotal } from '@/components/redux/features/cartSlice'
import { useRouter } from 'next/router'
import IconSelector from '../IconSelector'

type TProps = {
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
  title?: string;
  description?: string;
  price?: number;
  images?: string[];
}

const CartModal: React.FC<TProps> = ({ onOpen, onClose, isOpen, title, description, price, images }) => {
  const [showTextArea, setShowTextArea] = useState(false)
  const [actualDetails, setActualDetails] = useState('')
  const cartItems = useAppSelector((state) => state.cartReducer.initialState.cartItems)
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
      <Modal backdrop={'blur'} isOpen={isOpen} onClose={onClose} size='xl'>
        <ModalContent >
          {(close) => (
            <>
              <ModalHeader className='text-3xl font-bold mx-auto'>{title}</ModalHeader>
              <div className='max-h-[65vh] overflow-y-auto'>
                <ModalBody>
                  {
                    cartItems.map((item) => (
                      <div key={item.productName} className="flex border-y-2 shadow-lg items-center w-full">
                        <div className='w-full flex flex-row p-2  items-center'>
                          <Images src={`${item.pictureUrl}`} radius='md' alt='Banner de la empresa' className='w-1/4 h-20' removeWrapper={true} />
                          <section className='flex justify-between items-center w-3/4'>
                            <div className='flex flex-col justify-between ps-3'>
                              <p className='font-bold'>
                                {item.productName}
                              </p>
                              <p className='font-semibold my-1'>
                                Precio unitario {item.price / item.quantity} Bs
                              </p>
                              <p className='font-semibold flex justify-between'>
                                <div>Precio total</div>
                               <div>{item.price} Bs</div>
                              </p>
                            </div>
                            <div className='rounded-md h-full flex flex-col items-center my-2 justify-around'>
                              <div className='flex w-fu'>
                                <button className='w-10 border-2 hover:border-black/30 text-xl rounded-s-full'
                                  onClick={() => dispatch(decreaseCart(item))}
                                >-</button>
                                <p className='min-w-[40px] flex items-center justify-center border-y-2'>{item.quantity}</p>
                                <button className='w-10 border-2 hover:border-black/30 transition-all text-xl rounded-e-full'
                                  onClick={() => dispatch(increaseCart(item))}
                                >+</button>
                              </div>
                            </div>
                          </section>
                        </div>
                        <div className='flex justify-end rounded-full cursor-pointer pe-2'>
                          <span onClick={() => dispatch(removeFromCart(item))}><IconSelector name='trash' color='text-danger'/></span>
                        </div>
                      </div>
                    ))
                  }
                  {cartItems.length > 0
                    ? (
                      <div className=''>
                        <span onClick={() => setShowTextArea(!showTextArea)} className='mx-auto cursor-pointer hover:underline' >{`Haga click para ${showTextArea ? 'cancelar' : 'agregar'} las especificaciones de su pedido`}</span>
                        <textarea onChange={(e) => { setActualDetails(e.target.value) }} className={`transition-all ${showTextArea ? 'h-24 w-full border-2 shadow-lg p-2' : 'h-0 w-full'}   resize-none focus:outline-none overflow-hidden duration-700 ease-in-out`}
                          placeholder='Describa las especificaciones para su producto (espacio no obligatorio)'></textarea>
                        <hr />
                      </div>
                      )
                    : (
                      <h4 className='text-gray-400 mx-auto'>No tiene agregado ningún producto a su carrito</h4>
                      )}
                </ModalBody>
              </div>

              <ModalFooter className='w-full flex flex-col md:flex-row'>
                 <Button onPress={() => dispatch(clearCart())} color='warning' className=' shadow-md transition-all duration-500 text-white' isDisabled = {cartItems.length <= 0}>
                  <IconSelector name='trash'/>
                  </Button>
                <Button color="primary" onPress={ () => reserveOrder() } className='w-full flex shadow-md justify-between transition-all duration-500 text-white hover:text-gray-500' isDisabled = {cartItems.length <= 0 }>
                  <p className='font-bold text-lg'>Reservar pedido</p>
                  <p className='font-semibold text-lg'>SubTotal: {totalPrice} Bs.</p>
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent >
      </Modal >
    </>
  )
}
export default CartModal
