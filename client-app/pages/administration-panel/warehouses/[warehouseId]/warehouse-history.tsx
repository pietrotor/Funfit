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
import InformationCard from '@/components/molecules/Card/InformationCard'
import PageHeader from '@/components/molecules/PageHeader'
import IconSelector from '@/components/atoms/IconSelector'

interface WarehouseHsitoryProps {
  user: any
}
const WarehouseHsitory = ({ user }:WarehouseHsitoryProps) => {
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

  const warehouse =
    data?.getWarehouseHistory?.data && data.getWarehouseHistory.data.length > 0 ? data.getWarehouseHistory.data[0] : null
  return (
    <AdministrationLayout user={user} showBackButton>
      <div className="m-auto w-full space-y-5">
        <PageHeader title="Historial de almacén" />
        <InformationCard className="w-full !max-w-none rounded-2xl border border-stone-200 md:max-w-2xl">
          <section className="flex flex-col space-y-3 p-4">
            <h2 className="text-balance text-left text-xl font-bold text-tertiary md:text-2xl">
              {warehouse?.stock?.warehouse?.name}
            </h2>
            <div className="flex flex-col justify-between gap-2 text-sm text-stone-600 sm:flex-row sm:gap-5">
              <p>{warehouse?.stock?.warehouse?.description}</p>
              <div className="flex shrink-0 items-center gap-2">
                <IconSelector name="Map-pin" />
                <p>{warehouse?.stock?.warehouse?.address}</p>
              </div>
            </div>
          </section>
        </InformationCard>
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
