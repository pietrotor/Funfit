import React, { useEffect } from 'react'
import { Control, FieldValues, UseFormSetValue } from 'react-hook-form'
import InputComponent from '@/components/atoms/Input'
import { CUSTOMER_ID } from '@/lib/constants'
import { useGetPublicCustomerByIdLazyQuery } from '@/graphql/graphql-types'

type Props = {
  control: Control<FieldValues, any>
  setValue: UseFormSetValue<FieldValues>
}

function RegisterForm({ control, setValue }: Props) {
  const customerId = localStorage.getItem(CUSTOMER_ID)?.replace(/^"|"$/g, '')
  console.log(customerId)
  const [getCustomer] = useGetPublicCustomerByIdLazyQuery({
    fetchPolicy: 'network-only',
    variables: {
      getPublicCustomerByIdId: customerId
    },
    onCompleted: data => {
      setValue('name', data?.getPublicCustomerById?.data?.name)
      setValue('lastName', data?.getPublicCustomerById?.data?.lastName)
      setValue('email', data?.getPublicCustomerById?.data?.email)
      setValue('phone', data?.getPublicCustomerById?.data?.phone)
    },
    onError: error => {
      console.log(error)
    }
  })

  useEffect(() => {
    if (customerId) {
      getCustomer()
    }
  }, [])

  return (
    <div className="flex h-full w-full flex-col space-y-5 p-5 text-center">
      <h2 className="text-gray-500">Datos de contacto</h2>
      <div className="flex flex-col items-center justify-around md:flex-row">
        <div className="w-full md:w-1/2 md:space-y-8 md:px-6 ">
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
        <div className="w-full md:w-1/2 md:space-y-8 md:px-6 ">
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
