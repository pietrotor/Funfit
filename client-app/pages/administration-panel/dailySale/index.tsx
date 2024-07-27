import { GetServerSideProps } from 'next'

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDisclosure } from '@nextui-org/react'
import Table from '@/components/organisms/tableNext/Table'
import AdministrationLayout from '@/components/templates/layouts'
import IconSelector from '@/components/atoms/IconSelector'
import { authUserHeader } from '@/utils/verificationUser'
import ButtonComponent from '@/components/atoms/Button'
import UseGetCustomSalesPaginated from '@/services/UseGetCustomSalesPaginated'
import { useAppSelector } from '@/store/index'
import InformationCard from '@/components/molecules/Card/InformationCard'
import DateConverter from '@/components/atoms/DateConverter'
import { useGetSalesSummary } from '@/services/index'
import { TSaleProduct } from '@/interfaces/TData'
import { PaymentMethodEnum, Sale } from '@/graphql/graphql-types'
import { SaleCancelModal } from '@/components/molecules/SaleCancelModal'
import { getCurrentDate } from '@/helpers/date.helper'
import ProductListModal from '@/components/atoms/modals/ProductListModal'

interface DailySaleProps {
  user: any
}

function DailySale({ user }: DailySaleProps) {
  const router = useRouter()
  const { currentBranch } = useAppSelector(state => state.branchReducer)
  const [productsDetiail, setProducts] = useState<TSaleProduct[]>([])
  const handleProductsListModal = useDisclosure()

  const {
    data,
    setVariables,
    variables,
    setFilter,
    loading,
    refetch: refetchSales
  } = UseGetCustomSalesPaginated(currentBranch.id)

  const {
    data: summary,
    setVariables: setSummaryVariables,
    variables: summaryVariables,
    refetch
  } = useGetSalesSummary()

  const handleDeleteModal = useDisclosure()
  const [selectedItem, setSelectedItem] = useState<Sale | null>(null)

  const handleChangeRow = (row: number) => {
    setVariables({ ...variables, rows: row, currentPage: 1 })
  }

  useEffect(() => {
    if (!currentBranch.id) return
    setSummaryVariables({
      ...summaryVariables,
      branchIds: [currentBranch.id],
      initialDate: getCurrentDate(),
      endDate: getCurrentDate()
    })
  }, [currentBranch.id])

  useEffect(() => {
    setVariables({
      ...variables,
      branchIds: [currentBranch.id],
      initialDate: getCurrentDate(),
      endDate: getCurrentDate()
    })
  }, [currentBranch.id])

  function getTotalByPaymentMethod(method: PaymentMethodEnum) {
    return summary?.paymentMethods.find(
      paymentMethod => paymentMethod.method === method
    )
  }

  const handleProducts = (products: TSaleProduct[]) => {
    setProducts(products)
    handleProductsListModal.onOpen()
  }

  const getSalePaymentMethod = (paymentMethod: PaymentMethodEnum) => {
    switch (paymentMethod) {
      case PaymentMethodEnum.CARD:
        return {
          icon: <IconSelector name="CreditCard" />,
          text: 'Tarjeta'
        }
      case PaymentMethodEnum.QR_TRANSFER:
        return {
          icon: <IconSelector name="QrCode" />,
          text: 'QR'
        }
      case PaymentMethodEnum.CASH:
        return {
          icon: <IconSelector name="Cash" />,
          text: 'Efectivo'
        }
    }
  }

  return (
    <AdministrationLayout user={user}>
      <div className="m-auto mt-7 w-5/6 ">
        <h3 className="text-center text-4xl font-extrabold text-gray-500 ">
          Ventas del día
        </h3>
        <section className="my-4 mb-8  grid gap-3 pt-6 md:gap-4 lg:grid-cols-2 xl:grid-cols-4">
          <InformationCard className="h-full bg-slate-200 px-3 py-6">
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold">
                <div className="text-xl">Total en ventas</div>
                <div className="text-center">{`${summary?.total || 0} Bs`}</div>
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
                <div className="text-xl">Ventas en efectivo</div>
                <div className="text-center">
                  {getTotalByPaymentMethod(PaymentMethodEnum.CASH)?.total || 0}{' '}
                  Bs
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
          <InformationCard className="h-full bg-slate-200 px-3 py-6">
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold">
                <div className="text-xl"> Ventas por QR</div>
                <div className="text-center">
                  {getTotalByPaymentMethod(PaymentMethodEnum.QR_TRANSFER)
                    ?.total || 0}{' '}
                  Bs
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
                <div className="text-xl">Ventas por tarjeta</div>
                <div className="text-center">
                  {getTotalByPaymentMethod(PaymentMethodEnum.CARD)?.total || 0}{' '}
                  Bs
                </div>
              </div>
              <span className="rounded-full bg-secondary p-3 ">
                <IconSelector
                  name="CreditCard"
                  className=" rounded-md text-white"
                  height="h-6"
                  width="w-6"
                />
              </span>
            </div>
          </InformationCard>
        </section>
        <Table
          onChangeRow={row => handleChangeRow(row)}
          tableName="Lista de ventas"
          onChangePage={page =>
            setVariables({ ...variables, currentPage: page })
          }
          itemsPerPage={variables?.rows}
          currentPage={variables?.currentPage}
          totalPages={variables?.totalPages}
          enablePagination={true}
          onSearch={value => setFilter(value)}
          totalItems={data?.getSalesPaginated?.totalRecords || 0}
          isLoading={loading}
          titles={[
            { name: '#' },
            { name: 'Fecha de venta' },
            { name: 'Monto total' },
            { name: 'Descuento' },
            { name: 'Método de pago' },
            { name: 'Productos' },
            { name: 'Vendedor' },
            { name: 'Observaciones' },
            { name: 'Acciones' }
          ]}
          items={(data?.getSalesPaginated?.data || []).map((sale, idx) => ({
            content: [
              <h3 key={idx} className="text-sm">
                {' '}
                {idx + 1}
              </h3>,
              <div key={idx} className="w-[10rem] text-sm md:w-full">
                <DateConverter showTime dateString={sale.date} />
              </div>,
              <div key={idx} className=" flex justify-center  ">
                <div className="text-sm">{sale.total} Bs</div>
              </div>,
              <div key={idx} className=" flex justify-center  ">
                <div className="text-sm">
                  {sale.discount ? sale.discount + 'Bs' : 'S/D'}
                </div>
              </div>,
              <div
                key={idx}
                className=" flex items-center justify-center gap-1 rounded-sm border border-primary p-1 text-primary"
              >
                {getSalePaymentMethod(sale.paymentMethod).icon}
                <p>{getSalePaymentMethod(sale.paymentMethod).text}</p>
              </div>,
              <div key={idx} className=" flex justify-center  ">
                <div className="text-sm">
                  {sale.products.length <= 3 ? (
                    sale.products.map((product, idx) => (
                      <p
                        key={idx}
                        className="m-auto mt-1 w-fit rounded-full bg-blue-100 px-2 py-1 font-semibold text-blue-600"
                      >
                        {product.product?.name}
                      </p>
                    ))
                  ) : (
                    <ButtonComponent
                      onClick={() =>
                        handleProducts(sale.products as TSaleProduct[])
                      }
                      showTooltip
                      tooltipText="Ver lista de productos"
                      type="history"
                    >
                      <IconSelector
                        name="eye"
                        color="text-blue-600"
                        width="w-8"
                      />
                    </ButtonComponent>
                  )}
                </div>
              </div>,
              <div key={idx} className=" flex justify-center  ">
                <div className="text-sm">
                  {sale.createdByInfo?.name} {sale.createdByInfo?.lastName}
                </div>
              </div>,
              <div key={idx}>
                {sale.canceled && (
                  <div className="flex h-full flex-col items-center justify-center gap-3">
                    <p className="m-auto w-fit bg-red-600 px-4 py-1 font-bold text-white">
                      Venta Anulada
                    </p>
                    <div>
                      <DateConverter dateString={sale.canceledAt} showTime />
                    </div>
                  </div>
                )}
              </div>,
              <div key={idx}>
                <div className="space-x-1">
                  <ButtonComponent
                    onClick={() =>
                      router.push(`/administration-panel/sales/${sale.id}`)
                    }
                    type="edit"
                    showTooltip
                    tooltipText="Ver detalles de venta"
                    className="px-3"
                  >
                    <IconSelector
                      name="Recipe"
                      color="text-primary"
                      width="w-8"
                    />
                  </ButtonComponent>
                  {!sale.canceled && (
                    <ButtonComponent
                      onClick={() => {
                        setSelectedItem(sale as any)
                        handleDeleteModal.onOpen()
                      }}
                      type="delete"
                      showTooltip
                      tooltipText="Eliminar"
                    >
                      <IconSelector
                        name="trash"
                        color="text-danger"
                        width="w-8"
                      />
                    </ButtonComponent>
                  )}
                </div>
              </div>
            ]
          }))}
        />
      </div>
      <SaleCancelModal
        sale={selectedItem}
        modalDisclosure={handleDeleteModal}
        refetch={() => {
          refetch()
          refetchSales()
        }}
      />
      <ProductListModal
        isOpen={handleProductsListModal.isOpen}
        onClose={handleProductsListModal.onClose}
        values={productsDetiail || []}
      />
    </AdministrationLayout>
  )
}
export default DailySale

export const getServerSideProps: GetServerSideProps = async ctx =>
  await authUserHeader(ctx)
