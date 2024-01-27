import { useForm } from 'react-hook-form'

import { MyModal } from './MyModal'
import Input from '../Input'
import { showSuccessToast } from '../Toast/toasts'

import { StatusEnum, useCreateBranchMutation } from '@/graphql/graphql-types'

interface AddBranchModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: () => void
}

export const AddBranchModal = ({
  isOpen,
  onClose,
  onAdd
}: AddBranchModalProps) => {
  const { handleSubmit, watch, control, reset } = useForm()
  const [createBranch, { loading }] = useCreateBranchMutation()
  const onSubmit = () => {
    createBranch({
      variables: {
        createBranchInput: {
          name: watch('name'),
          city: watch('city'),
          code: watch('code'),
          direction: watch('address'),
          phone: watch('phone'),
          nit: watch('nit')
        }
      },
      onCompleted: data => {
        if (data.createBranch?.status === StatusEnum.ERROR) {
          showSuccessToast(
            data.createBranch.message || 'Ocurrió un error',
            'error'
          )
        } else {
          showSuccessToast(
            data.createBranch?.message || 'Brancho guardado correctamente',
            'success'
          )
          onClose()
          reset()
          onAdd()
        }
      }
    })
  }

  const handleCancel = () => {
    reset()
    onClose()
  }

  return (
    <MyModal
      title="Agregar sucursal"
      message="Ingrese los datos de la sucursal"
      handleCancel={handleCancel}
      color="success"
      loading={loading}
      isOpen={isOpen}
      onClose={onClose}
      control={control}
      reset={reset}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
    >
      <div className="space-y-3 p-4 text-gray-500 md:p-8">
        <div className="grid grid-cols-2 gap-3">
          <Input
            control={control}
            name="name"
            label="Nombre"
            type="text"
            rules={{
              required: {
                value: true,
                message: 'Este campo es obligatorio'
              }
            }}
          />
          <Input
            control={control}
            name="city"
            label="Ciudad"
            type="text"
            rules={{
              required: {
                value: true,
                message: 'Este campo es obligatorio'
              }
            }}
          />
          <Input
            control={control}
            name="address"
            label="Dirección"
            type="text"
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
            label="Teléfono"
            type="text"
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
            name="code"
            control={control}
            label="Código"
            type="text"
            rules={{
              required: {
                value: true,
                message: 'Este campo es obligatorio'
              }
            }}
          />
          <Input
            name="nit"
            control={control}
            label="NIT"
            type="text"
            rules={{
              required: {
                value: true,
                message: 'Este campo es obligatorio'
              }
            }}
          />
        </div>
      </div>
    </MyModal>
  )
}
