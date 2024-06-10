/* eslint-disable indent */
/* eslint-disable multiline-ternary */
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { MyModal } from './MyModal'
import { TPointOfSaleData } from '../../../pages/administration-panel/pos-distributors'
import { DistributorSalePaymentMethod } from '@/graphql/graphql-types'
import SaleDistributorPaymentMethod from '@/components/molecules/SaleDistributorPaymentMethod'
import DistributorCashPaymentMethod from '@/components/molecules/DistributorCashPaymentMethod'
import DistributorMixedPaymentMethod from '@/components/molecules/DistributorMixedPaymentMethod'
import { UseDistributorSaleQuery } from '@/hooks/UseDistributorSaleQuery'
import { TpointOfSaleDistributor } from '@/interfaces/TData'

interface SaleModalProps {
  isOpen: boolean
  onClose: () => void
  selectedProducts: TPointOfSaleData
  setSelectedProducts: (products: TPointOfSaleData) => void
  refetch?: () => void
  selectedDistributors?: TpointOfSaleDistributor
}

export type TDistributorSalePaymentMethodData = {
  paymentMethod: DistributorSalePaymentMethod | 'options'
  cash: number
  balance: number
}

function SaleDistributorModal({
  isOpen,
  onClose,
  selectedProducts,
  setSelectedProducts,
  refetch,
  selectedDistributors
}: SaleModalProps) {
  const form = useForm()
  const { handleSubmit, control, watch, reset } = form
  const { handleCreateSale, loading } = UseDistributorSaleQuery()
  const [payment, setPayment] = useState<TDistributorSalePaymentMethodData>({
    paymentMethod: 'options',
    cash: 0,
    balance: 0
  })

  const onSubmit = () => {
    handleCreateSale(
      {
        date: new Date().toISOString(),
        discount: selectedProducts.discount,
        observations: watch('observations') || '',
        products: selectedProducts.products.map(item => ({
          price: item.price,
          productId: item.productId,
          qty: item.quantity || 0,
          stockId: item.stockId,
          total: item.total || 0
        })),
        paymentMethod:
          payment.balance === 0
            ? DistributorSalePaymentMethod.CASH
            : payment.cash !== 0
              ? DistributorSalePaymentMethod.MIXED
              : DistributorSalePaymentMethod.CREDIT,
        total: selectedProducts.total,
        subTotal: selectedProducts.subTotal,
        balance: payment.balance,
        totalPaid: payment.cash,
        distributorId: selectedDistributors?.distributor,
        priceListId: selectedDistributors?.priceListId,
        warehouseId: selectedDistributors?.warehouse
      },
      () => {
        reset()
        onClose()
        setSelectedProducts({
          products: [],
          subTotal: 0,
          total: 0,
          discount: 0
        })
        setPayment({ paymentMethod: 'options', cash: 0, balance: 0 })
        refetch?.()
      }
    )
  }

  const handleCancel = () => {
    reset()
    onClose()
    setPayment({ paymentMethod: 'options', cash: 0, balance: 0 })
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
        balance: 0
      })
    }
  }

  return (
    <MyModal
      isOpen={isOpen}
      onClose={onClose}
      hideCloseButton={false}
      size="3xl"
      isForm
      title="Recibo de venta"
      message="Ingrese los datos de la venta"
      onSubmit={onSubmit}
      control={control}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      reset={reset}
      loading={loading}
      color="secondary"
      textBackButton="Atrás"
      textCancelButton="Cancelar"
      textSuccessButton="Generar recibo"
      handleBack={handleBack}
      backButtonDisabled={payment.paymentMethod === 'options'}
      successButtonDisabled={payment.paymentMethod === 'options'}
    >
      <div className="flex h-[30rem] flex-col">
        <div className={'flex-grow overflow-hidden'}>
          <div className="flex h-1/6 items-center justify-around space-x-3 py-3">
            <div className="flex items-center space-x-3">
              <h2 className="text-xl text-gray-500">Total:</h2>
              <h3 className="text-2xl font-thin text-gray-500">
                Bs. {selectedProducts.total}
              </h3>
            </div>
          </div>
          <div className="h-5/6">
            {payment.paymentMethod === 'options' ? (
              <SaleDistributorPaymentMethod
                total={selectedProducts.total}
                setPayment={setPayment}
              />
            ) : payment.paymentMethod === DistributorSalePaymentMethod.CASH ? (
              <DistributorCashPaymentMethod
                total={selectedProducts.total}
                payment={payment}
                setPayment={setPayment}
                form={form}
              />
            ) : payment.paymentMethod ===
              DistributorSalePaymentMethod.CREDIT ? (
              <DistributorMixedPaymentMethod
                total={selectedProducts.total}
                payment={payment}
                setPayment={setPayment}
                form={form}
              />
            ) : (
              <DistributorMixedPaymentMethod
                total={selectedProducts.total}
                payment={payment}
                setPayment={setPayment}
                form={form}
              />
            )}
          </div>
        </div>
      </div>
    </MyModal>
  )
}

export default SaleDistributorModal
