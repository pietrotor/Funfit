import { useState } from 'react'
import { Chip, Image } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import {
  StockMovementTypeEnum,
  useGetStockHistoryQuery
} from '@/graphql/graphql-types'
import { PaginationInterfaceState } from '@/interfaces/paginationInterfaces'
import UseDebouncedValue from '@/hooks/UseDebouncedValue'

import AdministrationLayout from '@/components/templates/layouts'
import Table from '@/components/organisms/tableNext/Table'
import DateConverter from '@/components/atoms/DateConverter'
import { authUserHeader } from '@/utils/verificationUser'
import InformationCard from '@/components/molecules/Card/InformationCard'

function StockHistory() {
  const router = useRouter()
  const stockId = router.query.stockId
  const [variables, setVariables] = useState<PaginationInterfaceState>({
    rows: 5,
    filter: '',
    currentPage: 1
  })
  const [filter, setFilter] = useState<string>('')
  const filterProductDebounced = UseDebouncedValue(filter, 800)

  const { loading, data } = useGetStockHistoryQuery({
    variables: {
      stockId,
      paginationInput: {
        page: variables?.currentPage,
        rows: variables?.rows,
        filter: filterProductDebounced
      }
    },
    fetchPolicy: 'network-only',
    onCompleted: data => {
      setVariables({
        totalPages: data.getStockHistory?.totalPages || 1,
        rows: data.getStockHistory?.rows || 5,
        filter: filterProductDebounced,
        currentPage: data.getStockHistory?.currentPage || 1,
        totalRecords: data.getStockHistory?.totalRecords || 1
      })
    }
  })

  const handleChangeRow = (row: number) => {
    setVariables({ ...variables, rows: row, currentPage: 1 })
  }

  const product =
    data?.getStockHistory?.data && data.getStockHistory.data.length > 0 ? data.getStockHistory.data[0] : null

  return (
    <AdministrationLayout showBackButton={true}>
      <div className="m-auto w-5/6 space-y-10">
        <h2 className="text-center text-4xl font-extrabold text-gray-500 ">
          Historial del stock
        </h2>
        <div className="flex w-full">
          <div className="h-36 w-1/5">
            <Image
              className="rounded-lg object-cover w-full h-full"
              src={
                product?.stock?.product?.image ||
                'https://phantom-marca.unidadeditorial.es/813d16708dc72860fd3cf319c9a245b5/resize/828/f/jpg/assets/multimedia/imagenes/2023/08/04/16911461030527.jpg'
              }
              alt={product?.stock?.product?.description || ''}
              width={210}
            />
          </div>
          <div className="h-36 w-3/5">
            <InformationCard className="h-full rounded-3xl border-2 border-primary/60">
              <section className="flex flex-col space-y-3 p-2 px-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-left text-4xl font-extrabold text-primary">
                    {product?.stock?.product?.name}
                  </h2>
                  <Chip color="primary" variant="flat">
                    {product?.stock?.product?.code}
                  </Chip>
                </div>
                <div className="flex justify-between">
                  <p>{product?.stock?.product?.description}</p>
                  <div className="flex flex-col space-y-3">
                    <p className="font text-xl font-extrabold text-primary">
                      Costo:
                      <sup> Bs. </sup>
                      {product?.stock?.product?.cost}{' '}
                    </p>
                    <p className="text-xl font-extrabold text-primary">
                      Precio:
                      <sup> Bs. </sup>
                      {product?.stock?.product?.suggetedPrice}{' '}
                    </p>
                  </div>
                </div>
              </section>
            </InformationCard>
          </div>
        </div>
        <Table
          tableName="STOCK"
          isLoading={loading}
          currentPage={variables.currentPage}
          totalItems={variables.totalRecords}
          totalPages={variables.totalPages}
          itemsPerPage={variables.rows}
          enablePagination={true}
          onSearch={value => setFilter(value)}
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
            { name: 'Stock posterior' }
          ]}
          items={(data?.getStockHistory?.data || []).map((history, idx) => ({
            content: [
              <h3 key={idx} className="text-sm">
                {((variables?.currentPage || 0) - 1) * (variables?.rows || 0) +
                  idx + 1}
              </h3>,
              <DateConverter key={idx} dateString={history.date} />,
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
              history.stockLater
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
