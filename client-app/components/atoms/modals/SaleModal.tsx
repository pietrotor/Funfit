import { useState } from 'react'
import { Button } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { MyModal } from './MyModal'
import IconSelector from '../IconSelector'
import SalePaymentMethod from '@/components/molecules/SalePaymentMethod'
import CashPaymentMethod from '@/components/molecules/CashPaymentMethod'
import CardPaymentMethod from '@/components/molecules/CardPaymentMethod'
import CombinedPaymentMethod from '@/components/molecules/CombinedPaymentMethod'
import QrPaymentMethod from '@/components/molecules/QrPaymentMethod'

interface SaleModalProps {
  isOpen: boolean
  onClose: () => void
  total: number
}

export type TSalePaymentMethodData = {
  paymentMethod: string
  cash: number
  change: number
}

function SaleModal({ isOpen, onClose, total }: SaleModalProps) {
  const { handleSubmit, control, watch, reset } = useForm()
  const [payment, setPayment] = useState<TSalePaymentMethodData>({
    paymentMethod: 'options',
    cash: 0,
    change: 0
  })

  const onSubmit = () => {
    console.log('hola mundo')
  }

  const handleCancel = () => {
    reset()
    onClose()
  }

  const handleBack = () => {
    console.log('entra al método')
    if (payment.paymentMethod === 'options') {
      reset()
      onClose()
    } else {
      reset()
      setPayment({
        paymentMethod: 'options',
        cash: 0,
        change: 0
      })
    }
  }

  return (
    <MyModal
      isOpen={isOpen}
      onClose={onClose}
      hideCloseButton={false}
      size="2xl"
    >
      <form
        onSubmit={handleSubmit(() => onSubmit())}
        className="flex h-[30rem] flex-col"
      >
        <div className="border-b-gray min-h-[1/7] w-full border-b-1">
          <h1 className="p-4 text-xl text-gray-500">Recibo de venta</h1>
        </div>

        <div className={`flex-grow ${payment.paymentMethod === 'combined' ? 'overflow-y-scroll' : 'overflow-hidden'}`}>
          <div className="flex h-1/6 items-center justify-center space-x-3 py-3">
            <h2 className="text-xl text-gray-500">Total:</h2>
            <h3 className="text-2xl font-thin text-gray-500">Bs. {total}</h3>
          </div>
          <div className="h-5/6">
            {payment.paymentMethod === 'options' ? (
              <SalePaymentMethod setPayment={setPayment} />
            ) : payment.paymentMethod === 'cash' ? (
              <CashPaymentMethod
                total={total}
                payment={payment}
                setPayment={setPayment}
                control={control}
                watch={watch}
                reset={reset}
              />
            ) : payment.paymentMethod === 'card' ? (
              <CardPaymentMethod
                total={total}
                payment={payment}
                setPayment={setPayment}
                control={control}
                watch={watch}
                reset={reset}
              />
            ) : payment.paymentMethod === 'qr' ? (
              <QrPaymentMethod
                total={total}
                payment={payment}
                setPayment={setPayment}
                control={control}
                watch={watch}
                reset={reset}
              />
            ) : (
              <CombinedPaymentMethod
                total={total}
                payment={payment}
                setPayment={setPayment}
                control={control}
                watch={watch}
                reset={reset}
              />
            )}
          </div>
        </div>

        <div className="border-t-gray mt-3 flex min-h-[1/7] justify-between border-t-1 p-4">
          <Button
            variant="flat"
            color="default"
            className={`border-2 border-gray-300 text-lg text-gray-500 ${
              payment.paymentMethod === 'options' ? 'cursor-not-allowed' : 'cursor-pointer'
            }`}
            onClick={handleBack}
            isDisabled={payment.paymentMethod === 'options'}
          >
            <IconSelector name="arrow-left" /> Atrás
          </Button>
          <div className="space-x-4">
            <Button
              variant="flat"
              color="default"
              className="border-2 border-gray-300 text-lg text-gray-500"
              onClick={handleCancel}
            >
              Cancelar
            </Button>
            <Button
              className={`bg-secondary text-lg font-bold text-white ${
                payment.paymentMethod === 'options' ? 'cursor-not-allowed' : 'cursor-pointer'
              }`}
              type="submit"
              isDisabled={payment.paymentMethod === 'options'}
            >
              Generar recibo
            </Button>
          </div>
        </div>
      </form>
    </MyModal>
  )
}

export default SaleModal
