'use client'
import React, { useState, useRef } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@nextui-org/react'
import Slide from '../../molecules/Slide/slide'
import { useAppDispatch } from '@/components/redux/hooks'
import { addToCart, TCartItem } from '@/components/redux/features/cartSlice'
import { showSuccessToast } from '../Toast/toasts'
type TProps = {
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
  title: string;
  description: string;
  price: number;
  images: string[];
}

const ProductModal: React.FC<TProps> = ({ onOpen, onClose, isOpen, title, description, price, images }) => {
  const dispatch = useAppDispatch()
  const [count, setCount] = useState(1)
  const data = useRef<TCartItem>({ productName: title, quantity: count, price: price * count, pictureUrl: '' })
  const close = () => {
    onClose()
    setCount(1)
  }
  const addProduct = (units:number) => {
    showSuccessToast('Producto añadido exitosamente', 'success')
    data.current = { productName: title, quantity: units, price: price * units, pictureUrl: images[0] }
    dispatch(addToCart(data.current))
    close()
  }
  return (
    <>
      <Modal backdrop={'blur'} isOpen={isOpen} onClose={close} size='lg'>
        <ModalContent >
          {(close) => (
            <>
              <ModalHeader className="flex flex-col items-center text-3xl font-bold">{title}</ModalHeader>
              <ModalBody className='flex px-10'>
                <Slide images={images} />
                <div className='grid grid-cols-5 gap-1 '>
                  <div className='col-start-1 col-end-5 px-2'>
                    <h3>Descripción:</h3>
                    <p className=''>
                    {description}
                    </p>
                  </div>
                  <div className='col-start-5 flex items-center'>
                    <span className='md:rounded-full rounded-md w-full bg-primary p-3 text-center font-bold text-white'>
                    {price} Bs
                    </span>
                  </div>
                </div>
                <section className='shadow-medium rounded-md h-10 flex justify-between items-center px-5 my-2 '>
                  <h4>Unidades</h4>
                  <div className='flex'>
                  <button className='w-10 border-2 hover:border-black/30 me-1 text-2xl rounded-s-full'
                  onClick={() => { count > 1 ? setCount(count - 1) : setCount(1) }}
                  >-</button>
                  <h4 className='min-w-[40px] flex items-center justify-center'>{count}</h4>
                  <button className='w-10 border-2 hover:border-black/30 transition-all ms-1 text-2xl rounded-e-full'
                  onClick={ () => { count < 100 ? setCount(count + 1) : setCount(100) } }
                  >+</button>
                  </div>
                </section>
                <hr className='' />
              </ModalBody>
              <ModalFooter className='mx-auto'>
                <Button color="primary" onPress={() => { addProduct(count) }} className='w-64 h-14 text-lg font-bold hover:bg-primary/80 hover:shadow-lg ' >
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
