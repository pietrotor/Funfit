import { useForm } from 'react-hook-form'
import { Button } from '@nextui-org/react'

import { MyModal } from './MyModal'
import Input from '../Input'
import { showSuccessToast } from '../Toast/toasts'
import { DropZone } from '@/components/molecules/DropZone'

import { StatusEnum, useCreateProductMutation } from '@/graphql/graphql-types'

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: () => void;
}

export const AddProductModal = ({ isOpen, onClose, onAdd }: AddProductModalProps) => {
  const { handleSubmit, watch, control, reset } = useForm()
  const [createProduct] = useCreateProductMutation()
  const onSubmit = () => {
    createProduct({
      variables: {
        createProductInput: {
          cost: parseFloat(watch('cost')),
          code: watch('code'),
          description: watch('description'),
          image: watch('image'),
          name: watch('name'),
          price: parseFloat(watch('price')),
          units: watch('units'),
          warehouses: ['65783b570062575573f82cba']
        }
      },
      onCompleted: data => {
        if (data.createProduct?.status === StatusEnum.ERROR) {
          showSuccessToast(data.createProduct.message || 'Ocurrio un error', 'error')
        } else {
          showSuccessToast(data.createProduct?.message || 'Producto guardado correctamente', 'success')
          onClose()
          reset()
          onAdd()
        }
      }
    })
  }
  return <MyModal isOpen = { isOpen } onClose={onClose}>
    <section>
    <h1 className="mt-5 text-center text-2xl font-bold">
      Agregar Producto
    </h1>
    <form action="" onSubmit={handleSubmit(onSubmit)} className='p-4 md:p-8'>
      <Input
      control={control}
      name='name'
      label='Nombre'
      placeholder='Nombre'
      type='text'
      rules={{
        required: {
          value: true,
          message: 'Este campo es obligatorio'
        },
        pattern: {
          value: /^[a-zA-Z\s]+$/i,
          message: 'Solo se permiten letras'
        }
      }}
      />
      <Input
      control={control}
      name='price'
      label='Precio'
      placeholder='Precio'
      type='text'
      rules={{
        required: {
          value: true,
          message: 'Este campo es obligatorio'
        },
        pattern: {
          value: /^[0-9]+$/i,
          message: 'Solo se permiten números'
        }
      }}
      />
      <Input
      control={control}
      name='cost'
      label='Costo'
      placeholder='Costo'
      type='text'
      rules={{
        required: {
          value: true,
          message: 'Este campo es obligatorio'
        },
        pattern: {
          value: /^[0-9]+$/i,
          message: 'Solo se permiten números'
        }
      }}
      />
      <Input
      control={control}
      name='units'
      label='Unidades'
      placeholder='Unidades'
      type='text'
      rules={{
        required: {
          value: true,
          message: 'Este campo es obligatorio'
        },
        pattern: {
          value: /^[0-9]+$/i,
          message: 'Solo se permiten números'
        }
      }}
      />
      <Input
      name='code'
      control={control}
      label='Código'
      placeholder='Código'
      type='text'
      rules={{
        required: {
          value: true,
          message: 'Este campo es obligatorio'
        }
      }}
      />
      <Input
      control={control}
      name='description'
      label='Descripción'
      placeholder='Descripción'
      type='text'
      rules={{
        required: {
          value: true,
          message: 'Este campo es obligatorio'
        },
        pattern: {
          value: /^[a-zA-Z\s]+$/i,
          message: 'Solo se permiten letras'
        }
      }}
      />
      <DropZone/>
      <div className='flex space-x-6 mt-6 justify-center'>
        <Button type="submit" color="secondary" className="w-1/7">
          Agregar
        </Button>
        <Button color='primary' className="w-1/7" >
          Cancelar
        </Button>
      </div>
    </form>
    </section>
  </MyModal>
}
