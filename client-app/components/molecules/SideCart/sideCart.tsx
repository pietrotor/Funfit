import { Button, Textarea, Tooltip } from '@nextui-org/react'
import { useRef, useState } from 'react'
import Images from '@/components/atoms/Image/Image'

import IconSelector from '@/components/atoms/IconSelector'
import { useAppDispatch, useAppSelector } from '@/store/index'
import {
  decreaseCart,
  increaseCart,
  removeFromCart,
  TCartItem,
  updateCartDetails,
  updateCartSubTotal
} from '@/store/slices'

function SideCart() {
  const dispatch = useAppDispatch()
  const cartItems = useAppSelector(
    state => state.cartReducer.initialState.cartItems
  )
  const details = useAppSelector(
    state => state.cartReducer.initialState.cartDetails
  )
  const totalPrice = useRef<number>(
    useAppSelector(state => state.cartReducer.initialState.cartSubTotal)
  )
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
    totalPrice.current = cartItems.reduce(
      (total, item) => total + item.price,
      0
    )
    dispatch(updateCartSubTotal(totalPrice.current))
  }

  // console.log(cartItems)
  return (
    <>
      {cartItems.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-around rounded-sm border bg-white py-3 ps-2 shadow-lg"
        >
          <div className="w-full">
            <p className="text-center text-lg font-bold">{item.productName}</p>
            <div className="flex w-full flex-row  items-center">
              <Images
                src={`${item.pictureUrl}`}
                radius="md"
                alt="Banner de la empresa"
                className="w-3/7 h-20"
                removeWrapper={true}
              />
              <section className=" flex w-full items-center justify-between">
                <div className="flex w-full flex-col justify-between px-5">
                  <p className="flex justify-between font-semibold">
                    <div>P/U </div>
                    <div>{item.price / item.quantity} Bs</div>
                  </p>
                  <p className="flex justify-between font-semibold">
                    <div>Total</div>
                    <div>{item.price} Bs</div>
                  </p>
                </div>
                <div
                  className={`my-2 flex h-full flex-col items-center justify-around rounded-md ${
                    cartItems.length <= 1 ? 'me-6' : ''
                  }`}
                >
                  <div className="flex">
                    <button
                      className="w-10 rounded-s-full border-2 text-xl hover:border-black/30"
                      onClick={() => dispatch(decreaseCart(item))}
                    >
                      -
                    </button>
                    <p className="flex min-w-[30px] items-center justify-center border-y-2">
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
          </div>
          <div
            className={`justify-end self-start rounded-full ${
              cartItems.length > 1 ? 'flex' : 'hidden '
            }`}
          >
            <span onClick={() => updateSubTotal('remove', item)}>
              <IconSelector name="close" color="text-danger" />
            </span>
          </div>
        </div>
      ))}
      <div className=" min-h-20 w-full border-2 bg-white px-4 shadow-md">
        {cartItems.length > 0 ? (
          <div className="w-full px-5 py-3">
            {showTextArea ? (
              <div className="flex w-full items-center justify-between">
                <Textarea
                  className="w-4/6"
                  value={newDetails}
                  onChange={e => setNewDetails(e.target.value)}
                  variant="faded"
                />
                <Button
                  className=" w-1/6 cursor-pointer border-2 bg-white"
                  onClick={() => saveDetails()}
                >
                  <IconSelector name="check" color="text-secondary" />
                </Button>
              </div>
            ) : (
              <div className="flex w-full items-center space-x-5">
                <p className="font-semibold">Especificaciones: {newDetails}</p>
                <Tooltip
                  content={<p className="text-black">Editar</p>}
                  placement="bottom"
                >
                  <Button
                    className=" w-1/6 cursor-pointer border-2 bg-white "
                    isIconOnly
                    onClick={() => setShowTextArea(!showTextArea)}
                  >
                    <IconSelector name="edit" color="text-primary" />
                  </Button>
                </Tooltip>
              </div>
            )}
            <div className="flex items-center justify-between pt-2">
              <p className="text-lg font-bold">sub Total</p>
              <p className="text-lg font-bold">
                {cartItems.reduce((total, item) => total + item.price, 0)} Bs
              </p>
            </div>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-lg font-bold">No hay productos</p>
          </div>
        )}
      </div>
    </>
  )
}
export default SideCart
