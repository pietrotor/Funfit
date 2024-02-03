import React from 'react'
import { Button, Input } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { TUserInfo } from '@/components/templates/OrderLayout/orderLayout'

type Props = {
  goToStep: (p: number) => void
  currentStepIndex: number
  setUserInfo: (p: TUserInfo) => void
}

function RegisterForm({ goToStep, currentStepIndex, setUserInfo }: Props) {
  const { control, handleSubmit } = useForm<TUserInfo>()
  const router = useRouter()

  const onSubmit: SubmitHandler<TUserInfo> = data => {
    setUserInfo(data)
    goToStep(currentStepIndex + 1)
  }

  return (
    <form
      id="myForm"
      className="flex h-full w-full flex-col justify-between space-y-5 p-5 text-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-gray-500 md:pb-6">Datos de contacto</h2>
      <div className="mb-5 flex flex-col items-center justify-around md:flex-row">
        <div className="w-full md:w-1/2 md:space-y-8 md:px-6 ">
          <div className="text-left">
            <label className="text-xl font-semibold">Nombre</label>
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field, formState: { errors } }) => (
                <Input
                  {...field}
                  validationState={`${errors.name ? 'invalid' : 'valid'}`}
                  errorMessage={errors.name?.message}
                  variant={'bordered'}
                  placeholder="Ingresa tu nombre"
                />
              )}
            />
          </div>
          <div className="text-left  ">
            <label className="text-xl font-semibold">Apellido</label>
            <Controller
              name="lastName"
              control={control}
              rules={{ required: true }}
              render={({ field, formState: { errors } }) => (
                <Input
                  {...field}
                  validationState={`${errors.lastName ? 'invalid' : 'valid'}`}
                  errorMessage={errors.lastName?.message}
                  variant={'bordered'}
                  placeholder="Ingresa tu apellido"
                />
              )}
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 md:space-y-8 md:px-6 ">
          <div className="text-left">
            <label className="text-xl font-semibold">Celular</label>
            <Controller
              name="phone"
              control={control}
              rules={{
                required: true,
                maxLength: {
                  value: 8,
                  message: 'Debe tener 8 dígitos'
                },
                minLength: {
                  value: 8,
                  message: 'Debe tener 8 dígitos'
                },
                pattern: /^[0-9]*$/
              }}
              render={({ field, formState: { errors } }) => (
                <Input
                  {...field}
                  validationState={`${errors.phone ? 'invalid' : 'valid'}`}
                  errorMessage={errors.phone?.message}
                  variant={'bordered'}
                  placeholder="Ingrese su número de celular"
                />
              )}
            />
          </div>
          <div className="text-left  font-semibold ">
            <label className="text-xl">Email</label>
            <Controller
              name="email"
              control={control}
              rules={{ required: true, pattern: /^\S+@\S+$/i }}
              render={({ field, formState: { errors } }) => (
                <Input
                  {...field}
                  validationState={`${errors.email ? 'invalid' : 'valid'}`}
                  errorMessage={errors.email?.message}
                  variant={'bordered'}
                  placeholder="Ingrese su email"
                />
              )}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between  px-6 ">
        <Button
          onClick={() => router.push('/')}
          color="primary"
          className="w-1/4"
        >
          Atrás
        </Button>
        <Button form="myForm" type="submit" color="primary" className="w-1/4">
          Siguiente
        </Button>
      </div>
    </form>
  )
}

export default RegisterForm
