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
}

function QrPayment({
  total,
  payment,
  setPayment,
  control,
  watch,
  reset
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
      <div className="flex h-full w-full pt-2">
        <div className="border-r-gray flex w-1/2 flex-col border-r-1 px-2">
          <p className="text-left font-thin text-gray-500">Monto</p>
          <div className="flex w-full justify-center">
            <Image
              id="qr"
              alt="QR"
              src="https://blog.tcea.org/wp-content/uploads/2022/05/qrcode_tcea.org-1.png"
              removeWrapper
              className="w-1/2 text-center"
            />
          </div>
          <Button
          variant="flat"
          color="secondary"
          className="border-2 hover:border-secondary text-md text-gray-500 flex justify-between"
            onClick={() => handleCash(total.toString())}
          >
            {payment.cash > 0 ? 'Pago confirmado' : 'Confirmar pago'}
            <IconSelector
              name="check"
              className={`text-secondary ${payment.cash > 0 ? 'block' : 'hidden'}`}
            />
          </Button>
        </div>
        <div className="w-1/2 px-2">
          <ClientObservationPayment control={control} />
        </div>
      </div>
    </section>
  )
}

export default QrPayment
