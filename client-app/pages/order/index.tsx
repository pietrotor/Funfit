import OrderLayout from '@/components/templates/OrderLayout/orderLayout'
import ClientLayout from '@/components/templates/ClientLayout/ClientLayout'
import { useAppSelector } from '@/components/redux/hooks'

import InformationCard from '@/components/molecules/Card/InformationCard'

function Order() {
  const cartItems = useAppSelector(
    state => state.cartReducer.initialState.cartItems
  )
  if (cartItems.length === 0) {
    return (
      <div className="h-full">
        <ClientLayout>
          <InformationCard
            title="¡No tienes productos en tu carrito!"
            description="Agrega productos a tu carrito para poder realizar tu compra."
            buttonText="Regresar a la tienda"
            buttonDestination="/"
            className='p-6'
          />
        </ClientLayout>
      </div>
    )
  } else {
    return (
      <div className="h-full">
        <ClientLayout>
          <OrderLayout />
        </ClientLayout>
      </div>
    )
  }
}

export default Order
