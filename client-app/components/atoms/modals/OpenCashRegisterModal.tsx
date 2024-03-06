import { useForm } from 'react-hook-form'
import { Checkbox } from '@nextui-org/react'
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

  const onSubmit = () => {
    openCashRegister({
      variables: {
        createTurnInput: {
          amount: data?.getCashById?.data?.amount || 0,
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
        showSuccessToast('Error al recibir datos', 'warning')
      }
    })
    console.log('submit')
  }
  const handleDiference = () => {
    return (
      data?.getCashById?.data?.amount! - parseFloat(watch('physicialAmount')) ||
      0
    ).toString()
  }

  return (
    <MyModal
      title="Abrir caja"
      message="Agregar dinero fisico a la caja"
      handleCancel={onClose}
      color="success"
      loading={loading}
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      control={control}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
    >
      <div className="px-8">
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
    </MyModal>
  )
}
