import OrderLayout from '@/components/templates/OrderLayout/orderLayout'
import ClientLayout from '@/components/templates/ClientLayout/ClientLayout'

function Order () {
  return (
    <div className="h-full">
        <ClientLayout>
          <OrderLayout />
        </ClientLayout>
    </div>
  )
}

export default Order
