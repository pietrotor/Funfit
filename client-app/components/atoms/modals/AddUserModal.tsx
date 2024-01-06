import { Button } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { MyModal } from './MyModal'
import Input from '../Input'
import { showSuccessToast } from '../Toast/toasts'
import { StatusEnum, useCreateUserMutation } from '@/graphql/graphql-types'
type ModalProps = {
  isOpen: boolean
  onClose: () => void
  onAddUser: () => void
}

export const AddUserModal = ({ isOpen, onClose, onAddUser }: ModalProps) => {
  const [createUser] = useCreateUserMutation()
  const { handleSubmit, watch, control, reset } = useForm()
  const onSubmit = async () => {
    try {
      await createUser({
        variables: {
          userInput: {
            name: watch('name'),
            lastName: watch('lastName'),
            email: watch('email'),
            password: watch('password'),
            phone: watch('phone'),
            roleId: '5f9aee5b0d11b13b443b91d2'
          }
        },
        onCompleted: data => {
          if (data.createUser?.status === StatusEnum.ERROR) {
            showSuccessToast(
              data.createUser.message || 'Error al crear un usuario',
              'error'
            )
            return
          }
          showSuccessToast(
            data.createUser?.message || 'Usuario creado correctamente',
            'success'
          )
          console.log(data, 'data')
          onAddUser()
          onClose()
          reset()
        }
      })
    } catch (error) {}
    console.log(watch())
  }
  const handleCancel = () => {
    reset()
    onClose()
  }
  return (
    <MyModal
      isOpen={isOpen}
      size="4xl"
      onClose={onClose}
      hideCloseButton={false}
    >
      <h1 className="mb-4 mt-10 text-center text-3xl font-bold text-gray-500">
        Agregar un nuevo usuario
      </h1>
      <form
        className="flex w-full flex-col items-center p-9 text-gray-500"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex w-full flex-col md:grid md:grid-cols-2 md:gap-5">
          <Input
            control={control}
            name="name"
            type="text"
            label="Nombre"
            placeholder="Nombre"
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
            name="lastName"
            type="text"
            label="Apellido"
            placeholder="Apellido"
            rules={{
              required: { value: true, message: 'Este campo es obligatorio' },
              pattern: {
                value: /^[a-zA-Z\s]+$/i,
                message: 'Solo se permiten letras'
              }
            }}
          />
          <Input
            control={control}
            name="email"
            type="email"
            label="Email"
            placeholder="email"
            rules={{
              required: {
                value: true,
                message: 'Este campo es obligatorio'
              }
            }}
          />
          <Input
            control={control}
            name="phone"
            type="number"
            label="Teléfono"
            placeholder="Teléfono"
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
            name="password"
            type="password"
            label="Contraseña"
            placeholder="Contraseña"
            rules={{
              required: {
                value: true,
                message: 'Este campo es obligatorio'
              }
            }}
          />
          <Input
            control={control}
            name="confirmPassword"
            type="password"
            label="Confirma la contraseña"
            placeholder="Confirma la contraseña"
            rules={{
              required: {
                value: true,
                message: 'Este campo es obligatorio'
              },
              validate: value =>
                value === watch('password') || 'Las contraseñas no coinciden'
            }}
          />
        </div>
        <div className="grid h-12 grid-cols-2 gap-3 w-full mt-4">
          <Button type="submit" color="secondary" className="h-full font-bold text-lg">
            Agregar
          </Button>
          <Button variant="flat" color="danger" className="h-full font-bold text-lg" onClick={handleCancel}>
            Cancelar
          </Button>
        </div>
      </form>
    </MyModal>
  )
}
