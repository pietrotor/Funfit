import { useState } from 'react'
import { Chip, Image } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import {
  StockMovementTypeEnum,
  useGetStockHistoryQuery
} from '@/graphql/graphql-types'
import { PaginationInterfaceState } from '@/interfaces/paginationInterfaces'

import AdministrationLayout from '@/components/templates/layouts'
import Table from '@/components/organisms/tableNext/Table'
import DateConverter from '@/components/atoms/DateConverter'
import { authUserHeader } from '@/utils/verificationUser'
import PageHeader from '@/components/molecules/PageHeader'
import { formatBs } from '@/utils/formatBs'
import InformationCard from '@/components/molecules/Card/InformationCard'

interface StockHistoryProps {
  user: any
}
function StockHistory({ user }: StockHistoryProps) {
  const router = useRouter()
  const stockId = router.query.stockId
  const [variables, setVariables] = useState<PaginationInterfaceState>({
    rows: 5,
    filter: '',
    currentPage: 1
  })

  const { loading, data } = useGetStockHistoryQuery({
    variables: {
      stockId,
      paginationInput: {
        page: variables?.currentPage,
        rows: variables?.rows
      }
    },
    fetchPolicy: 'network-only',
    onCompleted: data => {
      setVariables({
        totalPages: data.getStockHistory?.totalPages || 1,
        rows: data.getStockHistory?.rows || 5,
        currentPage: data.getStockHistory?.currentPage || 1,
        totalRecords: data.getStockHistory?.totalRecords || 1
      })
    }
  })

  const handleChangeRow = (row: number) => {
    setVariables({ ...variables, rows: row, currentPage: 1 })
  }

  const product =
    data?.getStockHistory?.data && data.getStockHistory.data.length > 0
      ? data.getStockHistory.data[0]
      : null

  return (
    <AdministrationLayout user={user} showBackButton={true}>
      <div className="m-auto w-full space-y-6">
        <PageHeader title="Historial del stock" />
        <div className="flex w-full flex-col gap-4 md:flex-row">
          <div className="h-36 w-full shrink-0 md:w-48">
            <Image
              className="h-full w-full rounded-lg object-cover"
              classNames={{ wrapper: 'h-full w-full' }}
              src={
                product?.stock?.product?.image ||
                '/common/missing_image.png'
              }
              alt={product?.stock?.product?.name || 'Producto'}
              width={210}
            />
          </div>
          <div className="min-w-0 flex-1">
            <InformationCard className="h-full w-full !max-w-none rounded-2xl border border-stone-200">
              <section className="flex flex-col gap-3 p-4 sm:px-6">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-balance text-left text-xl font-bold text-tertiary md:text-2xl">
                    {product?.stock?.product?.name}
                  </h2>
                  <Chip color="primary" variant="flat" className="shrink-0">
                    {product?.stock?.product?.code}
                  </Chip>
                </div>
                <div className="flex flex-col justify-between gap-3 sm:flex-row">
                  <p className="text-sm text-stone-600">
                    {product?.stock?.product?.description}
                  </p>
                  <div className="flex shrink-0 flex-col gap-1">
                    <p className="text-lg font-bold text-primary-600">
                      Costo: {formatBs(product?.stock?.product?.cost)}
                    </p>
                    <p className="text-lg font-bold text-primary-600">
                      Precio: {formatBs(product?.stock?.product?.suggetedPrice)}
                    </p>
                  </div>
                </div>
              </section>
            </InformationCard>
          </div>
        </div>
        <Table
          tableName="Movimientos de stock"
          isLoading={loading}
          currentPage={variables.currentPage}
          totalItems={variables.totalRecords}
          totalPages={variables.totalPages}
          itemsPerPage={variables.rows}
          enablePagination={true}
          onChangeRow={row => handleChangeRow(row)}
          onChangePage={page =>
            setVariables({ ...variables, currentPage: page })
          }
          titles={[
            { name: '#' },
            { name: 'Fecha' },
            { name: 'Tipo de movimiento' },
            { name: 'Stock de seguridad' },
            { name: 'Stock anterior' },
            { name: 'Nuevo stock' },
            { name: 'Realizado por' }
          ]}
          items={(data?.getStockHistory?.data || []).map((history, idx) => ({
            content: [
              <h3 key={idx} className="text-sm">
                {((variables?.currentPage || 0) - 1) * (variables?.rows || 0) +
                  idx +
                  1}
              </h3>,
              <DateConverter key={idx} dateString={history.date} showTime />,
              history.type === StockMovementTypeEnum.INWARD ? (
                <Chip color="success" variant="flat">
                  Entrada
                </Chip>
              ) : history.type === StockMovementTypeEnum.OUTWARD ? (
                <Chip color="warning" variant="flat">
                  Salida
                </Chip>
              ) : (
                <Chip color="danger" variant="flat">
                  Desechado
                </Chip>
              ),
              history.stock?.securityStock,
              history.stockBefore,
              <p key={idx} className="font-bold">
                {history.stockLater}
              </p>,
              <p key={idx} className="font-bold">
                {history.createdByInfo?.name} {history.createdByInfo?.lastName}
              </p>
            ]
          }))}
        />
      </div>
    </AdministrationLayout>
  )
}

export default StockHistory

export const getServerSideProps: GetServerSideProps = async ctx =>
  await authUserHeader(ctx)
