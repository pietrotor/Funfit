import { useForm } from 'react-hook-form'
import { Button } from '@nextui-org/react'

import { MyModal } from './MyModal'
import Input from '../Input'
import { showSuccessToast } from '../Toast/toasts'

import { StatusEnum, useUpdateProductMutation } from '@/graphql/graphql-types'
import { TStockDataBranch } from '@/interfaces/TData'

interface EditBranchModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: () => void
  values? : TStockDataBranch
}

export const EditBranchModal = ({
  isOpen,
  onClose,
  onAdd,
  values
}: EditBranchModalProps) => {
  const { handleSubmit, watch, control, reset } = useForm()
  const [UpdateUserMutationVariables] = useUpdateProductMutation()

  const onSubmit = () => {
    UpdateUserMutationVariables({
      variables: {
        updateProductInput: {
          id: values?.id || '2321',
          name: watch('name'),
          // city: watch('city'),
          code: watch('code')
          // address: watch('address'),
          // phone: watch('phone'),
          // nit: watch('nit')
        }
      },
      onCompleted: data => {
        if (data.updateProduct?.status === StatusEnum.ERROR) {
          showSuccessToast(
            data.updateProduct.message || 'Ocurrio un error',
            'error'
          )
          return
        }
        showSuccessToast(
          data.updateProduct?.message || 'Usuario actualizado correctamente',
          'success'
        )
        onClose()
        onAdd()
      }
    })
    // handleSendUpdateBranch({
    //   id: values.id,
    //   name: watch('name'),
    //   city: watch('city'),
    //   code: watch('code'),
    //   address: watch('address'),
    //   phone: watch('phone'),
    //   nit: watch('nit')
    // })
  }

  const handleCancel = () => {
    reset()
    onClose()
  }

  return (
    <MyModal isOpen={isOpen} onClose={onClose}>
      <section>
        <h1 className="mt-5 text-center text-3xl font-bold text-gray-500">
          Agregar sucursal
        </h1>
        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          className="p-4 space-y-3 text-gray-500 md:p-8"
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
              },
              pattern: {
                value: /^[a-zA-Z\s]+$/i,
                message: 'Solo se permiten letras'
              }
            }}
          />
            <Input
              name='code'
              control={control}
              label='Código'
              placeholder='Código'
              type='text'
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
            <Input
              name="nit"
              control={control}
              label="NIT"
              placeholder="NIT"
              type="text"
              rules={{
                required: {
                  value: true,
                  message: 'Este campo es obligatorio'
                }
              }}
            />
          </div>
          <div className="grid h-16 grid-cols-2 gap-3 ">
            <Button
              type="submit"
              color="secondary"
              className="h-full text-xl font-bold"
            >
              Agregar
            </Button>
            <Button
              variant="flat"
              color="danger"
              className="h-full text-xl font-bold"
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
