import { useForm } from 'react-hook-form'
import { Button } from '@nextui-org/react'
import { MyModal } from './MyModal'
import Input from '../Input'
import { DropZone } from '@/components/molecules/DropZone'
export type TValueProductData = {
  id?: string
  name?: string
  description?: string
  cost?: number
  price?: number
  units?: string
  image?: string
  code?: string
}
  interface EditProductModalProps {
    isOpen: boolean,
    onClose: ()=> void
    values: TValueProductData
    handleSendUpdateUser: (values: TValueProductData) => void
 }

export const EditProductModal = (
  {
    isOpen,
    onClose,
    values,
    handleSendUpdateUser
  }: EditProductModalProps) => {
  const { handleSubmit, watch, control } = useForm()
  const onSubmit = () => {
    handleSendUpdateUser({
      id: values.id,
      name: watch('name'),
      description: watch('description'),
      cost: watch('cost'),
      units: watch('units')
    })
  }
  console.log(values)
  return <MyModal isOpen={isOpen} onClose={onClose}>
    <h1 className="mb-10 mt-10 text-center text-2xl font-bold">
        Editar Producto
      </h1>
      <form
        className=" m-auto flex w-5/6 flex-col items-center space-y-4 pb-9"
        onSubmit={handleSubmit(onSubmit)}>

        <Input
          control={control}
          name="name"
          type='text'
          placeholder="Nombre"
          label={'Nombre'}
          required={false}
          rules={{
            pattern: {
              value: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
              message: 'El nombre solo puede contener letras y espacios'
            }
          }}
          defaultValue={values.name}/>

        <Input
          control={control}
          name="cost"
          type='text'
          placeholder="Precio (Bs)"
          label={'Precio (Bs)'}
          defaultValue={values.cost}
          required={false}
          rules={{
            pattern: {
              value: /^[0-9]+$/i,
              message: 'Solo se permiten números'
            }
          }}/>

        <Input
          control={control}
          name="description"
          placeholder="Descripcion"
          label={'Descripcion'}
          defaultValue={values.description}
          required={false}
          rules={{
            pattern: {
              value: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
              message: 'La descripcion solo puede contener letras y espacios'
            }
          }}/>

        <Input
          control={control}
          name="units"
          type='text'
          placeholder="Unidades"
          label={'Unidades'}
          defaultValue={values.units}
          required={false}
          rules={
            {
              pattern: {
                value: /^[0-9]+$/i,
                message: 'Solo se permiten números'
              }
            }
          }
        />

        <DropZone/>

        <div className="mt-4 flex space-x-4">
          <Button type="submit" color="secondary">
            Guardar
          </Button>
          <Button onClick={ onClose } color="warning">Cancelar</Button>
        </div>
      </form>
    </MyModal>
}
