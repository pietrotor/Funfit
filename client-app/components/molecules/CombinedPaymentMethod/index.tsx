import { Checkbox, Image } from '@nextui-org/react'
import React from 'react'
import {
  Control,
  FieldValues,
  UseFormReset,
  UseFormWatch
} from 'react-hook-form'
import InputComponent from '@/components/atoms/Input'
import { TSalePaymentMethodData } from '@/components/atoms/modals/SaleModal'
import ClientObservationPayment from '@/components/atoms/ClientObservationsPayment'

type CombinedPaymentMethodProps = {
  total: number
  payment: TSalePaymentMethodData
  setPayment: (payment: TSalePaymentMethodData) => void
  control: Control<any>
  watch: UseFormWatch<FieldValues>
  reset: UseFormReset<FieldValues>
}

function CombinedPaymentMethod({
  total,
  payment,
  setPayment,
  control,
  watch,
  reset
}: CombinedPaymentMethodProps) {
  const handleCash = (cash: string) => {
    if (parseFloat(cash)) {
      setPayment({
        paymentMethod: 'combined',
        cash: parseFloat(cash),
        change:
          parseFloat(cash) > total ? parseFloat(cash) - total : total - parseFloat(cash)
      })
    } else {
      setPayment({
        paymentMethod: 'cash',
        cash: 0,
        change: 0
      })
    }
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
      <div className="flex h-full w-full pt-2">
        <div className="border-r-gray flex w-1/2 flex-col border-r-1 px-2">
          <div className="flex w-full flex-col space-y-2">
            <div className="space-y-1">
              <Checkbox className="w-full">
                <p className="font-thin text-gray-500">Efectivo</p>
              </Checkbox>
              <InputComponent
                control={control}
                name="cashC"
                placeholder="Bs."
                type="text"
                rules={{
                  required: {
                    value: true,
                    message: 'Este campo es obligatorio'
                  },
                  pattern: {
                    value: /^[0-9]+$/i,
                    message: 'Solo se permiten números'
                  }
                }}
                onValueChange={value => handleCash(value)}
                className="w-full"
              />
            </div>

            <div className="space-y-1">
              <Checkbox>
                <p className="font-thin text-gray-500">Pago por tarjeta</p>
              </Checkbox>
              <InputComponent
                control={control}
                name="cardC"
                placeholder="Bs."
                type="text"
                rules={{
                  required: {
                    value: true,
                    message: 'Este campo es obligatorio'
                  },
                  pattern: {
                    value: /^[0-9]+$/i,
                    message: 'Solo se permiten números'
                  }
                }}
                onValueChange={value => handleCash(value)}
              />
            </div>

            <div className="space-y-1">
              <Checkbox>
                <p className="text-left font-thin text-gray-500">Pago por Qr</p>
              </Checkbox>
              <InputComponent
                control={control}
                name="qrC"
                placeholder="Bs."
                type="text"
                rules={{
                  required: {
                    value: true,
                    message: 'Este campo es obligatorio'
                  },
                  pattern: {
                    value: /^[0-9]+$/i,
                    message: 'Solo se permiten números'
                  }
                }}
                onValueChange={value => handleCash(value)}
                className="w-full"
              />
              <div className="flex w-full justify-center">
                <Image
                  id="qr"
                  alt="QR"
                  src="https://blog.tcea.org/wp-content/uploads/2022/05/qrcode_tcea.org-1.png"
                  removeWrapper
                  className="w-1/2 text-center"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 px-2">
          <ClientObservationPayment control={control} />
        </div>
      </div>
    </section>
  )
}

export default CombinedPaymentMethod
