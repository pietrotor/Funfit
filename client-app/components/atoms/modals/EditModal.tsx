import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { MyModal } from './MyModal'
import Input from '../Input'
export type TValueUserData = {
  id?: string
  name?: string
  lastName?: string
  email?: string
  phone?: string
}

type EditModalProps = {
  isOpen: boolean
  onClose: () => void
  values: TValueUserData
  handleSendUpdateUser: (values: TValueUserData) => void
}

export const EditModal = ({
  isOpen,
  onClose,
  values,
  handleSendUpdateUser
}: EditModalProps) => {
  const { handleSubmit, watch, control, reset } = useForm()
  const onSubmit = () => {
    handleSendUpdateUser({
      id: values.id,
      name: watch('name'),
      lastName: watch('lastName'),
      email: watch('email'),
      phone: watch('phone')
    })
  }
  useEffect(() => {
    reset({
      name: values.name,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone
    })
  }, [values])
  return (
    <MyModal
      title="Editar usuario"
      message="Por favor ingrese los datos del usuario a editar"
      handleCancel={onClose}
      color="warning"
      loading={false}
      isOpen={isOpen}
      size="2xl"
      onClose={onClose}
      hideCloseButton={false}
      control={control}
      watch={watch}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
    >
      <div className=" m-auto flex w-5/6 flex-col items-center space-y-4 pb-9 text-gray-500">
        <Input
          control={control}
          name="name"
          type="text"
          placeholder="Nombre"
          label={'Nombre'}
          required={false}
          rules={{
            required: {
              value: true,
              message: 'Este campo es obligatorio'
            }
          }}
          defaultValue={values.name}
        />
        <Input
          control={control}
          name="lastName"
          type="text"
          placeholder="Apellido"
          label={'Apellido'}
          defaultValue={values.lastName}
          required={false}
          rules={{
            required: {
              value: true,
              message: 'Este campo es obligatorio'
            }
          }}
        />
        <Input
          control={control}
          name="email"
          type="email"
          placeholder="Email"
          label={'Email'}
          defaultValue={values.email}
          required={false}
          rules={{
            pattern: {
              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              message: 'El email no es valido'
            },
            required: {
              value: true,
              message: 'Este campo es obligatorio'
            }
          }}
        />
        <Input
          control={control}
          name="phone"
          type="text"
          placeholder="Celular"
          label={'Celular'}
          defaultValue={values.phone}
          required={false}
          rules={{
            pattern: {
              value: /^[0-9]+$/,
              message: 'El celular solo puede contener numeros'
            },
            required: {
              value: true,
              message: 'Este campo es obligatorio'
            }
          }}
        />
      </div>
    </MyModal>
  )
}
