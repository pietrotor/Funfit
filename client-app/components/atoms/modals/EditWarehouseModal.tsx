import { useForm } from 'react-hook-form'
import { Button } from '@nextui-org/react'
import { MyModal } from './MyModal'
import Input from '../Input'
export type TValuesWarehouses = {
    id?: number
    name?: string
    description?: string
    address?: string
  }

  interface EditWarehouseModalProps {
    isOpen: boolean,
    onClose: ()=> void
    values: TValuesWarehouses
    handleSendUpdateWarehouse: (values: TValuesWarehouses) => void
 }

export const EditWarehouseModal = (
  {
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
  return <MyModal isOpen={isOpen} onClose={onClose}>
    <h1 className="mb-10 mt-10 text-center text-3xl font-bold text-gray-500">
        Editar Almacén
      </h1>
      <form
        className=" m-auto flex w-5/6 flex-col items-center space-y-4 pb-9 text-gray-500"
        onSubmit={handleSubmit(onSubmit)}>
          <Input
          control={control}
          name='name'
          label='Nombre'
          placeholder='Nombre'
          type='text'
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
        name='address'
        label='Calle'
        placeholder='Calle'
        type='text'
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
      name='description'
      label='Descripción'
      placeholder='Descripción'
      type='textArea'
      customeClassName='h-20'
      rules={{
        pattern: {
          value: /^[a-zA-Z\s]+$/i,
          message: 'Solo se permiten letras'
        }
      }}
      />
        <div className="mt-4 flex space-x-4">
          <Button type="submit" color="secondary">
            Guardar
          </Button>
          <Button onClick={ onClose } color="warning">Cancelar</Button>
        </div>
      </form>
    </MyModal>
}
