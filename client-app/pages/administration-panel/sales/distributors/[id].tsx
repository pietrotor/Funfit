/* eslint-disable indent */
/* eslint-disable multiline-ternary */
import { useRouter } from 'next/router'
import 'react-circular-progressbar/dist/styles.css'

import { GetServerSideProps } from 'next'
import { Button } from '@nextui-org/react'
import AdministrationLayout from '@/components/templates/layouts'
import IconSelector from '@/components/atoms/IconSelector'
import Table from '@/components/organisms/tableNext/Table'
import InformationCard from '@/components/molecules/Card/InformationCard'
import Images from '@/components/atoms/Image/Image'
import { authUserHeader } from '@/utils/verificationUser'
import { DistributorSalePaymentMethod } from '@/graphql/graphql-types'
import DateConverter from '@/components/atoms/DateConverter'
import UseGetCustomDistributorSaleById from '@/services/UseGetCustomDistributorSaleById'

interface SaleDetailProps {
  user: any
}

function SaleDistributorDetail({ user }: SaleDetailProps) {
  const router = useRouter()
  const { data } = UseGetCustomDistributorSaleById(router.query.id as string)

  const getSalePaymentMethod = (
    paymentMethod: DistributorSalePaymentMethod
  ) => {
    switch (paymentMethod) {
      case DistributorSalePaymentMethod.MIXED:
        return {
          icon: (
            <IconSelector className=" rounded-md text-white" name="Recipe" />
          ),
          text: 'Crédito - Contado'
        }
      case DistributorSalePaymentMethod.CREDIT:
        return {
          icon: (
            <IconSelector className=" rounded-md text-white" name="Recipe" />
          ),
          text: 'Crédito'
        }
      case DistributorSalePaymentMethod.CASH:
        return {
          icon: <IconSelector className=" rounded-md text-white" name="Cash" />,
          text: 'Contado'
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
          <InformationCard className="h-full px-3 py-6">
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold">
                <div className="text-xl">Total:</div>
                <div className="text-center">
                  {data?.getDistributorSale?.data?.total} Bs
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
          {data?.getDistributorSale?.data?.paymentMethod !==
            DistributorSalePaymentMethod.CASH && (
            <>
              <InformationCard className="h-full !bg-blue-500 px-3 py-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold">
                    <div className="text-xl">Total pagado:</div>
                    <div className="text-center">
                      {data?.getDistributorSale?.data?.totalPaid} Bs
                    </div>
                  </div>
                  <span className="rounded-full bg-secondary p-3 ">
                    <IconSelector
                      name="Cash"
                      className=" rounded-md text-white"
                      height="h-6"
                      width="w-6"
                    />
                  </span>
                </div>
              </InformationCard>
              <InformationCard className="h-full !bg-red-500 px-3 py-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold">
                    <div className="text-xl">Saldo pendiente:</div>
                    <div className="text-center">
                      {data?.getDistributorSale?.data?.balance} Bs
                    </div>
                  </div>
                  <span className="rounded-full bg-secondary p-3 ">
                    <IconSelector
                      name="Recipe"
                      className=" rounded-md text-white"
                      height="h-6"
                      width="w-6"
                    />
                  </span>
                </div>
              </InformationCard>
            </>
          )}
          <InformationCard className="h-full bg-slate-200 px-3 py-6">
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold">
                <div className="text-xl">Codigo de venta:</div>
                <div className="text-center">
                  {data?.getDistributorSale?.data?.code}
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
                <div className="text-xl">Método de pago:</div>
                <div className="text-center">
                  {data?.getDistributorSale?.data?.paymentMethod
                    ? getSalePaymentMethod(
                        data?.getDistributorSale?.data?.paymentMethod!
                      ).text
                    : ''}
                </div>
              </div>
              <span className="rounded-full bg-secondary p-3 ">
                {data?.getDistributorSale?.data?.paymentMethod ? (
                  getSalePaymentMethod(
                    data?.getDistributorSale?.data?.paymentMethod!
                  ).icon
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
                  {data?.getDistributorSale?.data?.createdByInfo?.name}{' '}
                  {data?.getDistributorSale?.data?.createdByInfo?.lastName}
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
        {data?.getDistributorSale?.data?.canceled && (
          <section className="mb-4 w-fit rounded-md bg-red-600 p-4 px-10 text-white">
            <h4>Venta anulada</h4>
            <div className="flex flex-col justify-center text-sm">
              <p className="mt-2 font-bold">Anulado en fecha: </p>
              <DateConverter
                dateString={data?.getDistributorSale?.data?.canceledAt}
                showTime
              />
              <p className="mt-2 font-bold">Anulado por: </p>
              <p>
                {data?.getDistributorSale?.data?.canceledByInfo?.name}{' '}
                {data?.getDistributorSale?.data?.canceledByInfo?.lastName}
              </p>
            </div>
          </section>
        )}
        <div className="flex w-full justify-end">
          <Button
            color="primary"
            className="flex items-center"
            onClick={() =>
              router.push(
                `/administration-panel/dealers/${data?.getDistributorSale?.data?.distributorId}`
              )
            }
          >
            <IconSelector
              name="eye"
              className=" rounded-md text-white"
              height="h-6"
              width="w-6"
            />
            <p className="text-base font-semibold">Ver Pagos</p>
          </Button>
        </div>
        <h2 className="mb-4">Productos</h2>
        <Table
          titles={[
            { name: '#' },
            { name: 'Imagen' },
            { name: 'Nombre del producto' },
            { name: 'Código' },
            { name: 'Unidades' },
            { name: 'Total' }
          ]}
          items={(data?.getDistributorSale?.data?.products || []).map(
            (sale, idx) => ({
              content: [
                <h3 key={idx} className="text-sm">
                  {idx + 1}
                </h3>,
                <div key={idx} className=" flex justify-center ">
                  <Images
                    alt="imagen"
                    src={sale.product?.image || 'asdf'}
                    className="h-14  w-16 rounded-md object-cover md:h-20 md:w-20"
                  />
                </div>,
                <div key={idx} className=" text-sm">
                  {sale.product?.name}
                </div>,
                <div
                  key={idx}
                  className="flex justify-center space-x-3 text-sm"
                >
                  {sale.product?.code}
                </div>,
                <div
                  key={idx}
                  className="flex justify-center space-x-3 text-sm"
                >
                  {sale.qty}
                </div>,
                <div
                  key={idx}
                  className="flex justify-center space-x-3 text-sm"
                >
                  {sale.total} Bs
                </div>
              ]
            })
          )}
          tableName="Productos vendidos"
          enablePagination={false}
        />
        <h2 className="mb-4 mt-8">Pagos</h2>
        <Table
          titles={[
            { name: '#' },
            { name: 'Imagen' },
            { name: 'Nombre del producto' },
            { name: 'Código' },
            { name: 'Unidades' },
            { name: 'Total' }
          ]}
          items={(data?.getDistributorSale?.data?.products || []).map(
            (sale, idx) => ({
              content: [
                <h3 key={idx} className="text-sm">
                  {idx + 1}
                </h3>,
                <div key={idx} className=" flex justify-center ">
                  <Images
                    alt="imagen"
                    src={sale.product?.image || 'asdf'}
                    className="h-14  w-16 rounded-md object-cover md:h-20 md:w-20"
                  />
                </div>,
                <div key={idx} className=" text-sm">
                  {sale.product?.name}
                </div>,
                <div
                  key={idx}
                  className="flex justify-center space-x-3 text-sm"
                >
                  {sale.product?.code}
                </div>,
                <div
                  key={idx}
                  className="flex justify-center space-x-3 text-sm"
                >
                  {sale.qty}
                </div>,
                <div
                  key={idx}
                  className="flex justify-center space-x-3 text-sm"
                >
                  {sale.total} Bs
                </div>
              ]
            })
          )}
          tableName="Productos vendidos"
          enablePagination={false}
        />
      </div>
    </AdministrationLayout>
  )
}
export default SaleDistributorDetail
export const getServerSideProps: GetServerSideProps = async ctx =>
  await authUserHeader(ctx)
