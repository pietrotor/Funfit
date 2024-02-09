import {
  Control,
  FieldValues,
  UseFormReset,
  UseFormWatch
} from 'react-hook-form'
import { Button, Image } from '@nextui-org/react'
import { TSalePaymentMethodData } from '@/components/atoms/modals/SaleModal'
import ClientObservationPayment from '@/components/atoms/ClientObservationsPayment'
import IconSelector from '@/components/atoms/IconSelector'

type QrPaymentMethodProps = {
  total: number
  payment: TSalePaymentMethodData
  setPayment: (payment: TSalePaymentMethodData) => void
  control: Control<any>
  watch: UseFormWatch<FieldValues>
  reset: UseFormReset<FieldValues>
  qrPayment: boolean
  setQrPayment: (qrPayment: boolean) => void
}

function QrPayment({
  total,
  payment,
  setPayment,
  control,
  watch,
  reset,
  qrPayment,
  setQrPayment
}: QrPaymentMethodProps) {
  const handleCash = (cash: string) => {
    setPayment({
      ...payment,
      paymentMethod: 'qr',
      cash: parseFloat(cash),
      change: parseFloat(cash) - total
    })
  }
  return (
    <section className="h-full p-4">
      <div className="flex items-center justify-between ">
        <p className="text-lg text-gray-500 ">Cambio</p>
        <hr className="mx-4  flex-grow border-1 border-gray-200" />
        <p className="text-lg text-primary">Bs. 0</p>
      </div>
      <div className="flex h-full w-full flex-col space-y-4 pt-2 md:flex-row md:space-x-0">
        <div className="md:border-r-gray flex flex-col px-2 md:w-1/2 md:border-r-1">
          <p className="text-left font-thin text-gray-500">Monto</p>
          <div className="flex w-full justify-center">
            <Image
              id="qr"
              alt="QR"
              src="https://blog.tcea.org/wp-content/uploads/2022/05/qrcode_tcea.org-1.png"
              removeWrapper
              className="w-1/4 text-center md:w-1/2"
            />
          </div>
          <Button
            variant="flat"
            color="secondary"
            className="text-md flex justify-between border-2 text-gray-500 hover:border-secondary"
            onClick={() => {
              handleCash(total.toString())
              setQrPayment(true)
            }}
          >
            {payment.cash > 0 ? 'Pago confirmado' : 'Confirmar pago'}
            <IconSelector
              name="check"
              className={`text-secondary ${
                payment.cash > 0 ? 'block' : 'hidden'
              }`}
            />
          </Button>
        </div>
        <div className="px-2 md:w-1/2">
          <ClientObservationPayment control={control} />
        </div>
      </div>
    </section>
  )
}

export default QrPayment
