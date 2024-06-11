import React from 'react'
import { Control, FieldValues } from 'react-hook-form'
import InputComponent from '@/components/atoms/Input'

type Props = {
  control: Control<FieldValues, any>
}

function RegisterForm({ control }: Props) {
  return (
    <div className="flex h-full w-full flex-col justify-center gap-5 p-2 text-center md:p-5">
      <h2 className="text-gray-500">Datos de contacto</h2>
      <div className="flex flex-col items-center justify-around gap-3 md:flex-row">
        <div className="w-full space-y-3 md:w-1/2 md:space-y-8 md:px-6 ">
          <InputComponent
            name="name"
            control={control}
            label="Nombre"
            type="text"
            isRequired
            rules={{
              required: {
                value: true,
                message: 'Este campo es requerido'
              }
            }}
          />
          <InputComponent
            name="lastName"
            control={control}
            label="Apellido"
            type="text"
            isRequired
            rules={{
              required: {
                value: true,
                message: 'Este campo es requerido'
              }
            }}
          />
        </div>
        <div className="w-full space-y-3 md:w-1/2 md:space-y-8 md:px-6 ">
          <InputComponent
            name="phone"
            control={control}
            label="Teléfono"
            type="text"
            isRequired
            rules={{
              required: {
                value: true,
                message: 'Este campo es requerido'
              },
              pattern: {
                value: /^[0-9]{8}$/,
                message: 'El teléfono debe ser de 8 dígitos'
              }
            }}
          />
          <InputComponent
            name="email"
            control={control}
            label="Correo electrónico"
            type="email"
            isRequired
          />
        </div>
      </div>
    </div>
  )
}

export default RegisterForm
