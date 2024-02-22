import { MyModal } from './MyModal'
import { TOrderDetails } from '@/components/molecules/Orders'

interface IOrderDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  details: TOrderDetails
}

function OrderDetailsModal({
  isOpen = true,
  onClose,
  details
}: IOrderDetailsModalProps) {
  return (
    <MyModal
      title="Detalles del pedido"
      message="A continuación se muestra el detalle del pedido"
      isForm={false}
      onSubmit={onClose}
      isOpen={isOpen}
      handleCancel={onClose}
      onClose={onClose}
      hideCloseButton={false}
      hideSuccessButton
      size={'xl'}
    >
      <section className=" relative space-y-3  bg-cover bg-center px-8 ">
        <div className="m-5 flex justify-between">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-500">Cliente:</h3>
              <p>{details.client}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-500">
                Método de pago:
              </h3>
              <p>
                {details.paymentMethod === 'CASH' ? 'Efectivo' : details.paymentMethod === 'CARD' ? 'Tarjeta' : 'Pago por QR'}
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-500">
                Detalles del pedido:
              </h3>
              <p>{details.details || 'No hay detalles descritos'}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-500">
                Método de entrega:
              </h3>
              <p>
                {details.deliveryMethod === 'PICKUP' ? 'Recojo en sucursal' : 'Entrega a domicilio'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </MyModal>
  )
}

export default OrderDetailsModal
