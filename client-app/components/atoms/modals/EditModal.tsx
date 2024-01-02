import { Button } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
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
  const { handleSubmit, watch, control } = useForm()
  const onSubmit = () => {
    handleSendUpdateUser({
      id: values.id,
      name: watch('name'),
      lastName: watch('lastName'),
      email: watch('email'),
      phone: watch('phone')
    })
  }
  return (
    <MyModal isOpen={isOpen} size="2xl" onClose={onClose} hideCloseButton = {false} >
      <h1 className="mb-10 mt-10 text-center text-3xl font-bold text-gray-500">
        Editar Usuario
      </h1>
      <form
        className=" m-auto flex w-5/6 flex-col items-center space-y-4 pb-9 text-gray-500"
        onSubmit={handleSubmit(onSubmit)}
      >
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
          defaultValue={values.name}
        />
        <Input
          control={control}
          name="lastName"
          type='text'
          placeholder="Apellido"
          label={'Apellido'}
          defaultValue={values.lastName}
          required={false}
          rules={{
            pattern: {
              value: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
              message: 'El apellido solo puede contener letras y espacios'
            }
          }}
        />
        <Input
          control={control}
          name="email"
          type='email'
          placeholder="Email"
          label={'Email'}
          defaultValue={values.email}
          required={false}
          rules={{
            pattern: {
              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              message: 'El email no es valido'
            }
          }}
        />
        <Input
          control={control}
          name="phone"
          type='text'
          placeholder="Celular"
          label={'Celular'}
          defaultValue={values.phone}
          required={false}
          rules={{
            pattern: {
              value: /^[0-9]+$/,
              message: 'El celular solo puede contener numeros'
            }
          }}
        />
        <div className="grid h-16 grid-cols-2 gap-3 w-full ">
          <Button type="submit" color="secondary" className="h-full text-xl font-bold text">
            Guardar
          </Button>
          <Button onClick={ onClose } color="warning" className="h-full text-xl text-white font-bold">Cancelar</Button>
        </div>
      </form>
    </MyModal>
  )
}
