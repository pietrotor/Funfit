import { useState } from 'react'
import 'react-circular-progressbar/dist/styles.css'
import { useDisclosure } from '@nextui-org/react'
import { GetServerSideProps } from 'next'
import AdministrationLayout from '@/components/templates/layouts'
import Table from '@/components/organisms/tableNext/Table'
import { AdminButton } from '@/components/atoms/Button/AdminButton'
import PageHeader from '@/components/molecules/PageHeader'
import { formatBs } from '@/utils/formatBs'
import { authUserHeader } from '@/utils/verificationUser'
import { AddListProductModal } from '@/components/atoms/modals/AddListProductModal'
import { useCustomGetPricePaginatedQuery } from '@/hooks/usePriceQuery'
import ButtonComponent from '@/components/atoms/Button'
import IconSelector from '@/components/atoms/IconSelector'
import { ConfirmModal } from '@/components/atoms/modals/ConfirmModal'
import {
  Price,
  StatusEnum,
  useDeletePriceMutation
} from '@/graphql/graphql-types'
import { showSuccessToast } from '@/components/atoms/Toast/toasts'
import { EditListProductModal } from '@/components/atoms/modals/EditListProductModal'

interface WarehouseProps {
  user: any
}
function PriceList({ user }: WarehouseProps) {
  // const [variables, setVariables] = useState<PaginationInterfaceState>({
  //   rows: 5,
  //   filter: '',
  //   currentPage: 1
  // })
  const { data, loading, refetch, setVariables, variables, setFilter } =
    useCustomGetPricePaginatedQuery()
  const [currentItem, setCurrentItem] = useState<Price>()
  const handleAddModal = useDisclosure()
  const handleEditModal = useDisclosure()
  const handleConfirmModal = useDisclosure()

  const [deletePrice] = useDeletePriceMutation({
    onCompleted(data) {
      if (data.deletePrice?.status !== StatusEnum.OK) {
        return showSuccessToast(data.deletePrice?.message!, 'error')
      }
      showSuccessToast(data.deletePrice?.message!, 'success')
      refetch()
    },
    onError() {
      showSuccessToast('No se pudo borrar el precio', 'error')
    }
  })

  const handleDelete = () => {
    deletePrice({
      variables: {
        id: currentItem?.id
      }
    })
  }

  const handleChangeRow = (row: number) => {
    setVariables({ ...variables, rows: row, currentPage: 1 })
  }
  return (
    <AdministrationLayout user={user} showBackButton={true}>
      <div className="m-auto w-full">
        <PageHeader
          title="Productos de la lista de precios"
          actions={
            <AdminButton
              onClick={handleAddModal.onOpen}
              color="secondary"
              text="Agregar nuevo producto"
              iconName="Bussines"
            />
          }
        />
        <Table
          titles={[
            { name: '#' },
            { name: 'Producto' },
            { name: 'Precio' },
            { name: 'Acciones' }
          ]}
          isLoading={loading}
          items={(data?.getPricesPaginated?.data || []).map((price, idx) => ({
            content: [
              <h3 key={idx} className="text-sm">
                {((variables?.currentPage || 0) - 1) * (variables?.rows || 0) +
                  idx +
                  1}
              </h3>,
              <div key={idx} className="text-center">
                {price?.product?.name}
              </div>,
              <div key={idx} className="mx-auto text-sm">
                {formatBs(price?.price || 0)}
              </div>,
              <div key={idx} className="flex justify-center space-x-1">
                <ButtonComponent
                  onClick={() => {
                    handleEditModal.onOpen()
                    setCurrentItem(price as any)
                  }}
                  type="edit"
                  showTooltip
                  tooltipText="Editar precio"
                >
                  <IconSelector name="edit" color="text-primary" width="w-8" />
                </ButtonComponent>
                <ButtonComponent
                  onClick={() => {
                    setCurrentItem(price as any)
                    handleConfirmModal.onOpen()
                  }}
                  type="delete"
                  showTooltip
                  tooltipText="Eliminar"
                >
                  <IconSelector name="trash" color="text-danger" width="w-8" />
                </ButtonComponent>
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
        onAddPrice={refetch}
      />
      <EditListProductModal
        isOpen={handleEditModal.isOpen}
        onClose={handleEditModal.onClose}
        onAddPrice={refetch}
        data={currentItem || null}
      />
      <ConfirmModal
        isOpen={handleConfirmModal.isOpen}
        onClose={handleConfirmModal.onClose}
        title="Eliminar producto"
        message={`¿Esta seguro de eliminar a ${currentItem?.product?.name}?`}
        onConfirm={handleDelete}
        cancelText="Cancelar"
        color="error"
        confirmText="Eliminar"
        name="trash"
      />
    </AdministrationLayout>
  )
}
export default PriceList
export const getServerSideProps: GetServerSideProps = async ctx =>
  await authUserHeader(ctx)
