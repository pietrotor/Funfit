import { ReactNode } from 'react'
import { Checkbox } from '@nextui-org/react'
import { Control, FieldValues, UseFormWatch } from 'react-hook-form'
import { TSalePaymentMethodData } from '@/components/atoms/modals/SaleModal'
import ClientObservationPayment from '@/components/atoms/ClientObservationsPayment'
import { formatBs } from '@/utils/formatBs'

type PlatformPaymentMethodProps = {
  total: number
  payment: TSalePaymentMethodData
  setPayment: (payment: TSalePaymentMethodData) => void
  control: Control<any>
  watch: UseFormWatch<FieldValues>
  label: string
  mark?: ReactNode
}

function PlatformPaymentMethod({
  total,
  payment,
  setPayment,
  control,
  label,
  mark
}: PlatformPaymentMethodProps) {
  return (
    <section className="px-4 pb-4 md:p-4">
      <div className="flex w-full flex-col gap-4 md:flex-row">
        <div className="flex w-full flex-col gap-3 md:w-1/2">
          {mark && <div className="flex justify-center md:justify-start">{mark}</div>}
          <p className="text-sm font-medium text-stone-500">
            Monto: {formatBs(total)}
          </p>
          <p className="text-sm text-stone-500">
            Pago por {label}. Por defecto el dinero no ingresa a caja.
          </p>
          <Checkbox
            isSelected={!!payment.entersCash}
            onValueChange={value =>
              setPayment({
                ...payment,
                cash: total,
                change: 0,
                entersCash: value
              })
            }
          >
            Ingresar dinero a caja
          </Checkbox>
        </div>
        <div className="w-full md:w-1/2">
          <ClientObservationPayment control={control} />
        </div>
      </div>
    </section>
  )
}

export default PlatformPaymentMethod
