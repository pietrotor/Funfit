import { useForm } from 'react-hook-form'
import { MyModal } from './MyModal'
import Input from '../Input'
import { DropZone } from '@/components/molecules/DropZone'
export type TValueProductData = {
  id?: any
  name?: string
  description?: string
  cost?: number
  suggetedPrice?: number
  image?: string
  code?: string
  internalCode?: string
  warehouses?: string[]
  categoryId?: string
}
interface EditProductModalProps {
  isOpen: boolean
  onClose: () => void
  values: TValueProductData
  handleSendUpdateUser: (values: TValueProductData) => void
}

export const EditProductModal = ({
  isOpen,
  onClose,
  values,
  handleSendUpdateUser
}: EditProductModalProps) => {
  const { handleSubmit, watch, control, reset } = useForm()
  const onSubmit = () => {
    handleSendUpdateUser({
      id: values.id,
      name: watch('name') === values.name ? undefined : watch('name'),
      description: watch('description'),
      cost: parseFloat(watch('cost')),
      code: watch('code') === values.code ? undefined : watch('code'),
      image: watch('image'),
      suggetedPrice: parseFloat(watch('suggetedPrice'))
    })
  }
  const handleCancel = () => {
    onClose()
    reset()
  }
  return (
    <MyModal
      title="Editar producto"
      message="Ingrese los datos del producto"
      handleCancel={handleCancel}
      color="warning"
      isOpen={isOpen}
      size="2xl"
      onClose={onClose}
      hideCloseButton={false}
      control={control}
      loading={false}
      onSubmit={onSubmit}
      reset={reset}
      handleSubmit={handleSubmit}
    >
      <div className=" m-auto flex w-5/6 flex-col items-center space-y-4 pb-9 text-gray-500">
        <div className="grid w-full grid-cols-2 gap-3 ">
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
            control={control}
            name="suggetedPrice"
            label="Precio sugerido"
            defaultValue={values.suggetedPrice?.toString()}
            placeholder="Precio sugerido"
            type="text"
            rules={{
              pattern: {
                value: /^[0-9]+$/i,
                message: 'Solo se permiten números'
              }
            }}
          />
          <Input
            control={control}
            defaultValue={values.cost?.toString()}
            name="cost"
            label="Costo"
            placeholder="Costo"
            type="text"
            rules={{
              pattern: {
                value: /^[0-9]+$/i,
                message: 'Solo se permiten números'
              }
            }}
          />
          <Input
            defaultValue={values.code}
            name="code"
            control={control}
            label="Código"
            placeholder="Código"
            type="text"
          />
        </div>

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
      <Input
      defaultValue={values.description}
      control={control}
      name='description'
      label='Descripción'
      placeholder='Descripción'
      type='textArea'
      rules={{
        pattern: {
          value: /^[a-zA-Z\s]+$/i,
          message: 'Solo se permiten letras'
        }
      }}
      />

        <DropZone />
      </div>
    </MyModal>
  )
}
