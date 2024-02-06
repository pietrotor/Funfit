import { useForm } from 'react-hook-form'

import { useEffect } from 'react'
import { MyModal } from './MyModal'
import Input from '../Input'
import { showSuccessToast } from '../Toast/toasts'

import { StatusEnum, useUpdateBranchMutation } from '@/graphql/graphql-types'
import { TDataBranch } from '@/interfaces/TData'

interface EditBranchModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: () => void
  values: TDataBranch
}

export const EditBranchModal = ({
  isOpen,
  onClose,
  onAdd,
  values
}: EditBranchModalProps) => {
  const { handleSubmit, watch, control, reset } = useForm()
  const [updateBranchInput, { loading }] = useUpdateBranchMutation()

  const onSubmit = () => {
    updateBranchInput({
      variables: {
        updateBranchInput: {
          id: values.id,
          name: watch('name'),
          city: watch('city'),
          code: watch('code'),
          direction: watch('address'),
          phone: watch('phone'),
          nit: watch('nit')
        }
      },
      onCompleted: data => {
        if (data.updateBranch?.status === StatusEnum.ERROR) {
          showSuccessToast(
            data.updateBranch.message || 'Ocurrio un error',
            'error'
          )
          return
        }
        showSuccessToast(
          data.updateBranch?.message || 'Usuario actualizado correctamente',
          'success'
        )
        onClose()
        onAdd()
      }
    })
  }

  const handleCancel = () => {
    reset()
    onClose()
  }
  useEffect(() => {
    reset({
      name: values.name,
      city: values.city,
      code: values.code,
      address: values.direction,
      phone: values.phone,
      nit: values.nit
    })
  }, [values])

  return (
    <MyModal
      title="Editar sucursal"
      message="Ingrese los datos de la sucursal"
      handleCancel={handleCancel}
      color="warning"
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
            placeholder="Nombre"
            type="text"
            defaultValue={values.name}
            rules={{
              required: {
                value: true,
                message: 'Este campo es obligatorio'
              }
            }}
          />
          <Input
            name="address"
            control={control}
            label="Código"
            placeholder="Código"
            type="text"
            defaultValue={values.code}
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
            placeholder="Ciudad"
            type="text"
            defaultValue={values.city}
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
            placeholder="Teléfono"
            type="text"
            defaultValue={values.phone?.toString()}
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
            name="address"
            control={control}
            label="Dirección"
            type="text"
            defaultValue={values.direction}
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
            placeholder="NIT"
            defaultValue={values.nit?.toString()}
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
