import { useDisclosure } from '@nextui-org/react'
import { useState } from 'react'
import { GetServerSideProps } from 'next'

import Table from '@/components/organisms/tableNext/Table'
import AdministrationLayout from '@/components/templates/layouts'
import IconSelector from '@/components/atoms/IconSelector'
import { authUserHeader } from '@/utils/verificationUser'
import { PaginationInterfaceState } from '@/interfaces/paginationInterfaces'
import ButtonComponent from '@/components/atoms/Button'
import { AdminButton } from '@/components/atoms/Button/AdminButton'
// import { ConfirmModal } from '@/components/atoms/modals/ConfirmModal'
import { AddCategoryModal } from '@/components/atoms/modals/AddCategoryModal'
import {
  TCategories,
  UseCustomeDeleteCategory,
  UseCustomGetCategories
} from '@/hooks/UseCategoryQuery'
import { EditCategoryModal } from '@/components/atoms/modals/EditCategoryModal'
import { ConfirmModal } from '@/components/atoms/modals/ConfirmModal'

function Categories() {
  const [edit, setEdit] = useState<TCategories>({} as TCategories)
  const [variables, setVariables] = useState<PaginationInterfaceState>({})

  const handleConfirmModal = useDisclosure()
  const handleEditModal = useDisclosure()
  const handleAddCategoryModal = useDisclosure()

  const { data, loading, refetch, setFilter } = UseCustomGetCategories()
  const { handleDeleteC } = UseCustomeDeleteCategory()

  const handleChangeRow = (row: number) => {
    setVariables({ ...variables, rows: row, currentPage: 1 })
  }

  const handleDeleteCategory = (categoryId: number) => {
    const category = data?.getCategories?.data?.find(
      category => category.id === categoryId
    )
    setEdit(category as TCategories)

    handleConfirmModal.onOpen()
  }

  const handleUpdateCategory = (categoryId: number) => {
    const category = data?.getCategories?.data?.find(
      category => category.id === categoryId
    )
    setEdit(category as TCategories)

    handleEditModal.onOpen()
  }

  const handleConfirmDelete = () => {
    handleDeleteC(edit?.id)
    handleConfirmModal.onClose()
    refetch()
  }

  return (
    <AdministrationLayout>
      <div className="m-auto mt-16 w-5/6 ">
        <h3 className="text-center text-4xl font-extrabold text-gray-500 ">
          Administración de Categorías
        </h3>
        <AdminButton
          onClick={handleAddCategoryModal.onOpen}
          color="secondary"
          text="Agregar nueva categoría"
          iconName="Bussines"
        />
        <Table
          onChangeRow={row => handleChangeRow(row)}
          tableName="CATEGORÍAS"
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
          titles={[{ name: '#' }, { name: 'Nombre' }, { name: 'Acciones' }]}
          items={(data?.getCategories?.data || []).map((category, idx) => ({
            content: [
              <h3 key={idx} className="text-sm">
                {' '}
                {idx + 1}
              </h3>,
              <div key={idx} className="text-sm">
                {category.name}
              </div>,
              <div key={idx} className="flex justify-center space-x-1">
                <ButtonComponent
                  onClick={() => handleUpdateCategory(category.id)}
                  type="edit"
                  showTooltip
                  tooltipText="Editar"
                >
                  <IconSelector name="edit" color="text-primary" width="w-8" />
                </ButtonComponent>
                <ButtonComponent
                  onClick={() => handleDeleteCategory(category.id)}
                  type="delete"
                  showTooltip
                  tooltipText="Eliminar"
                >
                  <IconSelector name="trash" color="text-danger" width="w-8" />
                </ButtonComponent>
              </div>
            ]
          }))}
        />

        <AddCategoryModal
          isOpen={handleAddCategoryModal.isOpen}
          onClose={handleAddCategoryModal.onClose}
          onAdd={refetch}
        />

        <EditCategoryModal
          isOpen={handleEditModal.isOpen}
          onClose={handleEditModal.onClose}
          values={edit}
          onAdd={refetch}
        />

        <ConfirmModal
          isOpen={handleConfirmModal.isOpen}
          onClose={handleConfirmModal.onClose}
          cancelText="Cancelar"
          confirmText="Eliminar"
          color="error"
          name="trash"
          title="Eliminar categoría de producto"
          message={`¿Esta seguro de eliminar a ${edit?.name}?`}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </AdministrationLayout>
  )
}
export default Categories

export const getServerSideProps: GetServerSideProps = async ctx =>
  await authUserHeader(ctx)
