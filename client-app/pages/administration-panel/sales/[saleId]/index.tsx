/* eslint-disable indent */
/* eslint-disable multiline-ternary */
import { useRouter } from 'next/router'
import 'react-circular-progressbar/dist/styles.css'

import { GetServerSideProps } from 'next'
import AdministrationLayout from '@/components/templates/layouts'
import IconSelector from '@/components/atoms/IconSelector'
import Table from '@/components/organisms/tableNext/Table'
import InformationCard from '@/components/molecules/Card/InformationCard'
import Images from '@/components/atoms/Image/Image'
import useCustomGetSaleById from '@/services/UseGetCustomSaleById'
import { useAppSelector } from '@/store/index'
import { authUserHeader } from '@/utils/verificationUser'
import { PaymentMethodEnum } from '@/graphql/graphql-types'
import DateConverter from '@/components/atoms/DateConverter'

interface SaleDetailProps {
  user: any
}

function SaleDetail({ user }: SaleDetailProps) {
  const router = useRouter()
  const { data } = useCustomGetSaleById(router.query.saleId as string)
  const { currentBranch } = useAppSelector(state => state.branchReducer)

  const getSalePaymentMethod = (paymentMethod: PaymentMethodEnum) => {
    switch (paymentMethod) {
      case PaymentMethodEnum.CARD:
        return {
          icon: (
            <IconSelector
              className=" rounded-md text-white"
              name="CreditCard"
            />
          ),
          text: 'Tarjeta'
        }
      case PaymentMethodEnum.QR_TRANSFER:
        return {
          icon: (
            <IconSelector className=" rounded-md text-white" name="QrCode" />
          ),
          text: 'QR'
        }
      case PaymentMethodEnum.CASH:
        return {
          icon: <IconSelector className=" rounded-md text-white" name="Cash" />,
          text: 'Efectivo'
        }
    }
  }

  return (
    <AdministrationLayout user={user} showBackButton={true}>
      <div className="m-auto mt-8 w-5/6 ">
        <h3 className="text-center text-4xl font-extrabold text-gray-500 ">
          Detalle de venta
        </h3>
        <section className="my-4 mb-12  grid gap-3 pt-6 md:gap-4 lg:grid-cols-2 xl:grid-cols-3">
          <InformationCard className="h-full bg-slate-200 px-3 py-6">
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold">
                <div className="text-xl">Total:</div>
                <div className="text-center">
                  {data?.getSaleById?.data?.total} Bs
                </div>
              </div>
              <span className="rounded-full bg-secondary p-3 ">
                <IconSelector
                  name="Coins"
                  className=" rounded-md text-white"
                  height="h-6"
                  width="w-6"
                />
              </span>
            </div>
          </InformationCard>
          <InformationCard className="h-full bg-slate-200 px-3 py-6">
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold">
                <div className="text-xl">Codigo de venta:</div>
                <div className="text-center">
                  {data?.getSaleById?.data?.code}
                </div>
              </div>
              <span className="rounded-full bg-secondary p-3 ">
                <IconSelector
                  name="QrCode"
                  className=" rounded-md text-white"
                  height="h-6"
                  width="w-6"
                />
              </span>
            </div>
          </InformationCard>
          <InformationCard className="h-full bg-slate-200 px-3 py-6">
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold">
                <div className="text-xl">Sucursal:</div>
                <div className="text-center">{currentBranch.name}</div>
              </div>
              <span className="rounded-full bg-secondary p-3 ">
                <IconSelector
                  name="Branch"
                  className=" rounded-md text-white"
                  height="h-6"
                  width="w-6"
                />
              </span>
            </div>
          </InformationCard>
          <InformationCard className="h-full bg-slate-200 px-3 py-6">
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold">
                <div className="text-xl">Método de pago:</div>
                <div className="text-center">
                  {data?.getSaleById?.data?.paymentMethod
                    ? getSalePaymentMethod(
                        data?.getSaleById?.data?.paymentMethod!
                      ).text
                    : ''}
                </div>
              </div>
              <span className="rounded-full bg-secondary p-3 ">
                {data?.getSaleById?.data?.paymentMethod ? (
                  getSalePaymentMethod(data?.getSaleById?.data?.paymentMethod!)
                    .icon
                ) : (
                  <></>
                )}
              </span>
            </div>
          </InformationCard>
          <InformationCard className="h-full bg-slate-200 px-3 py-6">
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold">
                <div className="text-xl">Vendedor:</div>
                <div className="text-center">
                  {data?.getSaleById?.data?.createdByInfo?.name}{' '}
                  {data?.getSaleById?.data?.createdByInfo?.lastName}
                </div>
              </div>
              <span className="rounded-full bg-secondary p-3 ">
                <IconSelector
                  name="user"
                  className=" rounded-md text-white"
                  height="h-6"
                  width="w-6"
                />
              </span>
            </div>
          </InformationCard>
        </section>
        {data?.getSaleById?.data?.canceled && (
          <section className="mb-4 w-fit rounded-md bg-red-600 p-4 px-10 text-white">
            <h4>Venta anulada</h4>
            <div className="flex flex-col justify-center text-sm">
              <p className="mt-2 font-bold">Anulado en fecha: </p>
              <DateConverter
                dateString={data?.getSaleById?.data?.canceledAt}
                showTime
              />
              <p className="mt-2 font-bold">Anulado por: </p>
              <p>
                {data?.getSaleById?.data?.canceledByInfo?.name}{' '}
                {data?.getSaleById?.data?.canceledByInfo?.lastName}
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
                  src={
                    sale.product?.image ||
                    'https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg'
                  }
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
                {sale.total} Bs
              </div>
            ]
          }))}
          tableName="VENTA"
          enablePagination={false}
        />
      </div>
    </AdministrationLayout>
  )
}
export default SaleDetail
export const getServerSideProps: GetServerSideProps = async ctx =>
  await authUserHeader(ctx)
