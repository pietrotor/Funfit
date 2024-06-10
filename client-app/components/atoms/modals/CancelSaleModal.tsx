import { useForm } from 'react-hook-form'
import { Checkbox } from '@nextui-org/react'
import { useState } from 'react'
import { MyModal } from './MyModal'
import InputComponent from '../Input'
import { useCancelSaleQuery } from '@/services/UseCancelSaleQuery'

type TCancelSaleModal = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  saleId: string
}

export const CandelSaleModal = ({
  isOpen,
  onClose,
  onConfirm,
  saleId
}: TCancelSaleModal) => {
  const [returnCash, setReturnCash] = useState(false)
  const [returnStock, setReturnStock] = useState(false)
  const { handleSubmit, control, watch, reset } = useForm()
  const { handleCreateSale, loading } = useCancelSaleQuery()
  const onSubmit = () => {
    handleCreateSale({
      saleId,
      reason: watch('reason'),
      returnCash,
      returnStock
    })
    onConfirm()
    onClose()
    reset()
  }
  const handleCancel = () => {
    reset()
    onClose()
  }
  return (
    <MyModal
      isOpen={isOpen}
      onClose={onClose}
      title="Cancelar venta"
      message="Por favor ingrese el motivo de la cancelación y seleccione las opciones de devolución de dinero y stock."
      control={control}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
      reset={reset}
      loading={loading}
      textColor='red-600'
      bgIconColor='red-100'
      colorButon='danger '
      hoverButon='red-700'
      focusButon='red-700'
      icon='CircleMinus'
    >
      <div className="space-y-2 p-9">
        <InputComponent
          control={control}
          name="reason"
          type="textArea"
          label="Motivo de cancelación"
          rules={{
            required: {
              value: true,
              message: 'Este campo es obligatorio'
            }
          }}
        />
        <div className="md:space-x-5">
          <Checkbox color='danger' isSelected={returnCash} onValueChange={setReturnCash}>
            Devolver dinero a caja
          </Checkbox>
          <Checkbox color='danger' isSelected={returnStock} onValueChange={setReturnStock}>
            Devolver stock
          </Checkbox>
        </div>
      </div>
    </MyModal>
  )
}
