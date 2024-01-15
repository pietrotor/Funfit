import { useForm } from 'react-hook-form'
import { Button } from '@nextui-org/react'

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
    <MyModal isOpen={isOpen} onClose={onClose}>
      <section>
        <h1 className="mt-5 text-center text-3xl font-bold text-gray-500">
          Agregar Producto
        </h1>
        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          className="p-4 text-gray-500 md:p-8"
        >
          <div className="grid grid-cols-2 gap-3">
            <Input
              control={control}
              name="name"
              label="Nombre"
              placeholder="Nombre"
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
              name="suggetedPrice"
              label="Precio sugerido"
              placeholder="Precio sugerido"
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
              placeholder="Costo"
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
              placeholder="Código"
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
            customeClassName="h-20 "
            control={control}
            name="description"
            label="Descripción"
            placeholder="Descripción"
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
          <div className="grid h-12 grid-cols-2 gap-3 ">
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
      </section>
    </MyModal>
  )
}
