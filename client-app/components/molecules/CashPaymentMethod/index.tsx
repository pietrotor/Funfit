import { Button } from '@nextui-org/react'
import React from 'react'
import {
  Control,
  FieldValues,
  UseFormReset,
  UseFormSetValue,
  UseFormWatch
} from 'react-hook-form'
import InputComponent from '@/components/atoms/Input'
import { TSalePaymentMethodData } from '@/components/atoms/modals/SaleModal'
import ClientObservationPayment from '@/components/atoms/ClientObservationsPayment'
import { formatBs } from '@/utils/formatBs'

type CashPaymentMethodProps = {
  total: number
  payment: TSalePaymentMethodData
  setPayment: (payment: TSalePaymentMethodData) => void
  control: Control<any>
  watch: UseFormWatch<FieldValues>
  reset: UseFormReset<FieldValues>
  setValue: UseFormSetValue<FieldValues>
}

function CashPaymentMethod({
  total,
  payment,
  setPayment,
  control,
  watch,
  reset,
  setValue
}: CashPaymentMethodProps) {
  const handleCash = (cash: string) => {
    if (parseFloat(cash)) {
      setPayment({
        paymentMethod: 'cash',
        cash: parseFloat(cash),
        change: parseFloat(cash) > total ? parseFloat(cash) - total : 0
      })
      setValue('amountRecibed', parseFloat(cash))
    } else {
      setPayment({
        paymentMethod: 'cash',
        cash: 0,
        change: 0
      })
    }
  }

  const handleMultipleOfFive = (number: number) => {
    return (number + 1) % 5 === 0 ? number + 1 : number + (5 - (number % 5))
  }

  return (
    <section className="px-4 pb-4 md:p-4">
      <div className="mb-3 flex items-center justify-between rounded-xl bg-stone-50 px-3 py-2">
        <p className="text-sm font-medium text-stone-500">
          {payment.cash > total ? 'Cambio' : 'Por pagar'}
        </p>
        <p className="num text-base font-semibold text-primary-600">
          {formatBs(payment.cash > 0 ? payment.change : total - payment.cash)}
        </p>
      </div>
      <div className="flex w-full flex-col gap-4 md:flex-row">
        <div className="flex w-full flex-col md:w-1/2 md:border-r md:border-stone-200 md:pr-4">
          <div className="flex flex-col">
            <p className="text-sm font-medium text-stone-500">Efectivo</p>
            <InputComponent
              control={control}
              name="amountRecibed"
              placeholder="Bs."
              type="text"
              rules={{
                required: {
                  value: payment.paymentMethod === 'cash',
                  message: 'Este campo es obligatorio'
                },
                pattern: {
                  value: /^[0-9]+$/i,
                  message: 'Solo se permiten números'
                },
                validate: {
                  value: value =>
                    parseFloat(value) >= total ||
                    'El efectivo debe ser mayor o igual al total'
                }
              }}
              onValueChange={value => handleCash(value)}
            />

            <p className="mt-3 text-sm font-medium text-stone-500">Opciones rápidas</p>
            <div className="mt-2 grid grid-cols-3 gap-2">
              <Button
                variant="flat"
                className="h-auto min-h-[2.5rem] border border-stone-200 bg-white px-1 text-xs font-semibold text-tertiary hover:border-secondary sm:text-sm"
                onClick={() => handleCash(total.toString())}
              >
                {formatBs(total)}
              </Button>
              <Button
                variant="flat"
                color="secondary"
                className="h-auto min-h-[2.5rem] border border-stone-200 bg-white px-1 text-xs font-semibold text-tertiary hover:border-secondary sm:text-sm"
                onClick={() =>
                  handleCash(handleMultipleOfFive(total).toString())
                }
              >
                {formatBs(handleMultipleOfFive(total))}
              </Button>
              <Button
                variant="flat"
                color="secondary"
                className="h-auto min-h-[2.5rem] border border-stone-200 bg-white px-1 text-xs font-semibold text-tertiary hover:border-secondary sm:text-sm"
                onClick={() =>
                  handleCash((handleMultipleOfFive(total) + 5).toString())
                }
              >
                {formatBs(handleMultipleOfFive(total) + 5)}
              </Button>
            </div>
          </div>
        </div>
        <div className="w-full border-t border-stone-100 pt-3 md:w-1/2 md:border-t-0 md:pt-0">
          <ClientObservationPayment control={control} />
        </div>
      </div>
    </section>
  )
}

export default CashPaymentMethod
