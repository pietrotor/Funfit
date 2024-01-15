import { useForm } from 'react-hook-form'
import { Button, Checkbox } from '@nextui-org/react'

import { MyModal } from './MyModal'
import Selector from '../InputSelector'
import InputComponent from '../Input'
import { showSuccessToast } from '../Toast/toasts'
import useGetCashById from '@/services/UseGetCashById'
import { StatusEnum, TurnMovementTypeEnum, useCreateCashMovementMutation } from '@/graphql/graphql-types'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  cashId: string
}

export const CashMovimentModal = ({
  isOpen,
  onClose,
  onConfirm,
  cashId
}: ModalProps) => {
  const { handleSubmit, control, watch, reset } = useForm()
  const { data } = useGetCashById(cashId)

  const [createCashMovement, { loading }] = useCreateCashMovementMutation()

  const onSubmit = () => {
    createCashMovement({
      variables: {
        createTurnMovementInput: {
          amount: parseInt(watch('physicialAmount')),
          cashId,
          concept: watch('details'),
          type: watch('movement'),
          date: new Date().toISOString(),
          turnId: data?.getCashById?.data?.currentTurnId.toString()
        }
      },
      onCompleted: data => {
        if (data.createCashMovement?.status === StatusEnum.ERROR) {
          showSuccessToast(
            data.createCashMovement?.message || 'Ocurrió un error',
            'error'
          )
        } else {
          showSuccessToast(
            data.createCashMovement?.message || 'Movimiento guardado correctamente',
            'success'
          )
          onClose()
          reset()
          onConfirm()
        }
      }
    })
  }
  const handleCancel = () => {
    reset()
    onClose()
  }
  const handleChangeValue = () => {
    if (watch('movement') === TurnMovementTypeEnum.ADD) {
      console.log(watch('movement'))

      return (
        parseInt(watch('physicialAmount')) + data?.getCashById?.data?.amount! || 0
      ).toString()
    }
    if (watch('movement') === TurnMovementTypeEnum.WITHDRAW || watch('movement') === TurnMovementTypeEnum.ADJUST) {
      console.log('value')

      return (
        (data?.getCashById?.data?.amount! || 0) - parseInt(watch('physicialAmount'))
      ).toString()
    }
    console.log(watch('movement'))
  }

  return (
    <MyModal isOpen={isOpen} onClose={onClose} size="lg">
      <section className="p-6 text-lg font-semibold">
        <h2 className=" mb-4 text-center ">Agregar movimiento</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col space-y-3 mb-3">
            <div className="flex justify-between">
              <div className="3/5">Tipo de movimiento</div>
              <div className="w-2/5">
                <Selector
                  name="movement"
                  label="Unidades"
                  defaultValue={TurnMovementTypeEnum.ADD}
                  control={control}
                  options={[
                    { label: 'Entrada', value: TurnMovementTypeEnum.ADD },
                    { label: 'Salida', value: TurnMovementTypeEnum.WITHDRAW },
                    { label: 'Ajuste', value: TurnMovementTypeEnum.ADJUST }
                  ]}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div>Dinero en caja</div>
              <div>{data?.getCashById?.data?.amount}</div>
            </div>
            <div className="flex justify-between ">
              <div>Monto del movimiento</div>
              <div className="flex w-20 items-baseline">
                <div className='h-2'>
                <InputComponent
                  defaultValue={'0'}
                  customeClassName=""
                  control={control}
                  name="physicialAmount"
                  height={'h-full'}
                  variant="underlined"
                  rules={{
                    required: {
                      value: true,
                      message: 'Este campo es obligatorio'
                    }
                  }}
                />
                </div>
                Bs
              </div>
            </div>
          </div>
          <hr />
          <div className="my-4 flex justify-between">
            <div>Diferencia</div>
            <div> {handleChangeValue()} Bs</div>
          </div>
          <InputComponent name="details" control={control} type="textArea"/>
          <Checkbox defaultSelected size="sm">Actualizar movimiento caja</Checkbox>
          <div className="mt-6 grid h-12 w-full grid-cols-2 gap-3 ">
            <Button
              isLoading={loading}
              type="submit"
              color="secondary"
              className="h-full text-lg font-bold"
            >
              Agregar
            </Button>
            <Button
              variant="flat"
              color="danger"
              className="h-full text-lg font-bold"
              onClick={() => handleCancel() }
            >
              Cancelar
            </Button>
          </div>
        </form>
      </section>
    </MyModal>
  )
}
