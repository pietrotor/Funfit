import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Checkbox } from '@nextui-org/react'
import { MyModal } from './MyModal'
import { showSuccessToast } from '../Toast/toasts'
import InputComponent from '../Input'
import { StatusEnum, useCloseCashMutation } from '@/graphql/graphql-types'
import useGetCashById from '@/services/UseGetCashById'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  cashId: string
}

export const CloseCashRegister = ({
  isOpen,
  cashId,
  onClose,
  onConfirm
}: ModalProps) => {
  const { control, watch, reset, handleSubmit } = useForm()
  const [updateAmount, setUpdateAmount] = useState<boolean>(true)
  const [CloseCashRegister, { loading }] = useCloseCashMutation()
  const { data } = useGetCashById(cashId)
  const onSubmit = () => {
    CloseCashRegister({
      variables: {
        closeTurnInput: {
          cashId,
          amount: data?.getCashById?.data?.amount || 0,
          observation: watch('details'),
          updateToPhysicialAmount: updateAmount,
          difference: parseFloat(handleDiference()),
          physicialAmount: parseFloat(watch('physicialAmount')),
          turnId: data?.getCashById?.data?.currentTurnId.toString()
        }
      },
      onCompleted: data => {
        if (data.closeCash?.status === StatusEnum.ERROR) {
          showSuccessToast(
            data.closeCash.message || 'Ocurrió un error',
            'error'
          )
        } else {
          showSuccessToast(
            data.closeCash?.message || 'Caja cerrada correctamente',
            'success'
          )
          onClose()
          reset()
          onConfirm()
        }
      }
    })
  }
  const handleDiference = () => {
    return (
      (data?.getCashById?.data?.amount! || 0) -
      parseFloat(watch('physicialAmount') || 0)
    ).toString()
  }
  return (
    <MyModal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      title="Cerrar caja"
      message="Ingrese los datos para cerrar la caja"
      control={control}
      loading={loading}
      handleCancel={onClose}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      reset={reset}
    >
      <section className="p-6 text-lg font-semibold">
        <h2 className=" mb-4 text-center ">Cerrar caja</h2>
        <div>
          <div className="flex flex-col space-y-3">
            <div className="flex justify-between">
              <div className="3/5">Dinero en caja</div>
              {data?.getCashById?.data?.amount}
            </div>
            <div className="flex justify-between">
              <div>Dinero fisico</div>
              <div className="flex w-20 items-baseline">
                <InputComponent
                  required={false}
                  size="sm"
                  isRequired={false}
                  defaultValue={'0'}
                  customeClassName=""
                  height={'h-3'}
                  control={control}
                  name="physicialAmount"
                  variant="underlined"
                  rules={{
                    required: { value: true, message: 'Campo requerido' }
                  }}
                />{' '}
                Bs
              </div>
            </div>
          </div>
          <hr />
          <div className="mt-2 flex justify-between">
            <div>Diferencia</div>
            <div> {handleDiference()}</div>
          </div>
          <InputComponent name="details" control={control} type="textArea" />
          <Checkbox
            isSelected={updateAmount}
            onClick={() => setUpdateAmount(!updateAmount)}
            defaultSelected
            size="sm"
          >
            Actualizar estado en caja
          </Checkbox>
        </div>
      </section>
    </MyModal>
  )
}
