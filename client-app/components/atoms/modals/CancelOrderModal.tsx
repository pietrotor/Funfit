import { MyModal } from './MyModal'
import InputComponent from '../Input'
import { useForm } from 'react-hook-form'
import { useCustomRejectOrder } from '@/hooks/UseOrderQuery'
import { TOrderSelected } from '@/components/molecules/Orders'

interface ICancelOrderModalProps {
  isOpen: boolean
  onClose: () => void
  onCancel: () => void
  order: TOrderSelected
}

function CancelOrderModal({
  isOpen,
  onClose,
  onCancel,
  order
}: ICancelOrderModalProps) {
  const { control, reset } = useForm()
  const { handleRejectOrder } = useCustomRejectOrder()
  const onSubmit = () => {
    handleRejectOrder(order.id)
    reset()
    onCancel()
    onClose()
  }
  return (
    <MyModal
      title={order?.type === 'cancel' ? 'Cancelar pedido' : 'Rechazar pedido'}
      message={`Por favor, ingrese el motivo  ${
        order?.type === 'cancel' ? 'de la cancelación' : 'del rechazo'
      }  del pedido.`}
      isForm={false}
      onSubmit={onClose}
      isOpen={isOpen}
      handleCancel={onClose}
      onClose={onClose}
      size={'xl'}
      control={control}
      handleSubmit={onSubmit}
      hideSuccessButton={false}
      textSuccessButton="Aceptar"
      hideCancelButton={false}
      textCancelButton="Cancelar"
      color="error"
    >
      <div className='my-5 px-10'>
        <InputComponent
          control={control}
          name="reason"
          type="textArea"
          label={`Motivo  ${
            order?.type === 'cancel' ? 'de la cancelación' : 'del rechazo'
          }  del pedido.`}
          isRequired
          rules={{
            required: {
              value: true,
              message: 'Este campo es obligatorio'
            }
          }}
        />
      </div>
    </MyModal>
  )
}

export default CancelOrderModal
