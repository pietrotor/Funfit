import { useForm } from 'react-hook-form'
import { MyModal } from './MyModal'
import Input from '../Input'
import { useCustomCreatePriceList } from '@/hooks/UsePriceListQuery'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  onAdd: () => void
}

export const AddListModal = ({ isOpen, onClose, onAdd }: ModalProps) => {
  const { handleCreatePriceList, loading } = useCustomCreatePriceList()
  const { handleSubmit, control, watch, reset } = useForm()
  const onSubmit = () => {
    handleCreatePriceList(watch('name'), watch('description'))
    reset()
    onClose()
    onAdd()
  }
  const handleCancel = () => {
    reset()
    onClose()
  }
  return (
    <MyModal
      title="Agregar lista de precios"
      message="Ingrese los datos de la nueva lista de precios"
      color="success"
      handleCancel={handleCancel}
      loading={loading}
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      control={control}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      reset={reset}
    >
      <div className="flex w-full flex-col items-center space-y-2 px-6 py-2 md:space-y-2">
        <Input
          control={control}
          name="name"
          type="text"
          label="Nombre"
          rules={{
            required: {
              value: true,
              message: 'Este campo es obligatorio'
            },
            pattern: {
              value: /^[a-zA-ZÁáÉéÍíÓóÚúÜüÑñ\s]+$/,
              message: 'Solo se permiten letras'
            }
          }}
        />
        <Input
          control={control}
          name="description"
          type="textArea"
          label="Descripción"
          rules={{
            required: {
              value: true,
              message: 'Este campo es obligatorio'
            },
            pattern: {
              value: /^[a-zA-ZÁáÉéÍíÓóÚúÜüÑñ\s]+$/,
              message: 'Solo se permiten letras'
            }
          }}
        />
      </div>
    </MyModal>
  )
}
