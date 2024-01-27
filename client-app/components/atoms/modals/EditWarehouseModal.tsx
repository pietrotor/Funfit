import { useForm } from 'react-hook-form'
import { MyModal } from './MyModal'
import Input from '../Input'
export type TValuesWarehouses = {
  id?: number
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
  const { handleSubmit, watch, control } = useForm()
  const onSubmit = () => {
    handleSendUpdateWarehouse({
      id: values.id,
      name: watch('name'),
      description: watch('description'),
      address: watch('address')
    })
  }
  return (
    <MyModal
      title="Editar almacen"
      message="Ingrese los datos del almacen"
      handleCancel={onClose}
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
          placeholder="Nombre"
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
          customeClassName="h-20"
          rules={{
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
