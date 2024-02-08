import {
  Control,
  FieldValues,
  UseFormReset,
  UseFormWatch
} from 'react-hook-form'
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
      <div className="flex h-full w-full pt-2 md:flex-row flex-col">
        <div className="border-r-gray flex md:w-1/2 flex-col md:border-r-1 px-2">
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
            defaultValue={(total - total * 0.02).toString()}
            isDisabled
          />
        </div>
        <div className="md:w-1/2 px-2 md:border-0 border-t-2 md:m-0 mt-4 pt-2 md:pt-0">
          <ClientObservationPayment control={control}/>
        </div>
      </div>
    </section>
  )
}

export default CardPaymentMethod
