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
    console.log('CALLED')
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
    <section className="h-full p-4">
      <div className="flex items-center justify-between ">
        <p className="text-lg text-gray-500 ">
          {payment.cash > total ? 'Cambio' : 'Por pagar'}
        </p>
        <hr className="mx-4  flex-grow border-1 border-gray-200" />
        <p className="text-lg text-primary">
          Bs. {payment.cash > 0 ? payment.change : total - payment.cash}
        </p>
      </div>
      <div className="flex md:flex-row flex-col h-full w-full pt-2">
        <div className="md:border-r-gray flex md:w-1/2 flex-col md:border-r-1 px-2">
          <div className="flex flex-col">
            <p className="font-thin text-gray-500">Efectivo</p>
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

            <p className="font-thin text-gray-500">Opciones rápidas</p>
            <div className="ga grid grid-cols-3 gap-3">
              <Button
                variant="flat"
                color="secondary"
                className="border-2 text-lg text-gray-500 hover:border-secondary"
                onClick={() => handleCash(total.toString())}
              >
                {total}
              </Button>
              <Button
                variant="flat"
                color="secondary"
                className="border-2 text-lg text-gray-500 hover:border-secondary"
                onClick={() =>
                  handleCash(handleMultipleOfFive(total).toString())
                }
              >
                {handleMultipleOfFive(total)}
              </Button>
              <Button
                variant="flat"
                color="secondary"
                className="border-2 text-lg text-gray-500 hover:border-secondary"
                onClick={() =>
                  handleCash((handleMultipleOfFive(total) + 5).toString())
                }
              >
                {handleMultipleOfFive(total) + 5}
              </Button>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 px-2 md:border-t-0 border-t-2 md:mt-0 mt-4">
          <ClientObservationPayment control={control} />
        </div>
      </div>
    </section>
  )
}

export default CashPaymentMethod
