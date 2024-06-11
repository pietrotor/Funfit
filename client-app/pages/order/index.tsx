import OrderLayout from '@/components/templates/OrderLayout/orderLayout'
import ClientLayout from '@/components/templates/ClientLayout/ClientLayout'

import InformationCard from '@/components/molecules/Card/InformationCard'
import { useAppSelector } from '@/store/index'

function Order() {
  const cartItems = useAppSelector(state => state.cartReducer.cartItems) || []
  if (cartItems.length === 0) {
    return (
      <div className="h-full">
        <ClientLayout>
          <InformationCard
            title="¡No tienes productos en tu carrito!"
            description="Agrega productos a tu carrito para poder realizar tu compra."
            buttonText="Regresar a la tienda"
            buttonDestination="/"
            className="p-6"
          />
        </ClientLayout>
      </div>
    )
  } else {
    return (
      <div className="h-full">
        <ClientLayout hideCategories>
          <OrderLayout />
        </ClientLayout>
      </div>
    )
  }
}

export default Order
