import { useState } from 'react'
import { Chip } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { StockMovementTypeEnum, useGetStockHistoryQuery } from '@/graphql/graphql-types'
import { PaginationInterfaceState } from '@/interfaces/paginationInterfaces'
import UseDebouncedValue from '@/hooks/UseDebouncedValue'

import AdministrationLayout from '@/components/templates/layouts'
import Table from '@/components/organisms/tableNext/Table'
import DateConverter from '@/components/atoms/DateConverter'
import { authUserHeader } from '@/utils/verificationUser'

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

  return (
    <AdministrationLayout showBackButton={true}>
      <div className="m-auto w-5/6 space-y-10">
        <h2 className="text-center text-4xl font-extrabold text-gray-500 ">
          Historial del stock
        </h2>
        <Table
          tableName="ALMACENES"
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
            { name: 'Producto' },
            { name: 'Cantidad' },
            { name: 'Fecha' },
            { name: 'Tipo de movimiento' },
            { name: 'Stock de seguridad' },
            { name: 'Stock anterior' },
            { name: 'Stock posterior' }
          ]}
          items={(data?.getStockHistory?.data || []).map((history, idx) => ({
            content: [
              idx + 1,
              history.stock?.warehouse?.name,
              history.quantity,
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
