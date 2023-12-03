import { Button, Modal, ModalContent } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import Input from '../Input'
import InformationCard from '@/components/molecules/Card/InformationCard'
import { useCreateUserMutation } from '@/graphql/graphql-types'
type ModalProps = {
  isOpen: boolean
  onClose: () => void
}

export const AddUserModal = ({ isOpen, onClose }: ModalProps) => {
  const [createUser] = useCreateUserMutation()
  const { handleSubmit, watch, control } = useForm()
  const onSubmit = () => {
    createUser({
      variables: {
        userInput: {
          name: watch('name'),
          lastName: watch('lastName'),
          email: watch('email'),
          password: watch('password'),
          phone: watch('phone'),
          roleId: '5f9aee5b0d11b13b443b91d2'
        }
      }
    })
    console.log(watch())
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
                      required
                    />
                    <Input
                      control={control}
                      name="lastName"
                      type="text"
                      label="Apellido"
                      placeholder="Apellido"
                      required
                    />
                    <Input
                      control={control}
                      name="email"
                      type="email"
                      label="Email"
                      placeholder="email"
                      required
                    />
                    <Input
                      control={control}
                      name="password"
                      type="password"
                      label="Contraseña"
                      placeholder="Contraseña"
                      required
                    />
                    <Input
                      control={control}
                      name="confirmPassword"
                      type="password"
                      label="Confirma la contraseña"
                      placeholder="Confirma la contraseña"
                      required
                      rules={{
                        minLength: {
                          value: 3,
                          message: 'El nombre debe tener al menos 3 caracteres'
                        }
                      }}
                    />
                    <Input
                      control={control}
                      name="phone"
                      type="number"
                      label="Telefono"
                      placeholder="Telefono"
                      required
                    />
                  </div>
                  <Button type="submit" color="primary" className="w-1/7 mt-3">
                    Agregar
                  </Button>
                </form>
              </article>
            </InformationCard>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
