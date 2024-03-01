import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { MyModal } from './MyModal'
import InputComponent from '../Input'
import { TPriceList } from '@/interfaces/TData'
import { useCustomUpdatePriceList } from '@/hooks/UsePriceListQuery'

type TEditPriceListModal = {
  isOpen: boolean
  onClose: () => void
  onEdit: () => void
  values: TPriceList
}

export const EditPriceListModal = ({
  isOpen,
  onClose,
  onEdit,
  values
}: TEditPriceListModal) => {
  const { handleSubmit, watch, control, reset } = useForm()
  const { handleUpdatePriceList } = useCustomUpdatePriceList()

  const onSubmit = () => {
    handleUpdatePriceList({
      id: values.id,
      name: watch('name'),
      description: watch('description')
    })
    onClose()
    onEdit()
    reset()
  }

  useEffect(() => {
    reset({
      name: values.name,
      description: values.description
    })
  }, [values])

  return (
    <MyModal
      title="Editar Lista de precios"
      message="Por favor ingrese los datos de la lista de precios a editar"
      handleCancel={onClose}
      color="warning"
      loading={false}
      isOpen={isOpen}
      size="2xl"
      onClose={onClose}
      hideCloseButton={false}
      control={control}
      watch={watch}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
    >
      <div className="flex w-full flex-col items-center space-y-2 px-6 py-2 md:space-y-2">
        <InputComponent
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
        <InputComponent
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
