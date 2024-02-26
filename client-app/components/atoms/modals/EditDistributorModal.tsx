import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { MyModal } from './MyModal'
import InputComponent from '../Input'
import { TDistributor } from '@/interfaces/TData'
import { useCustomUpdateDistributor } from '@/hooks/UseDistributorsQuery'

type TEditDistributorModalProps = {
  isOpen: boolean
  onClose: () => void
  onAdd: () => void
  values: TDistributor
}

export const EditDistributorModal = ({
  isOpen,
  onClose,
  onAdd,
  values
}: TEditDistributorModalProps) => {
  const { handleSubmit, watch, control, reset } = useForm()
  const { handleUpdateDistributor } = useCustomUpdateDistributor()

  const onSubmit = () => {
    handleUpdateDistributor({
      id: values.id,
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
    onClose()
    reset()
  }

  useEffect(() => {
    reset({
      name: values?.name,
      nit: values?.nit,
      phone: values?.phone,
      code: values?.code,
      socialReason: values?.socialReason,
      email: values?.email,
      address: values?.address,
      ownerName: values?.ownerInformation?.name,
      ownerLastName: values?.ownerInformation?.lastName,
      ownerPhone: values?.ownerInformation?.phone,
      ownerAddress: values?.ownerInformation?.address
    })
  }, [values])

  return (
    <MyModal
      title="Editar usuario"
      message="Por favor ingrese los datos del distribuidor a editar"
      handleCancel={onClose}
      color="warning"
      loading={false}
      isOpen={isOpen}
      size="2xl"
      onClose={onClose}
      hideCloseButton={false}
      control={control}
      watch={watch}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
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
              type="email"
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
            }
          }}
        />
        <div>
          <h4 className="text-lg font-thin text-warning-500">
            Información del propietario
          </h4>
          <div className="grid grid-cols-2 gap-3 border-2 border-warning-100 p-3">
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
