import React from 'react'
import Table from '@/components/organisms/tableNext/Table'
import { BillPaginationInterface } from '@/interfaces/paginationInterfaces'
import { GetBillsQuery } from '@/graphql/graphql-types'
import DateConverter from '@/components/atoms/DateConverter'
import ButtonComponent from '@/components/atoms/Button'
import IconSelector from '@/components/atoms/IconSelector'

export type Bill = NonNullable<
  NonNullable<GetBillsQuery['getBills']>['data']
>[0]

type BillTableProps = {
  loading: boolean
  pagination: BillPaginationInterface | undefined
  items: Bill[]
  onFilter: (value: string) => void
  onChangeRow: (row: number) => void
  onChangePage: (row: number) => void
  onDelete?: (id: string) => void
}

const BillTable = ({
  loading,
  pagination,
  items,
  onFilter,
  onChangePage,
  onChangeRow,
  onDelete
}: BillTableProps) => {
  return (
    <Table
      tableName="Gastos"
      isLoading={loading}
      currentPage={pagination?.currentPage}
      totalItems={pagination?.totalRecords}
      totalPages={pagination?.totalPages}
      itemsPerPage={pagination?.rows}
      enablePagination={true}
      onSearch={onFilter}
      onChangeRow={onChangeRow}
      onChangePage={onChangePage}
      titles={[
        { name: '#' },
        { name: 'Título' },
        { name: 'Monto' },
        { name: 'Fecha' },
        { name: 'Detalle' },
        { name: 'Registrado Por' },
        { name: 'Acciones' }
      ]}
      items={items.map((bill, idx) => ({
        content: [
          <h3 key={idx} className="text-sm">
            {((pagination?.currentPage || 0) - 1) * (pagination?.rows || 0) +
              idx +
              1}
          </h3>,
          <div key={idx} className="text-left text-sm">
            <p className="font-semibold">{bill.title}</p>
          </div>,
          <div key={idx}>
            <span>{bill.amount + ' Bs.'}</span>
          </div>,
          <div key={idx}>
            <DateConverter dateString={bill.date} />
          </div>,
          <div key={idx}>
            <span>{bill.detail ? bill.detail : '-'}</span>
          </div>,
          <div key={idx}>
            <span>
              {bill.createdByInfo?.name} {bill.createdByInfo?.lastName}
            </span>
          </div>,
          <div key={idx} className="flex justify-center space-x-1">
            {onDelete && (
              <ButtonComponent
                onClick={() => onDelete(bill.id)}
                type="delete"
                showTooltip
                tooltipText="Eliminar"
              >
                <IconSelector name="trash" color="text-danger" width="w-8" />
              </ButtonComponent>
            )}
          </div>
        ]
      }))}
    />
  )
}

export { BillTable }
