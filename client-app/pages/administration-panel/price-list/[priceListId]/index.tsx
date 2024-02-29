import { useState } from 'react'
import 'react-circular-progressbar/dist/styles.css'
import { useDisclosure } from '@nextui-org/react'
import { GetServerSideProps } from 'next'
import AdministrationLayout from '@/components/templates/layouts'
import Table from '@/components/organisms/tableNext/Table'
import { PaginationInterfaceState } from '@/interfaces/paginationInterfaces'
import { AdminButton } from '@/components/atoms/Button/AdminButton'
import { authUserHeader } from '@/utils/verificationUser'
import { AddListProductModal } from '@/components/atoms/modals/AddListProductModal'

interface WarehouseProps {
  user: any
}
function PriceList({ user }: WarehouseProps) {
  const [variables, setVariables] = useState<PaginationInterfaceState>({
    rows: 5,
    filter: '',
    currentPage: 1
  })
  const data = [
    {
      id: '1',
      name: 'Producto 1',
      price: 100
    },
    {
      id: '2',
      name: 'Producto 2',
      price: 200
    },
    {
      id: '3',
      name: 'Producto 3',
      price: 300
    }
  ]
  const [filter, setFilter] = useState<string>('')
  const handleAddModal = useDisclosure()

  const handleChangeRow = (row: number) => {
    setVariables({ ...variables, rows: row, currentPage: 1 })
    console.log(filter)
  }
  return (
    <AdministrationLayout user={user} showBackButton={true}>
      <div className="m-auto mt-8 w-5/6 ">
        <h3 className="text-center text-4xl font-extrabold text-gray-500 ">
          Administración de Lista de Precios
        </h3>
        <AdminButton
          onClick={handleAddModal.onOpen}
          color="secondary"
          text="Agregar nuevo producto"
          iconName="Bussines"
        />
        <Table
          titles={[{ name: '#' }, { name: 'Producto' }, { name: 'Precio' }]}
          items={data.map((product, idx) => ({
            content: [
              <h3 key={idx} className="text-sm">
                {((variables?.currentPage || 0) - 1) * (variables?.rows || 0) +
                  idx +
                  1}
              </h3>,
              <div key={idx} className="text-center">
                {product?.name}
              </div>,
              <div key={idx} className="mx-auto w-16 text-sm">
                {product?.price || 0}
              </div>
            ]
          }))}
          onChangeRow={row => handleChangeRow(row)}
          tableName="PRODUCTOS DE LA LISTA DE PRECIOS"
          onChangePage={page =>
            setVariables({ ...variables, currentPage: page })
          }
          itemsPerPage={variables?.rows}
          currentPage={variables?.currentPage}
          totalPages={variables?.totalPages}
          enablePagination={true}
          onSearch={value => setFilter(value)}
          totalItems={variables?.totalRecords}
        />
      </div>
      <AddListProductModal
        isOpen={handleAddModal.isOpen}
        onClose={handleAddModal.onClose}
        onAddWarehouse={() => {}}
      />
    </AdministrationLayout>
  )
}
export default PriceList
export const getServerSideProps: GetServerSideProps = async ctx =>
  await authUserHeader(ctx)
