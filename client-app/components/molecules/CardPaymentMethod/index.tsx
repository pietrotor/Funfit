import { ReactNode } from 'react'
import {
  Control,
  FieldValues,
  UseFormReset,
  UseFormWatch
} from 'react-hook-form'
import { TSalePaymentMethodData } from '@/components/atoms/modals/SaleModal'
import InputComponent from '@/components/atoms/Input'
import ClientObservationPayment from '@/components/atoms/ClientObservationsPayment'
import { getTotalAfterFee } from '@/utils/paymentFees'

type CardPaymentMethodProps = {
  total: number
  payment: TSalePaymentMethodData
  setPayment: (payment: TSalePaymentMethodData) => void
  control: Control<any>
  watch: UseFormWatch<FieldValues>
  reset: UseFormReset<FieldValues>
  method: string
  logo?: ReactNode
}

function CardPaymentMethod({
  total,
  payment,
  control,
  method,
  logo
}: CardPaymentMethodProps) {
  const netTotal = getTotalAfterFee(total, method)

  return (
    <section className="px-4 pb-4 md:p-4">
      <div className="flex w-full flex-col gap-4 md:flex-row">
        <div className="flex w-full flex-col md:w-1/2 md:border-r md:border-stone-200 md:pr-4">
          {logo && <div className="mb-3 flex justify-center">{logo}</div>}
          <p className="text-sm font-medium text-stone-500">Monto</p>
          <InputComponent
            control={control}
            name="feeAmountRecibed"
            placeholder="Bs."
            type="text"
            rules={{
              required: {
                value: true,
                message: 'Este campo es obligatorio'
              }
            }}
            defaultValue={netTotal.toString()}
            isDisabled
          />
        </div>
        <div className="w-full md:w-1/2">
          <ClientObservationPayment control={control} />
        </div>
      </div>
    </section>
  )
}

export default CardPaymentMethod
