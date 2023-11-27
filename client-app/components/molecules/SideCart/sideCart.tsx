import Images from '@/components/atoms/Image/Image'
import { useAppSelector, useAppDispatch } from '@/components/redux/hooks'
import { increaseCart, decreaseCart, removeFromCart, TCartItem, updateCartDetails, updateCartSubTotal } from '@/components/redux/features/cartSlice'
import IconSelector from '@/components/atoms/IconSelector'
import { Button, Textarea, Tooltip } from '@nextui-org/react'
import { useState, useRef } from 'react'

function SideCart () {
  const dispatch = useAppDispatch()
  const cartItems = useAppSelector((state) => state.cartReducer.initialState.cartItems)
  const details = useAppSelector((state) => state.cartReducer.initialState.cartDetails)
  const totalPrice = useRef<number>(useAppSelector((state) => state.cartReducer.initialState.cartSubTotal))
  const [newDetails, setNewDetails] = useState(details)
  const [showTextArea, setShowTextArea] = useState(false)

  const saveDetails = () => {
    dispatch(updateCartDetails(newDetails))
    setShowTextArea(!showTextArea)
  }
  const updateSubTotal = (action: string, item: TCartItem) => {
    if (action === 'remove') {
      dispatch(removeFromCart(item))
    }
    if (action === 'increase') {
      dispatch(increaseCart(item))
    }
    if (action === 'decrease') {
      dispatch(decreaseCart(item))
    }
    totalPrice.current = cartItems.reduce((total, item) => total + item.price, 0)
    dispatch(updateCartSubTotal(totalPrice.current))
  }

  // console.log(cartItems)
  return (
    <>
      {
        cartItems.map((item, index) => (
          <div key={index} className="bg-white flex justify-around shadow-lg border items-center py-3 ps-2 rounded-sm">
            <div className='w-full'>
              <p className='font-bold text-center text-lg'>
                {item.productName}
              </p>
              <div className='w-full flex flex-row  items-center'>
                <Images src={`${item.pictureUrl}`} radius='md' alt='Banner de la empresa' className='w-3/7 h-20' removeWrapper={true} />
                <section className=' flex justify-between items-center w-full'>
                  <div className='flex flex-col justify-between w-full px-5'>
                    <p className='font-semibold flex justify-between'>
                      <div>P/U </div>
                      <div>{item.price / item.quantity} Bs</div>
                    </p>
                    <p className='font-semibold flex justify-between'>
                      <div>Total</div>
                      <div>{item.price} Bs</div>
                    </p>
                  </div>
                  <div className={`rounded-md h-full flex flex-col items-center my-2 justify-around ${cartItems.length <= 1 ? 'me-6' : ''}`}>
                    <div className='flex'>
                      <button className='w-10 border-2 hover:border-black/30 text-xl rounded-s-full'
                        onClick={() => dispatch(decreaseCart(item))}
                      >-</button>
                      <p className='min-w-[30px] flex items-center justify-center border-y-2'>{item.quantity}</p>
                      <button className='w-10 border-2 hover:border-black/30 transition-all text-xl rounded-e-full'
                        onClick={() => dispatch(increaseCart(item))}
                      >+</button>
                    </div>
                  </div>
                </section>
              </div>
            </div>
            <div className={`self-start justify-end rounded-full ${cartItems.length > 1 ? 'flex' : 'hidden '}`}>
              <span onClick={() => updateSubTotal('remove', item)}><IconSelector name='close' color='text-danger' /></span>
            </div>
          </div>
        ))
        }
        <div className=' px-4 min-h-20 bg-white border-2 w-full shadow-md'>
          {cartItems.length > 0
            ? <div className='px-5 py-3 w-full'>
                {
                  showTextArea
                    ? <div className='flex w-full justify-between items-center'>
                        <Textarea className='w-4/6' value={newDetails} onChange={ e => setNewDetails(e.target.value)} variant='faded'/>
                        <Button className=' cursor-pointer bg-white border-2 w-1/6' onClick={() => saveDetails()}><IconSelector name='check' color='text-secondary' /></Button>
                     </div>
                    : <div className='flex w-full space-x-5 items-center' ><p className='font-semibold'>Especificaciones: {newDetails}</p>
                  <Tooltip
                  content={<p className='text-black'>Editar</p>}
                  placement='bottom'
                    >
                  <Button className=' cursor-pointer bg-white border-2 w-1/6 ' onClick={() => setShowTextArea(!showTextArea)}><IconSelector name='edit' color='text-primary' /></Button>

    </Tooltip></div>
                }
                <div className='flex justify-between items-center pt-2'>
                  <p className='font-bold text-lg'>sub Total</p>
                  <p className='font-bold text-lg'>{ cartItems.reduce((total, item) => total + item.price, 0)} Bs</p>
                </div>
              </div>
            : <div className='flex justify-center items-center h-full'>
                <p className='font-bold text-lg'>No hay productos</p>
              </div>
          }
        </div>
    </>
  )
}
export default SideCart
