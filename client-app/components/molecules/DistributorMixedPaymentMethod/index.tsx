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

function DistributorMixedPaymentMethod({
  total,
  payment,
  form,
  setPayment
}: CashPaymentMethodProps) {
  const { control } = form

  useEffect(() => {
    setPayment(state => ({
      ...state,
      balance: total,
      cash: 0
    }))
  }, [total])

  const handleChangeBalance = (value: number) => {
    if (total > value) {
      setPayment(state => ({
        ...state,
        balance: value,
        cash: total - value
      }))
    }
  }

  const handleChangeCash = (value: number) => {
    if (total > value) {
      setPayment(state => ({
        ...state,
        balance: total - value,
        cash: value
      }))
    }
  }

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
            <p className="font-thin text-gray-500">Crédito</p>
            <InputComponent
              name="amountRecibed"
              placeholder="Bs."
              type="text"
              defaultValue={payment.balance as any}
              value={payment.balance as any}
              onValueChange={e => handleChangeBalance(parseFloat(e))}
            />
            <p className="font-thin text-gray-500">Contado</p>
            <InputComponent
              name="amountRecibed"
              placeholder="Bs."
              type="text"
              defaultValue={payment.cash as any}
              value={payment.cash as any}
              onValueChange={e => handleChangeCash(parseFloat(e))}
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

export default DistributorMixedPaymentMethod
