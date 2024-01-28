import { useForm } from 'react-hook-form'

import { MyModal } from './MyModal'
import Input from '../Input'
import { showSuccessToast } from '../Toast/toasts'
import { DropZone } from '@/components/molecules/DropZone'

import { StatusEnum, useCreateProductMutation } from '@/graphql/graphql-types'

interface AddProductModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: () => void
}

export const AddProductModal = ({
  isOpen,
  onClose,
  onAdd
}: AddProductModalProps) => {
  const { handleSubmit, watch, control, reset } = useForm()
  const [createProduct, { loading }] = useCreateProductMutation()
  const onSubmit = () => {
    createProduct({
      variables: {
        createProductInput: {
          cost: parseFloat(watch('cost')),
          code: watch('code'),
          description: watch('description'),
          image: watch('image'),
          name: watch('name'),
          suggetedPrice: parseFloat(watch('suggetedPrice'))
        }
      },
      onCompleted: data => {
        if (data.createProduct?.status === StatusEnum.ERROR) {
          showSuccessToast(
            data.createProduct.message || 'Ocurrió un error',
            'error'
          )
        } else {
          showSuccessToast(
            data.createProduct?.message || 'Producto guardado correctamente',
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
      handleCancel={handleCancel}
      title="Agregar producto"
      message="Ingrese los datos del nuevo producto"
      color="success"
      loading={loading}
      isOpen={isOpen}
      onClose={onClose}
      control={control}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      reset={reset}
    >
      <div className="p-4 text-gray-500 md:p-8">
        <div className="grid grid-cols-2 gap-3 pb-2">
          <Input
            control={control}
            name="name"
            label="Nombre"
            type="text"
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
            name="suggetedPrice"
            label="Precio sugerido"
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
            control={control}
            name="cost"
            label="Costo"
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
        </div>
        <Input
          control={control}
          name="description"
          label="Descripción"
          type="textArea"
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
        <DropZone />
      </div>
    </MyModal>
  )
}
