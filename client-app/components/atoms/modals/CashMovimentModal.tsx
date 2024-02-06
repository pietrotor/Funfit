import { useForm } from 'react-hook-form'

import { MyModal } from './MyModal'
import Selector from '../InputSelector'
import InputComponent from '../Input'
import { showSuccessToast } from '../Toast/toasts'
import useGetCashById from '@/services/UseGetCashById'
import {
  StatusEnum,
  TurnMovementTypeEnum,
  useCreateCashMovementMutation
} from '@/graphql/graphql-types'

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
  const { handleSubmit, control, watch, reset } = useForm<any>({
    defaultValues: {
      movement: TurnMovementTypeEnum.ADD
    }
  })
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
            data.createCashMovement?.message ||
              'Movimiento guardado correctamente',
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
      return (
        parseInt(watch('physicialAmount')) + data?.getCashById?.data?.amount! ||
        0
      ).toString()
    }
    if (
      watch('movement') === TurnMovementTypeEnum.WITHDRAW ||
      watch('movement') === TurnMovementTypeEnum.ADJUST
    ) {
      console.log('value')

      return (
        (data?.getCashById?.data?.amount! || 0) -
        parseInt(watch('physicialAmount'))
      ).toString()
    }
  }

  return (
    <MyModal
      title="Realizar movimiento"
      message="Agrega un movimiento a la caja"
      control={control}
      loading={loading}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      handleCancel={handleCancel}
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
    >
      <section className="p-6 text-lg font-semibold">
        <div>
          <div className="mb-3 flex flex-col space-y-3">
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
                <div className="h-2">
                  <InputComponent
                    size="sm"
                    defaultValue={'0'}
                    customeClassName=""
                    control={control}
                    name="physicialAmount"
                    height={'h-full'}
                    variant="underlined"
                    isRequired={false}
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
          <InputComponent name="details" control={control} type="textArea" />
        </div>
      </section>
    </MyModal>
  )
}
