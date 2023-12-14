import { Button, Modal, ModalContent } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import Input from '../Input'
import { showSuccessToast } from '../Toast/toasts'
import InformationCard from '@/components/molecules/Card/InformationCard'
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
            showSuccessToast(data.createUser.message || 'Error al crear un usuario', 'error')
            return
          }
          showSuccessToast(data.createUser?.message || 'Usuario creado correctamente', 'success')
          console.log(data, 'data')
          onAddUser()
          onClose()
          reset()
        }
      })
    } catch (error) {
    }
    console.log(watch())
  }
  const handleCancel = () => {
    reset()
    onClose()
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="w-full" size="4xl">
      <ModalContent>
        {close => (
          <>
            <InformationCard
              title="Agregue un nuevo usuario"
              className="w-full"
            >
              <article className="mt-9 flex min-w-full items-center justify-center">
                <form
                  className="flex w-full flex-col items-center"
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
                      }
                    }
                      />
                    <Input
                      control={control}
                      name="lastName"
                      type="text"
                      label="Apellido"
                      placeholder="Apellido"
                      rules={{
                        required:
                          { value: true, message: 'Este campo es obligatorio' },
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
                        },
                        pattern: {
                          value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                          message: 'Email invalido'
                        }
                      }}
                    />
                    <Input
                      control={control}
                      name="phone"
                      type="number"
                      label="Telefono"
                      placeholder="Telefono"
                      rules={{
                        required: {
                          value: true,
                          message: 'Este campo es obligatorio'
                        },
                        pattern: {
                          value: /^[0-9]+$/i,
                          message: 'Solo se permiten numeros'
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
                        validate: value => value === watch('password') || 'Las contraseñas no coinciden'
                      }}
                    />
                  </div>
                  <div className='flex space-x-6 mt-6'>
                    <Button type="submit" color="secondary" className="w-1/7">
                      Agregar
                    </Button>
                    <Button color='primary' className="w-1/7" onClick={ handleCancel }>
                      Cancelar
                    </Button>
                  </div>
                </form>
              </article>
            </InformationCard>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
