import { useForm } from 'react-hook-form'
import { Button, Checkbox } from '@nextui-org/react'
import { useState } from 'react'
import { MyModal } from './MyModal'
import InputComponent from '../Input'
import { showSuccessToast } from '../Toast/toasts'
import { useOpenCashMutation } from '@/graphql/graphql-types'
import useGetCashById from '@/services/UseGetCashById'

type ModalProps = {
  isOpen: boolean
  cashId: string
  onClose: () => void
  onConfirm: () => void
}

export const OpenCashRegister = ({
  isOpen,
  cashId,
  onClose,
  onConfirm
}: ModalProps) => {
  const [updateAmount, setUpdateAmount] = useState<boolean>(true)
  const { control, handleSubmit, watch } = useForm()
  const [openCashRegister, { loading }] = useOpenCashMutation()
  const { data } = useGetCashById(cashId)
  console.log(cashId)
  const onSubmit = () => {
    openCashRegister({
      variables: {
        createTurnInput: {
          amount: parseFloat(data?.getCashById?.data?.amount),
          cashId,
          difference: parseFloat(handleDiference()),
          physicialAmount: parseFloat(watch('physicialAmount')),
          updateToPhysicialAmount: updateAmount,
          observation: watch('details')
        }
      },
      onCompleted: data => {
        if (data.openCash?.status === 'ERROR') {
          showSuccessToast(
            data.openCash.message || 'Error al crear un usuario',
            'warning'
          )
        }
        onConfirm()
        onClose()
      },
      onError: error => {
        console.log(error)
        showSuccessToast('Error al crear un usuario', 'warning')
      }
    })
    console.log('submit')
  }
  const handleDiference = () => {
    return (parseInt(watch('physicialAmount')) - (data?.getCashById?.data?.amount!)).toString()
  }

  return (
    <MyModal isOpen={isOpen} onClose={onClose} size="lg">
      <section className="p-6 text-lg font-semibold">
        <h2 className=" mb-4 text-center ">Abrir caja</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col space-y-3">
            <div className="flex justify-between">
              <div className="3/5">Dinero en caja</div>
              {data?.getCashById?.data?.amount} Bs
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
          <div className="my-4 flex justify-between">
            <div>Diferencia</div>
            <div> { handleDiference() }</div>
          </div>
          <InputComponent name="details" control={control} type="textArea" />
          <Checkbox isSelected={updateAmount} onClick={() => setUpdateAmount(!updateAmount)} defaultSelected size="sm">
            Actualizar estado en caja
          </Checkbox>
          <div className="mt-6 grid h-12 w-full grid-cols-2 gap-3 ">
            <Button
              isLoading={loading}
              type="submit"
              color="secondary"
              className="h-full text-lg font-bold"
            >
              Abrir caja
            </Button>
            <Button
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
