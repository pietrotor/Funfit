import { Button, useDisclosure } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

import AdministrationLayout from '@/components/templates/layouts'
import IconSelector from '@/components/atoms/IconSelector'
import { useGetWarehouseStockQuery } from '@/graphql/graphql-types'
import Table from '@/components/organisms/tableNext/Table'
import { PaginationInterfaceState } from '@/interfaces/paginationInterfaces'
import UseDebouncedValue from '@/hooks/UseDebouncedValue'
import { AddBranchProductModal } from '@/components/atoms/modals/AddBranchProductModal'

function Warehouse() {
  const [variables, setVariables] = useState<PaginationInterfaceState>({
    rows: 5,
    filter: '',
    currentPage: 1
  })
  const [filter, setFilter] = useState<string>('')
  const handleAddBranchProduct = useDisclosure()
  const filtroDebounced = UseDebouncedValue(filter, 2000)
  const router = useRouter()
  const { warehouseId } = router.query
  const { data, loading, refetch } = useGetWarehouseStockQuery({
    variables: {
      warehouseStockPaginationInput: {
        filter: filtroDebounced,
        page: variables?.currentPage,
        rows: variables?.rows,
        warehouses: [warehouseId as string]
      }
    },
    fetchPolicy: 'network-only',
    onCompleted: data => {
      setVariables({
        totalPages: data.getWarehouseStock?.totalPages || 1,
        rows: data.getWarehouseStock?.rows || 5,
        filter: filtroDebounced,
        currentPage: data.getWarehouseStock?.currentPage || 1,
        totalRecords: data.getWarehouseStock?.totalRecords || 1
      })
    }
  })

  const handleChangeRow = (row: number) => {
    setVariables({ ...variables, rows: row, currentPage: 1 })
  }

  return (
    <AdministrationLayout showBackButton={true}>
      <div className="m-auto w-5/6 ">
        <h3 className="text-center text-4xl font-extrabold text-gray-500 ">
          Administración de productos
        </h3>
        <div className="flex justify-end space-x-3">
          <Button
            color="secondary"
            className="float-right my-4 font-extrabold text-white"
            onClick={handleAddBranchProduct.onOpen}
          >
            <IconSelector name="addProduct" />
            Agregar producto
          </Button>
        </div>
        <Table
          titles={[
            { name: '#' },
            { name: 'Producto' },
            { name: 'Precio' },
            { name: 'Visible en la página' },
            { name: 'Visible en la web' }
          ]}
          items={(data?.getWarehouseStock?.data || []).map((stock, idx) => ({
            content: [
              <h3 key={idx} className="text-sm">
                {((variables?.currentPage || 0) - 1) * (variables?.rows || 0) +
                  idx +
                  1}
              </h3>,
              <div key={idx} className="text-center">
                {stock?.product?.name}
              </div>,
              <div key={idx} className="mx-auto w-16 text-sm">
                <CircularProgressbar
                  value={stock.quantity}
                  maxValue={stock.lastStockEntry as number}
                  text={`${stock.quantity}`}
                />{' '}
                {stock.units}
              </div>
            ]
          }))}
          onChangeRow={row => handleChangeRow(row)}
          tableName="PRODUCTOS"
          onChangePage={page =>
            setVariables({ ...variables, currentPage: page })
          }
          itemsPerPage={variables?.rows}
          currentPage={variables?.currentPage}
          totalPages={variables?.totalPages}
          isLoading={loading}
          enablePagination={true}
          onSearch={value => setFilter(value)}
          totalItems={variables?.totalRecords}
        />
      </div>
      <AddBranchProductModal
        isOpen={handleAddBranchProduct.isOpen}
        onClose={handleAddBranchProduct.onClose}
        onAdd={() => refetch()}
      />
    </AdministrationLayout>
  )
}
export default Warehouse
