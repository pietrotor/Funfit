import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Checkbox } from '@nextui-org/react'
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
          amount: parseInt(watch('physicialAmount')),
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
      parseInt(watch('physicialAmount')) - data?.getCashById?.data?.amount! || 0
    ).toString()
  }
  return (
    <MyModal isOpen={isOpen} onClose={onClose} size="lg">
      <section className="p-6 text-lg font-semibold">
        <h2 className=" mb-4 text-center ">Cerrar caja</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col space-y-3">
            <div className="flex justify-between">
              <div className="3/5">Dinero en caja</div>
              {data?.getCashById?.data?.amount}
            </div>
            <div className="flex justify-between">
              <div>Dinero fisico</div>
              <div className="flex w-20 items-baseline">
                <InputComponent
                  defaultValue={'0'}
                  customeClassName=""
                  height={'h-3'}
                  control={control}
                  name="physicialAmount"
                  variant="underlined"
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
          <div className="mt-6 grid h-12 w-full grid-cols-2 gap-3 ">
            <Button
              isLoading={loading}
              type="submit"
              color="secondary"
              className="h-full text-lg font-bold"
            >
              Cerrar caja
            </Button>
            <Button
                          isLoading={loading}

              variant="flat"
              color="danger"
              className="h-full text-lg font-bold"
              onClick={onClose}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </section>
    </MyModal>
  )
}
