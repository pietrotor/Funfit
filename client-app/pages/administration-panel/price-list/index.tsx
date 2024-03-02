import { useDisclosure } from '@nextui-org/react'
import { useState } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

import Table from '@/components/organisms/tableNext/Table'
import AdministrationLayout from '@/components/templates/layouts'
import IconSelector from '@/components/atoms/IconSelector'
import { authUserHeader } from '@/utils/verificationUser'
import ButtonComponent from '@/components/atoms/Button'
import { AdminButton } from '@/components/atoms/Button/AdminButton'
import { AddListModal } from '@/components/atoms/modals/AddListModal'
import {
  useCustomDeletePriceList,
  useCustomGetPriceListPaginatedQuery
} from '@/hooks/UsePriceListQuery'
import { TPriceList } from '@/interfaces/TData'
import { EditPriceListModal } from '@/components/atoms/modals/EditPriceListModal'
import { ConfirmModal } from '@/components/atoms/modals/ConfirmModal'

interface PriceListProps {
  user: any
}

function PriceList({ user }: PriceListProps) {
  const [edit, setEdit] = useState<TPriceList>({} as TPriceList)
  const handleEditModal = useDisclosure()
  const handleAddModal = useDisclosure()
  const handleConfirmModal = useDisclosure()

  const { handleDeletePriceList } = useCustomDeletePriceList()
  const router = useRouter()

  const { data, loading, setVariables, setFilter, variables, refetch } =
    useCustomGetPriceListPaginatedQuery()

  const handleUpdatPriceList = (values: TPriceList) => {
    setEdit(values)
    handleEditModal.onOpen()
  }

  const handleChangeRow = (row: number) => {
    setVariables({ ...variables, rows: row, currentPage: 1 })
  }

  const handleDeleteWarehouse = (priceListId: number) => {
    const priceList = data?.getPriceListsPaginated?.data?.find(
      priceList => priceList.id === priceListId
    )
    setEdit(priceList as TPriceList)

    handleConfirmModal.onOpen()
  }

  const handleConfirmDelete = () => {
    handleDeletePriceList(edit.id, refetch)
    handleConfirmModal.onClose()
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
          isLoading={loading}
          titles={[
            { name: '#' },
            { name: 'Nombre' },
            { name: 'Descripción' },
            { name: 'Acciones' }
          ]}
          items={(data?.getPriceListsPaginated?.data || []).map(
            (list, idx) => ({
              content: [
                <h3 key={idx} className="text-sm">
                  {((variables?.currentPage || 0) - 1) *
                    (variables?.rows || 0) +
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
                      router.push(`/administration-panel/price-list/${list.id}`)
                    }
                    type="eye"
                    showTooltip
                    tooltipText="Ver Lista de precios"
                  >
                    <IconSelector
                      name="eye"
                      color="text-secondary"
                      width="w-8"
                    />
                  </ButtonComponent>
                  <ButtonComponent
                    onClick={() => handleUpdatPriceList(list as TPriceList)}
                    type="edit"
                    showTooltip
                    tooltipText="Editar Lista de precios"
                  >
                    <IconSelector
                      name="edit"
                      color="text-primary"
                      width="w-8"
                    />
                  </ButtonComponent>
                  <ButtonComponent
                    onClick={() => handleDeleteWarehouse(list.id)}
                    type="delete"
                    showTooltip
                    tooltipText="Eliminar"
                  >
                    <IconSelector
                      name="trash"
                      color="text-danger"
                      width="w-8"
                    />
                  </ButtonComponent>
                </div>
              ]
            })
          )}
        />

        <AddListModal
          isOpen={handleAddModal.isOpen}
          onClose={handleAddModal.onClose}
          onAdd={refetch}
        />

        <EditPriceListModal
          isOpen={handleEditModal.isOpen}
          onClose={handleEditModal.onClose}
          onEdit={refetch}
          values={edit}
        />

        <ConfirmModal
          isOpen={handleConfirmModal.isOpen}
          onClose={handleConfirmModal.onClose}
          title="Eliminar almacén"
          message={`¿Esta seguro de eliminar a ${edit?.name}?`}
          onConfirm={handleConfirmDelete}
          cancelText="Cancelar"
          color="error"
          confirmText="Eliminar"
          name="trash"
        />
      </div>
    </AdministrationLayout>
  )
}
export default PriceList

export const getServerSideProps: GetServerSideProps = async ctx =>
  await authUserHeader(ctx)
