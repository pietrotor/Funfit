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
import { formatBs } from '@/utils/formatBs'

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
    <section className="px-4 pb-4 md:p-4">
      <div className="flex w-full flex-col gap-4 md:flex-row">
        <div className="flex w-full flex-col md:w-1/2 md:border-r md:border-stone-200 md:pr-4">
          <p className="text-sm font-medium text-stone-500">Monto {formatBs(total)}</p>
          <div className="my-3 flex w-full justify-center">
            <Image
              id="qr"
              alt="QR"
              src="https://blog.tcea.org/wp-content/uploads/2022/05/qrcode_tcea.org-1.png"
              removeWrapper
              className="h-36 w-36 object-contain"
            />
          </div>
          <Button
            variant="flat"
            className="h-11 w-full border border-stone-200 bg-white text-sm font-semibold text-tertiary hover:border-secondary"
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
        <div className="w-full md:w-1/2">
          <ClientObservationPayment control={control} />
        </div>
      </div>
    </section>
  )
}

export default QrPayment
