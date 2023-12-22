import { useForm } from 'react-hook-form'
import { Button } from '@nextui-org/react'

import React from 'react'
import { MyModal } from './MyModal'
import Input from '../Input'
import Selector from '../InputSelector'

type TProps = {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
  hideCloseButton?: boolean
  onClose: () => void
  onOpen: () => void
  isOpen: boolean
}
export const ShowStocksModal = ({ isOpen, onClose, onOpen, hideCloseButton, size }: TProps) => {
  const { control } = useForm()
  return <MyModal isOpen={isOpen} onClose={onClose} hideCloseButton={hideCloseButton} size={'xl'}>
  <section className=' relative bg-[url(https://us.123rf.com/450wm/123rfexclusive/123rfexclusive2302/123rfexclusive230200151/198953137-tel%C3%A9fono-m%C3%B3vil-3d-con-concepto-de-entrega.jpg?ver=6)] bg-cover bg-center space-y-3 bg-opacity-20 '>
  <div className=' inset-0 bg-gray-100 opacity-60 p-8'>
    <h2 className=' text-center  font-extrabold text-2xl text-gray-600 '>
      Agregar Stock
    </h2>
      <form action="" className='space-y-5 '>
        <Selector
          name='type'
          label='Tipo de movimiento'
          control={control}
          placeholder='Tipo de movimiento'
          options={[
            { value: 'entrada', label: 'Entrada' },
            { value: 'salida', label: 'Salida' }
          ]}
        />
        <Input
          name = 'quantity'
          label = 'Cantidad'
          control = {control}
          placeholder='Cantidad'
          rules={{
            required: {
              value: true,
              message: 'Este campo es obligatorio'
            },
            pattern: {
              value: /^[0-9]*$/,
              message: 'Solo se permiten números'
            }
          }}
        />
        <Input
          name='date'
          label='Fecha'
          control={control}
          placeholder='Fecha'
          rules={{
            required: {
              value: true,
              message: 'Este campo es obligatorio'
            }
          }}
          type='date'
        />
        <Input
          name='detail'
          label='Detalle'
          control={control}
          placeholder='Detalle'
          rules={{
            required: {
              value: true,
              message: 'Este campo es obligatorio'
            }
          }}
          type='textArea'
          customeClassName='h-16'
        />
        <div className='flex justify-around'>
        <Button color='secondary'>
          Completar movimiento
        </Button>
        <Button color='danger'>
          Cancelar movimiento
        </Button>
        </div>
      </form>
    </div>
  </section>
  </MyModal>
}
