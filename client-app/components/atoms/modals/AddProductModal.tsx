import { useForm } from 'react-hook-form'
import { Button } from '@nextui-org/react'

import { MyModal } from './MyModal'
import Input from '../Input'
import { DropZone } from '@/components/molecules/DropZone'
interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddProductModal = ({ isOpen, onClose }: AddProductModalProps) => {
  const { handleSubmit, watch, control } = useForm()
  const onSubmit = () => {
    console.log(watch())
  }
  return <MyModal isOpen = { isOpen } onClose={onClose}>
    <section>
    <h1 className="mb-10 mt-10 text-center text-2xl font-bold">
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
      name='cost'
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
