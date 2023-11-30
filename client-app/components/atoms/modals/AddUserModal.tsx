import Input from '../Input'
import InformationCard from '@/components/molecules/Card/InformationCard'
import { Button, Modal, ModalContent } from '@nextui-org/react'
import { useForm } from 'react-hook-form'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
}

export const AddUserModal = ({ isOpen, onClose }: ModalProps) => {
  const { handleSubmit, watch, control } = useForm()
  const onSubmit = () => {
    console.log(watch())
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose} className='w-full' size='4xl'>
      <ModalContent>
        {close => (
          <>
            <InformationCard title='Agregue un nuevo usuario' className='w-full'>
              <article className='flex items-center justify-center min-w-full mt-9'>
                <form
                  className='flex flex-col items-center w-full'
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className='flex flex-col md:grid md:grid-cols-2 md:gap-5 w-full'>
                    <Input
                      control={control}
                      name='name'
                      type='text'
                      label='Nombre'
                      placeholder='Nombre'
                      required
                    />
                    <Input
                      control={control}
                      name='lastName'
                      type='text'
                      label='Apellido'
                      placeholder='Apellido'
                      required
                    />
                    <Input
                      control={control}
                      name='email'
                      type='email'
                      label='Email'
                      placeholder='email'
                      required
                    />
                    <Input
                      control={control}
                      name='password'
                      type='password'
                      label='Contraseña'
                      placeholder='Contraseña'
                      required
                    />
                    <Input
                      control={control}
                      name='confirmPassword'
                      type='password'
                      label='Confirma la contraseña'
                      placeholder='Confirma la contraseña'
                      required
                    />
                    <Input
                      control={control}
                      name='phone'
                      type='number'
                      label='Telefono'
                      placeholder='Telefono'
                      required
                    />
                  </div>
                  <Button type='submit' color='primary' className='w-1/7 mt-3'>
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
