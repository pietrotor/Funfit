import { useForm } from 'react-hook-form'
import { MyModal } from './MyModal'
import InputComponent from '../Input'
import { useCustomCreateDistributor } from '@/hooks/UseDistributorsQuery'

type TAddDistributorModalProps = {
  isOpen: boolean
  onClose: () => void
  onAdd: () => void
}

export const AddDistributorModal = ({
  isOpen,
  onClose,
  onAdd
}: TAddDistributorModalProps) => {
  const { control, handleSubmit, reset, watch } = useForm()
  const { handleCreateDistributor } = useCustomCreateDistributor()

  const onSubmit = () => {
    handleCreateDistributor({
      name: watch('name'),
      nit: watch('nit'),
      phone: watch('phone'),
      code: watch('code'),
      socialReason: watch('socialReason'),
      email: watch('email'),
      address: watch('address'),
      ownerInformation: {
        name: watch('ownerName'),
        lastName: watch('ownerLastName'),
        phone: watch('ownerPhone'),
        address: watch('ownerAddress')
      }
    })
    onAdd()
    reset()
    onClose()
  }

  const handleCancel = () => {
    reset()
    onClose()
  }

  return (
    <MyModal
      title="Agregar Distribuidor"
      message="Agrege un nuevo distribuidor"
      color="success"
      control={control}
      reset={reset}
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      size="2xl"
    >
      <section className="space-y-4 p-5">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-3">
            <InputComponent
              label="Nombre"
              name="name"
              control={control}
              isRequired
              rules={{
                required: {
                  value: true,
                  message: 'El nombre es requerido'
                },
                pattern: {
                  value: /^[a-zA-ZÁáÉéÍíÓóÚúÜüÑñ\s]+$/,
                  message: 'Solo se permiten letras'
                }
              }}
            />
            <InputComponent
              label="NIT"
              name="nit"
              control={control}
              isRequired={false}
            />
            <InputComponent
              label="Teléfono"
              name="phone"
              control={control}
              isRequired
              rules={{
                required: {
                  value: true,
                  message: 'El teléfono es requerido'
                }
              }}
            />
          </div>
          <div className="space-y-3">
            <InputComponent
              label="Código"
              name="code"
              control={control}
              isRequired
              rules={{
                required: {
                  value: true,
                  message: 'El código de distribuidor es requerido'
                }
              }}
            />
            <InputComponent
              label="Razón social"
              name="socialReason"
              control={control}
              isRequired={false}
            />
            <InputComponent
              label="Correo"
              name="email"
              type='email'
              control={control}
              isRequired={false}
            />
          </div>
        </div>
        <InputComponent
          label="Dirección"
          name="address"
          control={control}
          isRequired
          rules={{
            required: {
              value: true,
              message: 'La dirección es requerida'
            },
            pattern: {
              value: /^[a-zA-ZÁáÉéÍíÓóÚúÜüÑñ\s]+$/,
              message: 'Solo se permiten letras'
            }
          }}
        />
        <div>
          <h4 className="text-lg font-thin text-success-500">
            Información del propietario
          </h4>
          <div className="grid grid-cols-2 gap-3 border-2 border-success-100 p-3">
            <div className="space-y-3">
              <InputComponent
                label="Nombre"
                name="ownerName"
                control={control}
                isRequired
                rules={{
                  required: {
                    value: true,
                    message: 'El nombre del propietario es requerido'
                  }
                }}
              />
              <InputComponent
                label="Teléfono"
                name="ownerPhone"
                control={control}
                isRequired={false}
              />
            </div>
            <div className="space-y-3">
              <InputComponent
                label="Apellido"
                name="ownerLastName"
                control={control}
                isRequired={false}
              />
              <InputComponent
                label="Dirección del propietario"
                name="ownerAddress"
                control={control}
                isRequired={false}
              />
            </div>
          </div>
        </div>
      </section>
    </MyModal>
  )
}
