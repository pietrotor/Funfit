import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { MyModal } from './MyModal'
import Input from '../Input'
import { showSuccessToast } from '../Toast/toasts'
import Selector from '../InputSelector'
import {
  StatusEnum,
  useCreateUserMutation,
  useGetRolesLazyQuery
} from '@/graphql/graphql-types'
type ModalProps = {
  isOpen: boolean
  onClose: () => void
  onAddUser: () => void
}

export const AddUserModal = ({ isOpen, onClose, onAddUser }: ModalProps) => {
  const [createUser, { loading }] = useCreateUserMutation()
  const [getRoles, { data: roles }] = useGetRolesLazyQuery({
    onError(error) {
      console.log('🚀 ~ onError ~ error:', error)
    }
  })
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
            roleId: watch('roleId')
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

  useEffect(() => {
    getRoles({
      variables: {
        paginationInput: {}
      }
    })
  }, [])

  const handleCancel = () => {
    reset()
    onClose()
  }

  return (
    <MyModal
      title="Agregar usuario"
      message="Agrega un nuevo usuario"
      color="success"
      loading={loading}
      handleCancel={handleCancel}
      isOpen={isOpen}
      size="3xl"
      onClose={onClose}
      hideCloseButton={false}
      control={control}
      reset={reset}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
    >
      <div className="flex w-full flex-col items-center p-9 text-gray-500">
        <div className="flex w-full flex-col space-y-2 md:grid md:grid-cols-2 md:gap-5 md:space-y-0">
          <Input
            control={control}
            name="name"
            type="text"
            label="Nombre"
            size="sm"
            rules={{
              required: {
                value: true,
                message: 'Este campo es obligatorio'
              }
            }}
          />
          <Input
            control={control}
            name="lastName"
            size="sm"
            type="text"
            label="Apellido"
            rules={{
              required: { value: true, message: 'Este campo es obligatorio' }
            }}
          />
          <Input
            control={control}
            name="email"
            type="email"
            size="sm"
            label="Email"
            rules={{
              required: {
                value: true,
                message: 'Este campo es obligatorio'
              },
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: 'Correo electrónico inválido'
              }
            }}
          />
          <Input
            control={control}
            name="phone"
            size="sm"
            type="number"
            label="Teléfono"
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
            size="sm"
            type="password"
            label="Contraseña"
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
            size="sm"
            type="password"
            label="Confirma la contraseña"
            rules={{
              required: {
                value: true,
                message: 'Este campo es obligatorio'
              },
              validate: value =>
                value === watch('password') || 'Las contraseñas no coinciden'
            }}
          />
          <div className="col-span-1 md:col-span-2">
            <Selector
              control={control}
              options={(roles?.getRoles?.data || []).map(role => ({
                label: role!.name,
                value: role!.id
              }))}
              name="roleId"
              label="Seleccione un rol"
              rules={{
                required: {
                  value: true,
                  message: 'Este campo es obligatorio'
                }
              }}
            />
          </div>
        </div>
      </div>
    </MyModal>
  )
}
