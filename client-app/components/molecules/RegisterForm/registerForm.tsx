import React from 'react'
import { Input, Button } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'

type Props = {
  goToStep: (p: number) => void;
  currentStepIndex: number;
};

type TData = {
  name: string;
  lastName: string;
  email: string;
  phone: string;
};

function RegisterForm ({ goToStep, currentStepIndex }: Props) {
  const { control, handleSubmit } = useForm<TData>()
  const router = useRouter()

  const onSubmit: SubmitHandler<TData> = (data) => {
    console.log(data)
    goToStep(currentStepIndex + 1)
  }

  return (
      <form id='myForm' className='h-full w-full p-5 flex flex-col justify-between text-center space-y-5' onSubmit={handleSubmit(onSubmit)}>
        <h2 className='text-gray-500 md:pb-6'>Datos de contacto</h2>
        <div className='flex justify-around items-center flex-col md:flex-row mb-5'>
          <div className='md:space-y-8 md:px-6 md:w-1/2 w-full '>
            <div className='text-left'>
              <label className='text-xl font-semibold'>Nombre</label>
              <Controller
              name='name'
              control={control}
              rules={{ required: true }}
              render={({ field, formState: { errors } }) => (
                <Input {...field} validationState={`${errors.name ? 'invalid' : 'valid'}`} errorMessage={errors.name?.message} variant={'bordered'} placeholder="Ingresa tu nombre" />
              )}
            />
            </div>
            <div className='text-left  '>
              <label className='text-xl font-semibold'>Apellido</label>
              <Controller
              name='lastName'
              control={control}
              rules={{ required: true }}
              render={({ field, formState: { errors } }) => (
                <Input {...field} validationState={`${errors.lastName ? 'invalid' : 'valid'}`} errorMessage={errors.lastName?.message} variant={'bordered'} placeholder="Ingresa tu apellido" />
              )}
              />
            </div>
          </div>
          <div className='md:space-y-8 md:px-6 md:w-1/2 w-full '>
            <div className='text-left'>
              <label className='text-xl font-semibold'>Celular</label>
              <Controller
              name='phone'
              control={control}
              rules={{ required: true, maxLength: 8, minLength: 8, pattern: /^[0-9]*$/ }}
              render={({ field, formState: { errors } }) => (
                <Input {...field} validationState={`${errors.phone ? 'invalid' : 'valid'}`} errorMessage={errors.phone?.message} variant={'bordered'} placeholder="Ingrese su número de celular" />
              )}
            />
            </div>
            <div className='text-left  font-semibold '>
              <label className='text-xl'>Email</label>
              <Controller
              name='email'
              control={control}
              rules={{ required: true, pattern: /^\S+@\S+$/i }}
              render={({ field, formState: { errors } }) => (
                <Input {...field} validationState={`${errors.email ? 'invalid' : 'valid'}`} errorMessage={errors.email?.message} variant={'bordered'} placeholder="Ingrese su email" />
              )}
              />
            </div>
          </div>
        </div>
        <div className='flex justify-between px-6  items-center '>
        <Button onClick={() => router.push('/')} color='primary' className='w-1/4'>
          Atrás
        </Button>
        <Button form='myForm' type='submit' color='primary' className='w-1/4'>
          Siguiente
        </Button>
      </div>
      </form>
  )
}

export default RegisterForm
