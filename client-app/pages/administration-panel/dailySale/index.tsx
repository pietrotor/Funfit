import { GetServerSideProps } from 'next'

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Chip, useDisclosure } from '@nextui-org/react'
import {
  Banknote,
  Coins,
  CreditCard,
  QrCode,
  Receipt,
  Truck
} from 'lucide-react'
import Table from '@/components/organisms/tableNext/Table'
import AdministrationLayout from '@/components/templates/layouts'
import IconSelector from '@/components/atoms/IconSelector'
import { authUserHeader } from '@/utils/verificationUser'
import ButtonComponent from '@/components/atoms/Button'
import UseGetCustomSalesPaginated from '@/services/UseGetCustomSalesPaginated'
import { useAppSelector } from '@/store/index'
import PageHeader from '@/components/molecules/PageHeader'
import StatCard from '@/components/molecules/StatCard'
import { formatBs } from '@/utils/formatBs'
import DateConverter from '@/components/atoms/DateConverter'
import { useGetSalesSummary } from '@/services/index'
import { TSaleProduct } from '@/interfaces/TData'
import { PaymentMethodEnum, Sale } from '@/graphql/graphql-types'
import { SaleCancelModal } from '@/components/molecules/SaleCancelModal'
import { getCurrentDate } from '@/helpers/date.helper'
import ProductListModal from '@/components/atoms/modals/ProductListModal'
import { getSalePaymentMethod } from '@/utils/getSalePaymentMethod'
import VendisLogo from '@/components/atoms/VendisLogo'

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

  return (
    <AdministrationLayout user={user}>
      <div className="m-auto w-full">
        <PageHeader title="Ventas del día" />
        <section className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 xl:grid-cols-3">
          <StatCard
            label="Total en ventas"
            value={formatBs(summary?.total || 0)}
            icon={Coins}
            tone="primary"
          />
          <StatCard
            label="Ventas en efectivo"
            value={formatBs(
              getTotalByPaymentMethod(PaymentMethodEnum.CASH)?.total || 0
            )}
            icon={Banknote}
            tone="success"
          />
          <StatCard
            label="Ventas por QR"
            value={formatBs(
              getTotalByPaymentMethod(PaymentMethodEnum.QR_TRANSFER)?.total || 0
            )}
            icon={QrCode}
          />
          <StatCard
            label="Ventas por tarjeta"
            value={formatBs(
              getTotalByPaymentMethod(PaymentMethodEnum.CARD)?.total || 0
            )}
            icon={CreditCard}
          />
          <StatCard
            label="Ventas PedidosYa"
            value={formatBs(
              getTotalByPaymentMethod(PaymentMethodEnum.PEDIDOS_YA)?.total || 0
            )}
            icon={Truck}
          />
          <StatCard
            label="Ventas por Vendis"
            value={formatBs(
              getTotalByPaymentMethod(PaymentMethodEnum.VENDIS)?.total || 0
            )}
            iconNode={<VendisLogo className="h-5" />}
          />
          <StatCard
            label="Ventas otros"
            value={formatBs(
              getTotalByPaymentMethod(PaymentMethodEnum.OTHER)?.total || 0
            )}
            icon={Receipt}
          />
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
              <div key={idx} className="min-w-0 text-sm">
                <DateConverter showTime dateString={sale.date} />
              </div>,
              <div key={idx} className="text-sm font-bold">
                {formatBs(sale.total)}
              </div>,
              <div key={idx} className="text-sm">
                {sale.discount ? formatBs(sale.discount) : 'S/D'}
              </div>,
              <div
                key={idx}
                className="flex w-fit max-w-full flex-col gap-1 rounded-md border border-primary px-2 py-1 text-primary"
              >
                <div className="flex items-center gap-1">
                  {getSalePaymentMethod(sale.paymentMethod).icon}
                  <p>{getSalePaymentMethod(sale.paymentMethod).text}</p>
                </div>
                {(sale as Sale).entersCash &&
                  sale.paymentMethod !== PaymentMethodEnum.CASH && (
                    <p className="text-tiny text-secondary">Ingresó a caja</p>
                )}
              </div>,
              <div key={idx}>
                <div className="flex flex-wrap gap-1 text-sm">
                  {sale.products.length <= 3 ? (
                    sale.products.map((product, idx) => (
                      <Chip
                        key={idx}
                        size="sm"
                        variant="flat"
                        color="primary"
                      >
                        {product.product?.name}
                      </Chip>
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
                        color="text-primary-600"
                        width="w-8"
                      />
                    </ButtonComponent>
                  )}
                </div>
              </div>,
              <div key={idx} className="min-w-0 break-words text-sm">
                {sale.createdByInfo?.name} {sale.createdByInfo?.lastName}
              </div>,
              <div key={idx} className="min-w-0 break-words text-sm">
                <p>{(sale as Sale).observations || '—'}</p>
                {sale.canceled && (
                  <Chip
                    className="mt-1"
                    size="sm"
                    variant="flat"
                    color="danger"
                  >
                    Anulada
                  </Chip>
                )}
              </div>,
              <div key={idx}>
                <div className="flex flex-wrap gap-2">
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
                      tooltipText="Anular"
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
