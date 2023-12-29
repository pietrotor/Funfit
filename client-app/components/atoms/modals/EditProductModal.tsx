import { useForm } from 'react-hook-form'
import { Button } from '@nextui-org/react'
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
      name: watch('name') === values.name ? undefined : watch('name'),
      description: watch('description'),
      cost: parseFloat(watch('cost')),
      code: watch('code'),
      image: watch('image'),
      suggetedPrice: parseFloat(watch('suggetedPrice'))
    })
  }
  console.log(values)
  return <MyModal isOpen={isOpen} onClose={onClose}>
    <h1 className="mb-10 mt-10 text-center text-3xl font-bold text-gray-500">
        Editar Producto
      </h1>
      <form
        className=" m-auto flex w-5/6 flex-col items-center space-y-4 pb-9 text-gray-500"
        onSubmit={handleSubmit(onSubmit)}>
        <div className='grid grid-cols-2 w-full gap-3 '>
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
          control={control}
          name='suggetedPrice'
          label='Precio sugerido'
          defaultValue={values.suggetedPrice?.toString()}
          placeholder='Precio sugerido'
          type='text'
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
          name='cost'
          label='Costo'
          placeholder='Costo'
          type='text'
          rules={{
            pattern: {
              value: /^[0-9]+$/i,
              message: 'Solo se permiten números'
            }
          }}
          />
          <Input
          defaultValue={values.code}
          name='code'
          control={control}
          label='Código'
          placeholder='Código'
          type='text'
          />
        </div>

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

        <DropZone/>

        <div className="grid h-16 grid-cols-2 gap-3 w-full">
          <Button type="submit" color="secondary" className='h-full font-bold'>
            Guardar
          </Button>
          <Button onClick={ onClose } variant="flat" color="warning" className='h-full font-bold'>Cancelar</Button>
        </div>
      </form>
    </MyModal>
}
