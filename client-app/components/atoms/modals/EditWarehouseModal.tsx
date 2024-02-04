import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { MyModal } from './MyModal'
import Input from '../Input'
export type TValuesWarehouses = {
  id?: any
  name?: string
  description?: string
  address?: string
}

interface EditWarehouseModalProps {
  isOpen: boolean
  onClose: () => void
  values: TValuesWarehouses
  handleSendUpdateWarehouse: (values: TValuesWarehouses) => void
}

export const EditWarehouseModal = ({
  isOpen,
  onClose,
  values,
  handleSendUpdateWarehouse
}: EditWarehouseModalProps) => {
  const { handleSubmit, watch, control, reset } = useForm()
  const onSubmit = () => {
    handleSendUpdateWarehouse({
      id: values.id,
      name: watch('name'),
      description: watch('description'),
      address: watch('address')
    })
    reset()
    onClose()
  }
  const handleCancel = () => {
    reset()
    console.log(watch('name'))
    console.log(values.name)

    onClose()
  }
  useEffect(() => {
    reset({
      name: values.name,
      description: values.description,
      address: values.address
    })
  }, [values])

  return (
    <MyModal
      title="Editar almacen"
      message="Ingrese los datos del almacen"
      handleCancel={handleCancel}
      color="warning"
      loading={false}
      isOpen={isOpen}
      onClose={onClose}
      control={control}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
    >
      <div className=" m-auto flex w-5/6 flex-col items-center space-y-4 py-4 text-gray-500">
        <Input
          control={control}
          name="name"
          label="Nombre"
          type="text"
          defaultValue={values.name}
          rules={{
            pattern: {
              value: /^[a-zA-Z\s]+$/i,
              message: 'Solo se permiten letras'
            }
          }}
        />

        <Input
          defaultValue={values.address}
          control={control}
          name="address"
          label="Calle"
          placeholder="Calle"
          type="text"
          rules={{
            pattern: {
              value: /^[a-zA-Z\s]+$/i,
              message: 'Solo se permiten letras'
            }
          }}
        />

        <Input
          defaultValue={values.description}
          control={control}
          name="description"
          label="Descripción"
          placeholder="Descripción"
          type="textArea"
        />
      </div>
    </MyModal>
  )
}
