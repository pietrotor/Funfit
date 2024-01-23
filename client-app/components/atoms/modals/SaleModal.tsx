import { useState } from 'react'
import { Button } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { MyModal } from './MyModal'
import IconSelector from '../IconSelector'
import { TPointOfSaleData } from '../../../pages/administration-panel/point-of-sale'
import SalePaymentMethod from '@/components/molecules/SalePaymentMethod'
import CashPaymentMethod from '@/components/molecules/CashPaymentMethod'
import CardPaymentMethod from '@/components/molecules/CardPaymentMethod'
import CombinedPaymentMethod from '@/components/molecules/CombinedPaymentMethod'
import QrPaymentMethod from '@/components/molecules/QrPaymentMethod'
import { useCreateSaleQuery } from '@/hooks/UseSaleQuery'
import { useAppSelector } from '@/store/index'
import { PaymentMethodEnum } from '@/graphql/graphql-types'

interface SaleModalProps {
  isOpen: boolean
  onClose: () => void
  selectedProducts: TPointOfSaleData
  setSelectedProducts: (products: TPointOfSaleData) => void
}

export type TSalePaymentMethodData = {
  paymentMethod: string
  cash: number
  change: number
}

function SaleModal({
  isOpen,
  onClose,
  selectedProducts,
  setSelectedProducts
}: SaleModalProps) {
  const { handleSubmit, control, watch, reset, setValue } = useForm()
  const branchIdSelected = useAppSelector(
    state => state.branchReducer.currentBranch.id
  )
  const { handleCreateSale } = useCreateSaleQuery()
  const [payment, setPayment] = useState<TSalePaymentMethodData>({
    paymentMethod: 'options',
    cash: 0,
    change: 0
  })

  const onSubmit = () => {
    handleCreateSale({
      amountRecibed: payment.cash || parseFloat(watch('amountRecibed')),
      branchId: branchIdSelected,
      change: payment.change,
      client: watch('client'),
      date: new Date().toISOString(),
      discount: selectedProducts.discount,
      observations: watch('observations') || '',
      products: selectedProducts.products.map(item => ({
        branchProductId: item.id || '',
        productId: item?.productId || '',
        qty: item?.quantity || 0,
        price: item?.price || 0,
        total: item.total || 0
      })),
      paymentMethod:
        payment.paymentMethod === 'cash' ? PaymentMethodEnum.CASH : payment.paymentMethod === 'card' ? PaymentMethodEnum.CARD : PaymentMethodEnum.QR_TRANSFER,
      total: selectedProducts.total,
      subTotal: selectedProducts.subTotal
    })
    reset()
    onClose()
    setSelectedProducts({ products: [], subTotal: 0, total: 0, discount: 0 })
    setPayment({ paymentMethod: 'options', cash: 0, change: 0 })
  }

  const handleCancel = () => {
    reset()
    onClose()
    setPayment({ paymentMethod: 'options', cash: 0, change: 0 })
  }

  const handleBack = () => {
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

        <div
          className={`flex-grow ${
            payment.paymentMethod === 'combined' ? 'overflow-y-scroll' : 'overflow-hidden'
          }`}
        >
          <div className="flex h-1/6 items-center justify-center space-x-3 py-3">
            <h2 className="text-xl text-gray-500">Total:</h2>
            <h3 className="text-2xl font-thin text-gray-500">
              Bs. {selectedProducts.total}
            </h3>
          </div>
          <div className="h-5/6">
            {payment.paymentMethod === 'options' ? (
              <SalePaymentMethod setPayment={setPayment} />
            ) : payment.paymentMethod === 'cash' ? (
              <CashPaymentMethod
                total={selectedProducts.total}
                payment={payment}
                setPayment={setPayment}
                control={control}
                watch={watch}
                reset={reset}
                setValue={setValue}
              />
            ) : payment.paymentMethod === 'card' ? (
              <CardPaymentMethod
                total={selectedProducts.total}
                payment={payment}
                setPayment={setPayment}
                control={control}
                watch={watch}
                reset={reset}
              />
            ) : payment.paymentMethod === 'qr' ? (
              <QrPaymentMethod
                total={selectedProducts.total}
                payment={payment}
                setPayment={setPayment}
                control={control}
                watch={watch}
                reset={reset}
              />
            ) : (
              <CombinedPaymentMethod
                total={selectedProducts.total}
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
