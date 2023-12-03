import { Button } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { MyModal } from './MyModal'
import Input from '../Input'
export type TValue = {
  id: string
  name: string
  lastName: string
  email: string
  phone: string
}

type EditModalProps = {
  isOpen: boolean
  onClose: () => void
  values: TValue
  handleSendUpdateUser: (values: TValue) => void
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
    console.log({
      id: values.id,
      name: watch('name'),
      lastName: watch('lastName'),
      email: watch('email'),
      phone: watch('phone')
    })
  }

  return (
    <MyModal isOpen={isOpen} size="2xl" onClose={onClose}>
      <h1 className="mb-10 mt-10 text-center text-2xl font-bold">
        Editar Usuario
      </h1>
      <form
        className=" m-auto flex w-5/6 flex-col items-center space-y-4 pb-9"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          control={control}
          name="user"
          placeholder="Nombre"
          label={'Nombre'}
          value={values.name}
          required={false}
        />
        <Input
          control={control}
          name="lastrName"
          placeholder="Apellido"
          label={'Apellido'}
          value={values.lastName}
          required={false}
        />
        <Input
          control={control}
          name="email"
          placeholder="Email"
          label={'Email'}
          value={values.email}
          required={false}
        />
        <Input
          control={control}
          name="phone"
          placeholder="Celular"
          label={'Celular'}
          value={values.phone}
          required={false}
        />
        <div className="mt-4 flex space-x-4">
          <Button type="submit" color="secondary">
            Guardar
          </Button>
          <Button color="warning">Cancelar</Button>
        </div>
      </form>
    </MyModal>
  )
}
