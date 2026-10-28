/* eslint-disable indent */
/* eslint-disable multiline-ternary */
import { useRouter } from 'next/router'
import 'react-circular-progressbar/dist/styles.css'

import { GetServerSideProps } from 'next'
import AdministrationLayout from '@/components/templates/layouts'
import {
  Coins,
  CreditCard,
  Landmark,
  MessageSquareText,
  QrCode,
  Store,
  UserRound
} from 'lucide-react'
import Table from '@/components/organisms/tableNext/Table'
import PageHeader from '@/components/molecules/PageHeader'
import StatCard from '@/components/molecules/StatCard'
import { formatBs } from '@/utils/formatBs'
import Images from '@/components/atoms/Image/Image'
import useCustomGetSaleById from '@/services/UseGetCustomSaleById'
import { useAppSelector } from '@/store/index'
import { authUserHeader } from '@/utils/verificationUser'
import { PaymentMethodEnum } from '@/graphql/graphql-types'
import DateConverter from '@/components/atoms/DateConverter'
import { getSalePaymentMethod } from '@/utils/getSalePaymentMethod'
import VendisLogo from '@/components/atoms/VendisLogo'

interface SaleDetailProps {
  user: any
}

function SaleDetail({ user }: SaleDetailProps) {
  const router = useRouter()
  const { data } = useCustomGetSaleById(router.query.saleId as string)
  const { currentBranch } = useAppSelector(state => state.branchReducer)
  const sale = data?.getSaleById?.data

  return (
    <AdministrationLayout user={user} showBackButton={true}>
      <div className="m-auto w-full">
        <PageHeader title="Detalle de venta" />
        <section className="mb-6 grid gap-3 sm:grid-cols-2 md:gap-4 xl:grid-cols-3">
          <StatCard
            label="Total"
            value={formatBs(sale?.total)}
            icon={Coins}
            tone="primary"
          />
          <StatCard label="Código de venta" value={sale?.code} icon={QrCode} />
          <StatCard label="Sucursal" value={currentBranch.name} icon={Store} />
          <StatCard
            label="Método de pago"
            value={
              sale?.paymentMethod
                ? getSalePaymentMethod(sale.paymentMethod).text
                : ''
            }
            icon={CreditCard}
            iconNode={
              sale?.paymentMethod === PaymentMethodEnum.VENDIS ? (
                <VendisLogo className="h-5" />
              ) : undefined
            }
          />
          <StatCard
            label="Vendedor"
            value={`${sale?.createdByInfo?.name ?? ''} ${
              sale?.createdByInfo?.lastName ?? ''
            }`.trim()}
            icon={UserRound}
          />
          {!!sale?.observations && (
            <StatCard
              label="Observaciones"
              value={
                <span className="block whitespace-normal text-base font-normal">
                  {sale.observations}
                </span>
              }
              icon={MessageSquareText}
            />
          )}
          {sale?.entersCash &&
            sale.paymentMethod !== PaymentMethodEnum.CASH && (
              <StatCard
                label="Caja"
                value={
                  <span className="block whitespace-normal text-base font-normal">
                    El dinero ingresó a caja
                  </span>
                }
                icon={Landmark}
                tone="success"
              />
            )}
        </section>
        {sale?.canceled && (
          <section className="mb-6 w-fit max-w-full rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-700">
            <h4 className="font-amsipro text-lg font-semibold">Venta anulada</h4>
            <div className="flex flex-col justify-center text-sm">
              <p className="mt-2 font-semibold">Anulado en fecha:</p>
              <DateConverter dateString={sale.canceledAt} showTime />
              <p className="mt-2 font-semibold">Anulado por:</p>
              <p>
                {sale.canceledByInfo?.name} {sale.canceledByInfo?.lastName}
              </p>
            </div>
          </section>
        )}
        <Table
          titles={[
            { name: '#' },
            { name: 'Imagen' },
            { name: 'Nombre del producto' },
            { name: 'Código' },
            { name: 'Unidades' },
            { name: 'Total' }
          ]}
          items={(data?.getSaleById?.data?.products || []).map((sale, idx) => ({
            content: [
              <h3 key={idx} className="text-sm">
                {idx + 1}
              </h3>,
              <div key={idx} className=" flex justify-center ">
                <Images
                  alt="imagen"
                  src={sale.product?.image || '/common/missing_image.png'}
                  className="h-14  w-16 rounded-md md:h-28 md:w-28"
                />
              </div>,
              <div key={idx} className=" text-sm">
                {sale.product?.name}
              </div>,
              <div key={idx} className="flex justify-center space-x-3 text-sm">
                {sale.product?.code}
              </div>,
              <div key={idx} className="flex justify-center space-x-3 text-sm">
                {sale.qty}
              </div>,
              <div key={idx} className="flex justify-center space-x-3 text-sm">
                {formatBs(sale.total)}
              </div>
            ]
          }))}
          tableName="Venta"
          enablePagination={false}
        />
      </div>
    </AdministrationLayout>
  )
}
export default SaleDetail
export const getServerSideProps: GetServerSideProps = async ctx =>
  await authUserHeader(ctx)
