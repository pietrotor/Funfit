import { Controller } from 'react-hook-form'
import { Textarea } from '@nextui-org/react'
import { useEffect } from 'react'
import { MyModal } from './MyModal'
import Input from '../Input'
import { useBillForm } from '@/hooks/index'

type BillFormProps = {
  isLoading?: boolean
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
}

const BillForm = ({ isOpen, onClose, onSubmit, isLoading }: BillFormProps) => {
  const { control, reset, handleSubmit } = useBillForm()

  useEffect(() => {
    reset()
  }, [isOpen, reset])

  return (
    <MyModal
      handleCancel={onClose}
      title="Agregar gasto"
      message="Ingrese los datos de tu gasto"
      color="success"
      loading={isLoading}
      isOpen={isOpen}
      onClose={onClose}
      control={control}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      reset={reset}
    >
      <div className="space-y-3 px-6 py-2">
        <Input
          control={control}
          name="title"
          type="text"
          label="Nombre"
          size="sm"
          rules={{
            required: {
              value: true,
              message: 'Este campo es obligatorio'
            }
          }}
        />
        <div className="flex items-center gap-2">
          <div className="w-[30%]">
            <Input
              control={control}
              valueAs="number"
              name="amount"
              type="number"
              label="Monto"
              size="sm"
              rules={{
                required: {
                  value: true,
                  message: 'Este campo es obligatorio'
                }
              }}
            />
          </div>
          <div className="w-full flex-1">
            <Input
              control={control}
              name="date"
              type="date"
              label="Fecha"
              size="sm"
              rules={{
                required: {
                  value: true,
                  message: 'Este campo es obligatorio'
                }
              }}
            />
          </div>
        </div>
        <Controller
          control={control}
          name="detail"
          render={({ field: { value, onChange, name } }) => (
            <div>
              <Textarea
                value={value}
                onChange={onChange}
                name={name}
                placeholder="Ingrese un detalle"
                variant="bordered"
              />
            </div>
          )}
        />
      </div>
    </MyModal>
  )
}

export { BillForm }
