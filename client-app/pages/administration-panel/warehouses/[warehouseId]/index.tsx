import { Button, useDisclosure } from '@nextui-org/react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useState } from 'react'

import AdministrationLayout from '@/components/templates/layouts'
import IconSelector from '@/components/atoms/IconSelector'
import { MoveStockModal } from '@/components/atoms/modals/MoveStockModal'
import { useGetProductsOutOfWarehouseQuery } from '@/graphql/graphql-types'
import Table from '@/components/organisms/tableNext/Table'
import { TValueProductData } from '@/components/atoms/modals/EditProductModal'
import ButtonComponent from '@/components/atoms/Button'
import { PaginationInterfaceState } from '@/interfaces/paginationInterfaces'
import UseDebouncedValue from '@/hooks/UseDebouncedValue'

function Warehouse() {
  const [variables, setVariables] = useState<PaginationInterfaceState>({ rows: 5, filter: '', currentPage: 1 })
  const [filter, setFilter] = useState<string>('')
  const [stock, setStock] = useState<string>('')
  const filtroDebounced = UseDebouncedValue(filter, 2000)
  const router = useRouter()
  const handleMoveStockModal = useDisclosure()
  const { warehouseId } = router.query
  const { data, loading, refetch } = useGetProductsOutOfWarehouseQuery({
    variables: {
      paginationInput: {
        rows: 5,
        page: variables?.currentPage,
        filter: filtroDebounced
      },
      warehouseId: warehouseId as string
    },
    fetchPolicy: 'network-only',
    onCompleted: data => {
      setVariables({
        totalPages: data.getProductsOutOfWarehouse?.totalPages || 1,
        rows: data.getProductsOutOfWarehouse?.rows || 5,
        filter: filtroDebounced,
        currentPage: data.getProductsOutOfWarehouse?.currentPage || 1,
        totalRecords: data.getProductsOutOfWarehouse?.totalRecords || 1
      })
    }
  })

  const handleChangeRow = (row: number) => {
    setVariables({ ...variables, rows: row, currentPage: 1 })
  }
  const handleCreateMovement = (stockId: string) => {
    handleMoveStockModal.onOpen()
    setStock(stockId)
  }
  return (
  <AdministrationLayout>
      <div className="m-auto w-5/6 mt-16 ">
        <h3 className="text-center text-4xl font-extrabold text-gray-500 ">
          Administración de Stocks
        </h3>
      <div className='w-1/4 ms-auto mb-8'>
        <Link href={ `/administration-panel/warehouses/${warehouseId}/create-stock`}>
          <Button color="secondary" className="float-right my-4 text-white font-extrabold">
            <IconSelector name="Box" />
            Agregar nuevo Stock
          </Button>
        </Link>
      </div>
        <Table
          titles={[
            { name: '#' },
            { name: 'Producto' },
            { name: 'Stock' },
            { name: 'Acciones' }
          ]}
          items={ (data?.getProductsOutOfWarehouse?.data || [] as TValueProductData[]).map((stock, idx) => ({
            content: [<h3 key={idx} className='text-sm'> {(idx + 1)}</h3>,
            <div key={idx} className='text-center'>{stock?.name}</div>,
            <div key={idx} className='text-sm'>{stock.suggetedPrice}</div>,
            <div key={idx} className="">
              <ButtonComponent
                onClick={() => handleCreateMovement(stock.id)}
                type="edit"
                showTooltip
                tooltipText="Mover Stock"
                className='px-3'>
                <IconSelector name='edit' color="text-primary" width="w-8"/>
                Mover
              </ButtonComponent>
            </div>
            ]
          })) }
          onChangeRow={row => handleChangeRow(row)}
          tableName='Usuarios'
          onChangePage={page => setVariables({ ...variables, currentPage: page }) }
          itemsPerPage={variables?.rows }
          currentPage={variables?.currentPage }
          totalPages={ variables?.totalPages }
          isLoading ={loading}
          enablePagination={true}
          onSearch={ value => setFilter(value) }
          totalItems={variables?.totalRecords }
        />
    </div>
    <MoveStockModal
        isOpen={handleMoveStockModal.isOpen}
        onClose={handleMoveStockModal.onClose}
        onOpen={handleMoveStockModal.onOpen}
        onAddWarehouse={ refetch }
        stockId={stock}
        hideCloseButton={false}
        size='md'
      />
  </AdministrationLayout>
  )
}
export default Warehouse
