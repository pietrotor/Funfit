/* eslint-disable multiline-ternary */
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { MyModal } from './MyModal'
import { TPointOfSaleData } from '../../../pages/administration-panel/point-of-sale'
import SalePaymentMethod from '@/components/molecules/SalePaymentMethod'
import CashPaymentMethod from '@/components/molecules/CashPaymentMethod'
import CardPaymentMethod from '@/components/molecules/CardPaymentMethod'
import CombinedPaymentMethod from '@/components/molecules/CombinedPaymentMethod'
import QrPaymentMethod from '@/components/molecules/QrPaymentMethod'
import PlatformPaymentMethod from '@/components/molecules/PlatformPaymentMethod'
import VendisLogo from '@/components/atoms/VendisLogo'
import { CardBrands, PedidosYaLogo } from '@/components/atoms/paymentBrands'
import { formatBs } from '@/utils/formatBs'
import { useCreateSaleQuery } from '@/hooks/UseSaleQuery'
import { useAppSelector } from '@/store/index'
import { PaymentMethodEnum } from '@/graphql/graphql-types'
import {
  getPaymentFee,
  getTotalAfterFee,
  hasPaymentFee
} from '@/utils/paymentFees'

interface SaleModalProps {
  isOpen: boolean
  onClose: () => void
  selectedProducts: TPointOfSaleData
  setSelectedProducts: React.Dispatch<React.SetStateAction<TPointOfSaleData>>
  refetch?: () => void
  onSuccess?: () => void
}

export type TSalePaymentMethodData = {
  paymentMethod: string
  cash: number
  change: number
  entersCash?: boolean
}

const mapSalePaymentMethod = (method: string): PaymentMethodEnum => {
  switch (method) {
    case 'cash':
      return PaymentMethodEnum.CASH
    case 'card':
      return PaymentMethodEnum.CARD
    case 'vendis':
      return PaymentMethodEnum.VENDIS
    case 'pedidosya':
      return PaymentMethodEnum.PEDIDOS_YA
    case 'other':
      return PaymentMethodEnum.OTHER
    default:
      return PaymentMethodEnum.QR_TRANSFER
  }
}

function SaleModal({
  isOpen,
  onClose,
  selectedProducts,
  setSelectedProducts,
  refetch,
  onSuccess
}: SaleModalProps) {
  const router = useRouter()
  const { handleSubmit, control, watch, reset, setValue } = useForm()
  const branchIdSelected = useAppSelector(
    state => state.branchReducer.currentBranch.id
  )
  const [qrPayment, setQrPayment] = useState<boolean>(false)
  const { handleCreateSale, loading } = useCreateSaleQuery()
  const [payment, setPayment] = useState<TSalePaymentMethodData>({
    paymentMethod: 'options',
    cash: 0,
    change: 0
  })

  const onSubmit = () => {
    const method = payment.paymentMethod
    const isPlatform = method === 'pedidosya' || method === 'other'
    const appliesFee = hasPaymentFee(method)
    const fee = appliesFee
      ? getPaymentFee(selectedProducts.total, method)
      : 0
    const saleTotal = appliesFee
      ? getTotalAfterFee(selectedProducts.total, method)
      : selectedProducts.total
    const amountRecibed = isPlatform || appliesFee
      ? saleTotal
      : payment.cash || parseFloat(watch('amountRecibed'))
    const change = isPlatform || appliesFee ? 0 : payment.change

    handleCreateSale(
      {
        amountRecibed,
        branchId: branchIdSelected,
        change,
        client: watch('client'),
        date: new Date().toISOString(),
        discount: appliesFee
          ? fee + selectedProducts.discount
          : selectedProducts.discount,
        observations: watch('observations') || '',
        entersCash:
          payment.paymentMethod === 'cash' ? true : !!payment.entersCash,
        products: selectedProducts.products.map(item => ({
          branchProductId: item.id || '',
          productId: item?.productId || '',
          qty: item?.quantity || 0,
          price: item?.price || 0,
          total: item.total || 0
        })),
        paymentMethod: mapSalePaymentMethod(payment.paymentMethod),
        total: saleTotal,
        subTotal: selectedProducts.subTotal,
        orderId: selectedProducts.orderId
      },
      () => {
        let isCommingFromOrders = false
        reset()
        onClose()
        setSelectedProducts(prevValue => {
          if (prevValue.orderId) {
            isCommingFromOrders = true
          }
          return {
            products: [],
            subTotal: 0,
            total: 0,
            discount: 0,
            orderId: null
          }
        })
        setPayment({ paymentMethod: 'options', cash: 0, change: 0 })
        refetch?.()
        onSuccess?.()
        if (isCommingFromOrders) {
          router.push({
            pathname: '/administration-panel/point-of-sale',
            query: ''
          })
        }
      }
    )
  }

  const handleCancel = () => {
    reset()
    onClose()
    setPayment({ paymentMethod: 'options', cash: 0, change: 0 })
    setQrPayment(false)
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
      setQrPayment(false)
    }
  }

  const appliesFee = hasPaymentFee(payment.paymentMethod)

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
      sheet
      textBackButton={payment.paymentMethod === 'options' ? undefined : 'Atrás'}
      textCancelButton="Cancelar"
      textSuccessButton="Generar recibo"
      handleBack={handleBack}
      successButtonDisabled={payment.paymentMethod === 'options'}
    >
      <div className="flex flex-col pb-2">
        <div>
          <div className="mx-4 mb-3 flex flex-wrap items-end justify-center gap-x-8 gap-y-1 rounded-2xl bg-[#FFF8EE] px-4 py-3 md:mx-6">
            <div className="text-center">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-400">
                Total
              </p>
              <p className="num font-amsipro text-2xl font-bold text-tertiary sm:text-3xl">
                {formatBs(selectedProducts.total)}
              </p>
            </div>
            {appliesFee && (
              <div className="text-center">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-secondary-darken">
                  Con descuento
                </p>
                <p className="num font-amsipro text-2xl font-bold text-primary-600 sm:text-3xl">
                  {formatBs(
                    getTotalAfterFee(
                      selectedProducts.total,
                      payment.paymentMethod
                    )
                  )}
                </p>
              </div>
            )}
          </div>
          <div>
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
            ) : payment.paymentMethod === 'card' ||
              payment.paymentMethod === 'vendis' ? (
              <CardPaymentMethod
                total={selectedProducts.total}
                payment={payment}
                setPayment={setPayment}
                control={control}
                watch={watch}
                reset={reset}
                method={payment.paymentMethod}
                logo={
                  payment.paymentMethod === 'vendis' ? (
                    <VendisLogo className="h-8" />
                  ) : (
                    <CardBrands className="h-8" />
                  )
                }
              />
                ) : payment.paymentMethod === 'qr' ? (
              <QrPaymentMethod
                total={selectedProducts.total}
                payment={payment}
                setPayment={setPayment}
                control={control}
                watch={watch}
                reset={reset}
                qrPayment={qrPayment}
                setQrPayment={setQrPayment}
              />
                ) : payment.paymentMethod === 'pedidosya' ? (
              <PlatformPaymentMethod
                total={selectedProducts.total}
                payment={payment}
                setPayment={setPayment}
                control={control}
                watch={watch}
                label="PedidosYa"
                mark={<PedidosYaLogo className="h-9" />}
              />
                ) : payment.paymentMethod === 'other' ? (
              <PlatformPaymentMethod
                total={selectedProducts.total}
                payment={payment}
                setPayment={setPayment}
                control={control}
                watch={watch}
                label="Otros"
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
      </div>
    </MyModal>
  )
}

export default SaleModal
