import { Button } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import Input from '../Input'

import { MyModal } from './MyModal'
type ModalProps = {
  isOpen: boolean
  onClose: () => void
  onAddWarehouse: () => void
}

export const AddWarehouseModal = ({ isOpen, onClose, onAddWarehouse }: ModalProps) => {
  // const [createWarehouse] = useCreateWarehouseMutation()
  const { handleSubmit, control, reset } = useForm()
  const onSubmit = () => {
    // createWarehouse({
    //   variables: {
    //     WarehouseInput: {
    //       name: watch('name'),
    //       description: watch('description'),
    //       street: watch('street')
    //     }
    //   },
    //   onCompleted: data => {
    //     if (data.createWarehouse?.status === StatusEnum.ERROR) {
    //       showSuccessToast(data.createWarehouse.message || 'Error al crear un usuario', 'error')
    //       return
    //     }
    //     showSuccessToast(data.createWarehouse?.message || 'Usuario creado correctamente', 'success')
    //     console.log(data, 'data')
    //     onAddWarehouse()
    //     onClose()
    //     reset()
    //   }
    // })

    // console.log(watch())
  }
  const handleCancel = () => {
    reset()
    onClose()
  }
  return (
    <MyModal isOpen={isOpen} onClose={onClose} size="3xl">
      <h1 className=" mt-10 text-center text-2xl font-bold">
        Agregar Almacen
      </h1>
              <article className="mt-4 p-8 flex min-w-full items-center justify-center">
                <form
                  className="flex w-full flex-col items-center"
                  onSubmit={handleSubmit(onSubmit)}
                >
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
                      name="street"
                      type="text"
                      label="Calle"
                      placeholder="Calle"
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
                      customeClassName='h-16'
                      placeholder="Descripción"
                      rules={{
                        required:
                          { value: true, message: 'Este campo es obligatorio' },
                        pattern: {
                          value: /^[a-zA-Z\s]+$/i,
                          message: 'Solo se permiten letras'
                        }
                      }}
                    />
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
            </MyModal>
  )
}
