import { Button, useDisclosure } from '@nextui-org/react'
import { useRouter } from 'next/router'
import Link from 'next/link'
// import Table from '@/components/organisms/tableNext/Table'

import AdministrationLayout from '@/components/templates/layouts'
import { useGetWarehouseByIdQuery } from '@/graphql/graphql-types'
import IconSelector from '@/components/atoms/IconSelector'
import { ShowStocksModal } from '@/components/atoms/modals/ShowStocksModal'

function Warehouse() {
  const router = useRouter()
  const handleShowStocksModal = useDisclosure()
  const { warehouseId } = router.query
  const { data } = useGetWarehouseByIdQuery({
    variables: {
      getWarehouseByIdId: warehouseId
    },
    fetchPolicy: 'network-only'
  })
  console.log(data, 'data')
  return (
  <AdministrationLayout>
      <div className="m-auto w-5/6 mt-16 ">
        <h3 className='text-center mb-12 font-extrabold text-2xl text-gray-500 '>Administración de Stock</h3>
        <div className='w-1/4 ms-auto mb-8'>
        <Link href={ `/administration-panel/warehouses/${warehouseId}/create-stock`}>
          <Button color="secondary" className="float-right my-4 text-white font-extrabold">
            <IconSelector name="Box" />
            Agregar nuevo Stock
          </Button>
        </Link>
        </div>
           {/* <Table
          titles={[
            { name: '#' },
            { name: 'Producto' },
            { name: 'Stock' },
            { name: 'Acciones' }
          ]}
          items={ ([ ] as TValueProductData ).map((user, idx) => ({
            content: [<h3 key={idx} className='text-sm'> {(idx + 1)}</h3>,
            <div key={idx} className='text-center'>{user?.product?.name}</div>,
            <div key={idx} className='text-sm'>{user.quantity}</div>,
            <div key={idx} className="">
          <Button
            onClick={() => handleShowStocksModal.onOpen()} color="secondary" className="w-1/2">
            <IconSelector name='edit'/>
            Mover Stock
          </Button>
        </div>
            ]
          })) }
          // onChangeRow={row => handleChangeRow(row)}
          // tableName='Usuarios'
          // onChangePage={page => setVariables({ ...variables, currentPage: page }) }
          // itemsPerPage={variables?.rows }
          // currentPage={variables?.currentPage }
          // totalPages={ variables?.totalPages }
          // isLoading ={loading}
          // enablePagination={true}
          // onSearch={ value => setFilter(value) }
          // totalItems={variables?.totalRecords }
        /> */}
    </div>
    <ShowStocksModal
        isOpen={handleShowStocksModal.isOpen}
        onClose={handleShowStocksModal.onClose}
        onOpen={handleShowStocksModal.onOpen}
        hideCloseButton={false}
        size='md'
      />
  </AdministrationLayout>
  )
}
export default Warehouse
