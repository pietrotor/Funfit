import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { FieldValues, UseFormReturn } from 'react-hook-form'
import InputComponent from '@/components/atoms/Input'
import ClientObservationPayment from '@/components/atoms/ClientObservationsPayment'
import { TDistributorSalePaymentMethodData } from '@/components/atoms/modals/SaleDistributorModal'

type CashPaymentMethodProps = {
  total: number
  payment: TDistributorSalePaymentMethodData
  setPayment: Dispatch<SetStateAction<TDistributorSalePaymentMethodData>>
  form: UseFormReturn<FieldValues>
}

function DistributorCashPaymentMethod({
  total,
  payment,
  form,
  setPayment
}: CashPaymentMethodProps) {
  const { control } = form

  useEffect(() => {
    setPayment(state => ({
      ...state,
      balance: 0,
      cash: total
    }))
  }, [total])

  return (
    <section className="h-full p-4">
      <div className="flex items-center justify-between ">
        <p className="text-lg text-gray-500 ">
          {payment.cash > total ? 'Cambio' : 'Por pagar'}
        </p>
        <hr className="mx-4  flex-grow border-1 border-gray-200" />
        <p className="text-lg text-primary">Bs. {total}</p>
      </div>
      <div className="flex h-full w-full flex-col pt-2 md:flex-row">
        <div className="md:border-r-gray flex flex-col px-2 md:w-1/2 md:border-r-1">
          <div className="flex flex-col">
            <p className="font-thin text-gray-500">Efectivo</p>
            <InputComponent
              control={control}
              name="amountRecibed"
              placeholder="Bs."
              type="text"
              disabled
              isDisabled
              defaultValue={total as any}
              value={total as any}
            />
          </div>
        </div>
        <div className="mt-4 border-t-2 px-2 md:mt-0 md:w-1/2 md:border-t-0">
          <ClientObservationPayment hideClient control={control} />
        </div>
      </div>
    </section>
  )
}

export default DistributorCashPaymentMethod
