import { useForm } from 'react-hook-form'
import { MyModal } from './MyModal'

import { showSuccessToast } from '../Toast/toasts'
import Input from '../Input'
import { StatusEnum, useCreateWarehouseMutation } from '@/graphql/graphql-types'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  onAddWarehouse: () => void
}

export const AddWarehouseModal = ({
  isOpen,
  onClose,
  onAddWarehouse
}: ModalProps) => {
  const [createWarehouse, { loading }] = useCreateWarehouseMutation()
  const { handleSubmit, control, watch, reset } = useForm()
  const onSubmit = () => {
    createWarehouse({
      variables: {
        createWarehouseInput: {
          name: watch('name'),
          description: watch('description'),
          address: watch('address')
        }
      },
      onCompleted: data => {
        if (data.createWarehouse?.status === StatusEnum.ERROR) {
          showSuccessToast(
            data.createWarehouse.message || 'Error al crear un usuario',
            'error'
          )
          return
        }
        showSuccessToast(
          data.createWarehouse?.message || 'Usuario creado correctamente',
          'success'
        )
        onAddWarehouse()
        onClose()
        reset()
      }
    })

    // console.log(watch())
  }
  const handleCancel = () => {
    reset()
    onClose()
  }
  return (
    <MyModal
      title="Agregar almacén"
      message="Ingrese los datos del almacén"
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
      <div className="flex w-full flex-col md:space-y-2 items-center space-y-2 px-6 py-2">
        <Input
          control={control}
          name="name"
          type="text"
          label="Nombre"
          rules={{
            required: {
              value: true,
              message: 'Este campo es obligatorio'
            }
          }}
        />
        <Input
          control={control}
          name="address"
          type="text"
          label="Calle"
          rules={{
            required: {
              value: true,
              message: 'Este campo es obligatorio'
            }
          }}
        />
        <Input
          control={control}
          name="description"
          type="textArea"
          label="Descripción"
          rules={{
            required: { value: true, message: 'Este campo es obligatorio' },
            pattern: {
              value: /^[a-zA-Z\s]+$/i,
              message: 'Solo se permiten letras'
            }
          }}
        />
      </div>
    </MyModal>
  )
}
