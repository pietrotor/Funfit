import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Chip } from '@nextui-org/react'
import { GetServerSideProps } from 'next'
import {
  StockMovementTypeEnum,
  useGetWarehouseHistoryQuery
} from '@/graphql/graphql-types'
import { PaginationInterfaceState } from '@/interfaces/paginationInterfaces'

import AdministrationLayout from '@/components/templates/layouts'
import Table from '@/components/organisms/tableNext/Table'
import UseDebouncedValue from '@/hooks/UseDebouncedValue'
import DateConverter from '@/components/atoms/DateConverter'
import { authUserHeader } from '@/utils/verificationUser'

const WarehouseHsitory = () => {
  const router = useRouter()
  const { warehouseId } = router.query
  const [variables, setVariables] = useState<PaginationInterfaceState>({
    rows: 5,
    filter: '',
    currentPage: 1
  })
  const [filter, setFilter] = useState<string>('')
  const filterProductDebounced = UseDebouncedValue(filter, 800)

  const { loading, data } = useGetWarehouseHistoryQuery({
    variables: {
      warehouseId,
      paginationInput: {
        page: variables?.currentPage,
        rows: variables?.rows,
        filter: filterProductDebounced
      }
    },
    fetchPolicy: 'network-only',
    onCompleted: data => {
      setVariables({
        totalPages: data.getWarehouseHistory?.totalPages || 1,
        rows: data.getWarehouseHistory?.rows || 5,
        filter: filterProductDebounced,
        currentPage: data.getWarehouseHistory?.currentPage || 1,
        totalRecords: data.getWarehouseHistory?.totalRecords || 1
      })
    }
  })

  const handleChangeRow = (row: number) => {
    setVariables({ ...variables, rows: row, currentPage: 1 })
  }

  return (
    <AdministrationLayout showBackButton>
      <div className="m-auto w-5/6 space-y-5">
        <h2 className="text-center text-4xl font-extrabold text-gray-500 ">
          Historial de almacén
        </h2>
        <Table
          tableName="PRODUCTOS"
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
            { name: 'Stock anterior' },
            { name: 'Stock posterior' }
          ]}
          items={(data?.getWarehouseHistory?.data || []).map(
            (history, idx) => ({
              content: [
                idx + 1,
                history.stock?.product?.name,
                history.quantity,
                <DateConverter key={idx} dateString={history.date as string} />,
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
                history.stockBefore,
                history.stockLater
              ]
            })
          )}
        />
      </div>
    </AdministrationLayout>
  )
}

export default WarehouseHsitory

export const getServerSideProps: GetServerSideProps = async ctx =>
  await authUserHeader(ctx)
