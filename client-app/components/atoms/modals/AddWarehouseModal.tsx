import { Button } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { MyModal } from './MyModal'

import { showSuccessToast } from '../Toast/toasts'
import Input from '../Input'
import { StatusEnum, useCreateWarehouseMutation } from '@/graphql/graphql-types'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  onAddWarehouse: () => void
}

export const AddWarehouseModal = ({
  isOpen,
  onClose,
  onAddWarehouse
}: ModalProps) => {
  const [createWarehouse, { loading }] = useCreateWarehouseMutation()
  const { handleSubmit, control, watch, reset } = useForm()
  const onSubmit = () => {
    createWarehouse({
      variables: {
        createWarehouseInput: {
          name: watch('name'),
          description: watch('description'),
          address: watch('address')
        }
      },
      onCompleted: data => {
        if (data.createWarehouse?.status === StatusEnum.ERROR) {
          showSuccessToast(
            data.createWarehouse.message || 'Error al crear un usuario',
            'error'
          )
          return
        }
        showSuccessToast(
          data.createWarehouse?.message || 'Usuario creado correctamente',
          'success'
        )
        console.log(data, 'data')
        onAddWarehouse()
        onClose()
        reset()
      }
    })

    // console.log(watch())
  }
  const handleCancel = () => {
    reset()
    onClose()
  }
  return (
    <MyModal isOpen={isOpen} onClose={onClose} size="3xl">
      <h1 className=" mt-10 text-center text-3xl font-bold text-gray-500">
        Agregar Almacén
      </h1>
      <article className="mt-4 flex min-w-full items-center justify-center p-8 text-gray-500">
        <form
          className="flex w-full flex-col items-center space-y-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            control={control}
            name="name"
            type="text"
            label="Nombre"
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
            type="text"
            label="Calle"
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
            name="description"
            type="textArea"
            label="Descripción"
            rules={{
              required: { value: true, message: 'Este campo es obligatorio' },
              pattern: {
                value: /^[a-zA-Z\s]+$/i,
                message: 'Solo se permiten letras'
              }
            }}
          />
          <div className="mt-6 grid h-12 w-full grid-cols-2 gap-3 ">
            <Button
              isLoading={loading}

              type="submit"
              color="secondary"
              className="h-full text-lg font-bold"
            >
              Agregar
            </Button>
            <Button
              variant="flat"
              color="danger"
              className="h-full text-lg font-bold"
              onClick={handleCancel}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </article>
    </MyModal>
  )
}
