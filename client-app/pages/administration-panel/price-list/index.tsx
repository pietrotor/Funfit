import { useDisclosure } from '@nextui-org/react'
import { useState } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

import Table from '@/components/organisms/tableNext/Table'
import AdministrationLayout from '@/components/templates/layouts'
import {
  EditWarehouseModal,
  TValuesWarehouses
} from '@/components/atoms/modals/EditWarehouseModal'
import { showSuccessToast } from '@/components/atoms/Toast/toasts'
import IconSelector from '@/components/atoms/IconSelector'
import { authUserHeader } from '@/utils/verificationUser'
import { PaginationInterfaceState } from '@/interfaces/paginationInterfaces'
import ButtonComponent from '@/components/atoms/Button'
import { AdminButton } from '@/components/atoms/Button/AdminButton'
import { AddListModal } from '@/components/atoms/modals/AddListModal'

interface WarehousesProps {
  user: any
}

function PriceList({ user }: WarehousesProps) {
  const [edit, setEdit] = useState<TValuesWarehouses>({})
  const [variables, setVariables] = useState<PaginationInterfaceState>({
    rows: 5,
    filter: '',
    currentPage: 1
  })
  const [filter, setFilter] = useState<string>('')
  const handleEditModal = useDisclosure()
  const handleAddModal = useDisclosure()
  const router = useRouter()

  const handleSendUpdateWarehouse = (values: TValuesWarehouses) => {
    setEdit(values)
    handleEditModal.onClose()
    showSuccessToast('Almacén actualizado correctamente', 'success')
    console.log(filter)
  }

  const data = [
    {
      id: '1',
      name: 'Lista 1',
      description: 'Descripción 1'
    },
    {
      id: '2',
      name: 'Lista 2',
      description: 'Descripción 2'
    },
    {
      id: '3',
      name: 'Lista 3',
      description: 'Descripción 3'
    }
  ]

  const handleUpdateWarehouse = (idList: string) => {
    handleEditModal.onOpen()
  }

  const handleChangeRow = (row: number) => {
    setVariables({ ...variables, rows: row, currentPage: 1 })
  }

  return (
    <AdministrationLayout user={user}>
      <div className="m-auto mt-8 w-5/6 ">
        <h3 className="text-center text-4xl font-extrabold text-gray-500 ">
          Administración de listas de precios
        </h3>
        <AdminButton
          onClick={handleAddModal.onOpen}
          color="secondary"
          text="Agregar nueva lista de precios"
          iconName="Bussines"
        />
        <Table
          onChangeRow={row => handleChangeRow(row)}
          tableName="LISTA DE PRECIOS"
          onChangePage={page =>
            setVariables({ ...variables, currentPage: page })
          }
          itemsPerPage={variables?.rows}
          currentPage={variables?.currentPage}
          totalPages={variables?.totalPages}
          enablePagination={true}
          onSearch={value => {
            setFilter(value)
            setVariables({ ...variables, currentPage: 1 })
          }}
          totalItems={variables?.totalRecords}
          titles={[
            { name: '#' },
            { name: 'Nombre' },
            { name: 'Descripción' },
            { name: 'Acciones' }
          ]}
          items={(data || []).map((list, idx) => ({
            content: [
              <h3 key={idx} className="text-sm">
                {((variables?.currentPage || 0) - 1) * (variables?.rows || 0) +
                  idx +
                  1}
              </h3>,
              <div key={idx} className="text-left text-sm">
                {list.name}
              </div>,
              <div key={idx} className="text-left text-sm">
                {list.description}
              </div>,
              <div key={idx} className="flex justify-center space-x-1">
                <ButtonComponent
                  onClick={() =>
                    router.push(
                      `/administration-panel/price-list/${list.id}`
                    )
                  }
                  type="eye"
                  showTooltip
                  tooltipText="Ver Lista de precios"
                >
                  <IconSelector name="eye" color="text-secondary" width="w-8" />
                </ButtonComponent>
                <ButtonComponent
                  onClick={() => handleUpdateWarehouse(list.id)}
                  type="edit"
                  showTooltip
                  tooltipText="Editar Lista de precios"
                >
                  <IconSelector name="edit" color="text-primary" width="w-8" />
                </ButtonComponent>
              </div>
            ]
          }))}
        />

        <AddListModal
          isOpen={handleAddModal.isOpen}
          onClose={handleAddModal.onClose}
          onAddWarehouse={() => {}}
        />

        <EditWarehouseModal
          isOpen={handleEditModal.isOpen}
          onClose={handleEditModal.onClose}
          values={edit}
          handleSendUpdateWarehouse={handleSendUpdateWarehouse}
        />
      </div>
    </AdministrationLayout>
  )
}
export default PriceList

export const getServerSideProps: GetServerSideProps = async ctx =>
  await authUserHeader(ctx)
