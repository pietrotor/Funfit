import { Checkbox } from '@nextui-org/react'
import { Control, FieldValues, UseFormWatch } from 'react-hook-form'
import { TSalePaymentMethodData } from '@/components/atoms/modals/SaleModal'
import ClientObservationPayment from '@/components/atoms/ClientObservationsPayment'

type PlatformPaymentMethodProps = {
  total: number
  payment: TSalePaymentMethodData
  setPayment: (payment: TSalePaymentMethodData) => void
  control: Control<any>
  watch: UseFormWatch<FieldValues>
  label: string
}

function PlatformPaymentMethod({
  total,
  payment,
  setPayment,
  control,
  label
}: PlatformPaymentMethodProps) {
  return (
    <section className="h-full p-4">
      <div className="flex items-center justify-between">
        <p className="text-lg text-gray-500">Cambio</p>
        <hr className="mx-4 flex-grow border-1 border-gray-200" />
        <p className="text-lg text-primary">Bs. 0</p>
      </div>
      <div className="flex h-full w-full flex-col space-y-4 pt-2 md:flex-row md:space-x-4">
        <div className="flex flex-col gap-4 px-2 md:w-1/2">
          <p className="text-left font-thin text-gray-500">Monto: Bs. {total}</p>
          <p className="text-sm text-gray-500">
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
        <div className="px-2 md:w-1/2">
          <ClientObservationPayment control={control} />
        </div>
      </div>
    </section>
  )
}

export default PlatformPaymentMethod
