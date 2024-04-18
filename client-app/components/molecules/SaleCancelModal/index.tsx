import {
  Button,
  Checkbox,
  Modal,
  ModalContent,
  Textarea,
  useDisclosure
} from '@nextui-org/react'
import { Controller, useForm } from 'react-hook-form'
import {
  CancelSaleInput,
  PaymentMethodEnum,
  Sale,
  StatusEnum,
  useCancelSaleMutation
} from '@/graphql/graphql-types'
import { showSuccessToast } from '@/components/atoms/Toast/toasts'

type TSaleCancelModalProps = {
  modalDisclosure: ReturnType<typeof useDisclosure>
  sale: Sale | null
  refetch?: () => void
}

const SaleCancelModal = ({
  modalDisclosure,
  sale,
  refetch
}: TSaleCancelModalProps) => {
  const [deleteSaleMutation, { loading: mutatingDelete }] =
    useCancelSaleMutation({
      onCompleted: data => {
        if (data?.cancelSale?.status === StatusEnum.ERROR) {
          showSuccessToast(
            data.cancelSale.message || 'Error al eliminar el usuario',
            'error'
          )
          modalDisclosure.onClose()
        } else {
          showSuccessToast(
            data.cancelSale?.message || 'Usuario eliminado correctamente',
            'success'
          )
          refetch?.()
          modalDisclosure.onClose()
        }
      },
      onError(error) {
        console.log('🚀 ~ onError ~ error:', error)
        showSuccessToast('ocurrio un error', 'error')
        console.log(error)
      }
    })
  const { control, handleSubmit } = useForm<CancelSaleInput>({
    defaultValues: {
      id: sale?.id,
      stockReturn: true,
      cashBack: sale?.paymentMethod === PaymentMethodEnum.CASH
    }
  })

  const handleDelete = handleSubmit(data => {
    deleteSaleMutation({
      variables: {
        cancelSaleInput: { ...data, id: sale?.id }
      }
    })
  })

  return (
    <Modal isOpen={modalDisclosure.isOpen} size="lg">
      <ModalContent>
        <div className="space-y-3 p-4">
          <h4 className="text-center">Anular Venta</h4>
          <Controller
            control={control}
            name="reason"
            render={({ field: { value, onChange, name } }) => (
              <Textarea
                value={value}
                onChange={onChange}
                name={name}
                placeholder="Ingrese la razón de la anulación"
                variant="bordered"
              />
            )}
          />
          <div className="flex flex-col gap-2">
            <Controller
              control={control}
              name="cashBack"
              render={({ field: { value, onChange, name } }) => (
                <Checkbox
                  isSelected={value}
                  onValueChange={onChange}
                  name={name}
                >
                  Retornar dinero a caja
                </Checkbox>
              )}
            />
            <Controller
              control={control}
              name="stockReturn"
              render={({ field: { value, onChange, name } }) => (
                <Checkbox
                  isSelected={value}
                  onValueChange={onChange}
                  name={name}
                >
                  Retornar el stock a inventario
                </Checkbox>
              )}
            />
          </div>

          <div className="grid w-full grid-cols-2 gap-4">
            <Button
              onClick={modalDisclosure.onClose}
              color="default"
              isDisabled={mutatingDelete}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleDelete}
              color="danger"
              isLoading={mutatingDelete}
            >
              Anular Venta
            </Button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  )
}

export { SaleCancelModal }
