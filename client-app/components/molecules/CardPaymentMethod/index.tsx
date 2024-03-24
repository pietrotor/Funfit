import {
  Control,
  FieldValues,
  UseFormReset,
  UseFormWatch
} from 'react-hook-form'
import Decimal from 'decimal.js'
import { TSalePaymentMethodData } from '@/components/atoms/modals/SaleModal'
import InputComponent from '@/components/atoms/Input'
import ClientObservationPayment from '@/components/atoms/ClientObservationsPayment'

type CardPaymentMethodProps = {
  total: number
  payment: TSalePaymentMethodData
  setPayment: (payment: TSalePaymentMethodData) => void
  control: Control<any>
  watch: UseFormWatch<FieldValues>
  reset: UseFormReset<FieldValues>
}

function CardPaymentMethod({
  total,
  payment,
  setPayment,
  control,
  watch,
  reset
}: CardPaymentMethodProps) {
  return (
    <section className="h-full p-4">
      <div className="flex items-center justify-between ">
        <p className="text-lg text-gray-500 ">Cambio</p>
        <hr className="mx-4  flex-grow border-1 border-gray-200" />
        <p className="text-lg text-primary">Bs. 0</p>
      </div>
      <div className="flex h-full w-full flex-col pt-2 md:flex-row">
        <div className="border-r-gray flex flex-col px-2 md:w-1/2 md:border-r-1">
          <p className="font-thin text-gray-500">Monto</p>
          <InputComponent
            control={control}
            name="cardAmountRecibed"
            placeholder="Bs."
            type="text"
            rules={{
              required: {
                value: payment.paymentMethod === 'card',
                message: 'Este campo es obligatorio'
              }
            }}
            defaultValue={new Decimal(total)
              .minus(new Decimal(total).mul(0.02).toNumber())
              .toNumber()
              .toString()}
            isDisabled
          />
        </div>
        <div className="w-1/2 px-2">
          <ClientObservationPayment control={control} />
        </div>
      </div>
    </section>
  )
}

export default CardPaymentMethod
