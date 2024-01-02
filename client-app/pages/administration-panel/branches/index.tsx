import { Button, useDisclosure } from '@nextui-org/react'
import { useState } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

import Table from '@/components/organisms/tableNext/Table'
import AdministrationLayout from '@/components/templates/layouts'
import { ConfirmModal } from '@/components/atoms/modals/ConfirmModal'
import {
  TValuesWarehouses
} from '@/components/atoms/modals/EditWarehouseModal'
import { showSuccessToast } from '@/components/atoms/Toast/toasts'
import IconSelector from '@/components/atoms/IconSelector'
import { authUserHeader } from '@/utils/verificationUser'
import {
  StatusEnum,
  useDeleteWarehouseMutation
  // useUpdateWarehouseMutation
} from '@/graphql/graphql-types'
import ButtonComponent from '@/components/atoms/Button'
import useCustomGetWarehousesQuery from '@/services/UseBranches'
import { AddBranchModal } from '@/components/atoms/modals/AddBranchModal'
import { EditBranchModal } from '@/components/atoms/modals/EditBranchModal'

function Warehouses() {
  const [edit, setEdit] = useState<TValuesWarehouses>({})

  const handleConfirmModal = useDisclosure()
  const handleEditModal = useDisclosure()
  const handleAddWarehouse = useDisclosure()
  const router = useRouter()

  // const [UpdateWarehousesMutationVariables] = useUpdateWarehouseMutation()
  const [DeleteteWarehouseMutation] = useDeleteWarehouseMutation()

  const { loading, data, refetch, variables, setVariables, setFilter } = useCustomGetWarehousesQuery()

  const handleUpdateWarehouse = (idWarehouse: number) => {
    const warehouse = data?.getWarehouses?.data?.find(
      warehouse => warehouse.id === idWarehouse
    )
    setEdit(warehouse as TValuesWarehouses)

    handleEditModal.onOpen()
  }

  const handleChangeRow = (row: number) => {
    setVariables({ ...variables, rows: row, currentPage: 1 })
  }

  const handleDeleteWarehouse = (WarehouseId: number) => {
    const warehouse = data?.getWarehouses?.data?.find(
      warehouse => warehouse.id === WarehouseId
    )
    setEdit(warehouse as TValuesWarehouses)

    handleConfirmModal.onOpen()
  }

  const handleConfirmDelete = () => {
    DeleteteWarehouseMutation({
      variables: {
        deleteWarehouseId: edit.id
      },
      onCompleted: data => {
        if (data.deleteWarehouse?.status === StatusEnum.ERROR) {
          showSuccessToast(
            data?.deleteWarehouse?.message || 'error al eliminar',
            'error'
          )
          handleConfirmModal.onClose()
        } else {
          showSuccessToast(
            data.deleteWarehouse?.message ||
              'El Warehouse ha sido eliminado correctamente',
            'success'
          )
          refetch()
          handleConfirmModal.onClose()
        }
      }
    })

    handleConfirmModal.onClose()
  }

  return (
    <AdministrationLayout>
      <div className="m-auto mt-16 w-5/6 ">
        <h3 className="text-center text-4xl font-extrabold text-gray-500 ">
          Administración de Sucursales
        </h3>
        <div className="space-x-3 text-end">
          <Button
            onClick={handleAddWarehouse.onOpen}
            color="secondary"
            className=" my-4 font-extrabold text-white"
          >
            <IconSelector name="Bussines" />
            Agregar nueva Sucursal
          </Button>
        </div>
        <Table
          onChangeRow={row => handleChangeRow(row)}
          tableName="ALMACENES"
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
          titles={[
            { name: '#' },
            { name: 'Nombre' },
            { name: 'Ciudad' },
            { name: 'Calle' },
            { name: 'Acciones' }
          ]}
          items={(data?.getWarehouses?.data || []).map((warehouse, idx) => ({
            content: [
              <h3 key={idx} className="text-sm">
                {((variables?.currentPage || 0) - 1) * (variables?.rows || 0) +
                  idx +
                  1}
              </h3>,
              <div key={idx} className="text-sm">
                {warehouse.name}
              </div>,
              <div key={idx} className="text-left text-sm">
                {warehouse.description}
              </div>,
              <div key={idx} className="text-left text-sm">
                {warehouse.address}
              </div>,
              <div key={idx} className="flex justify-center space-x-1">
                <ButtonComponent
                  onClick={() =>
                    router.push(
                      `/administration-panel/branches/${warehouse.id}`
                    )
                  }
                  type="eye"
                  showTooltip
                  tooltipText="Administrar Stock"
                  className="px-3"
                >
                  <IconSelector name="eye" color="text-secondary" width="w-5" />
                </ButtonComponent>
                <ButtonComponent
                  onClick={() => handleUpdateWarehouse(warehouse.id)}
                  type="edit"
                  showTooltip
                  tooltipText="Editar"
                >
                  <IconSelector name="edit" color="text-primary" width="w-8" />
                </ButtonComponent>
                <ButtonComponent
                  onClick={() => handleDeleteWarehouse(warehouse.id)}
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

        <AddBranchModal
          isOpen={handleAddWarehouse.isOpen}
          onClose={handleAddWarehouse.onClose}
          onAdd={refetch}
          />

        <EditBranchModal
          isOpen={handleEditModal.isOpen}
          onClose={handleEditModal.onClose}
          // values={edit}
          onAdd={refetch}
        />

        <ConfirmModal
          isOpen={handleConfirmModal.isOpen}
          onClose={handleConfirmModal.onClose}
          onCancel={handleConfirmModal.onClose}
          title="Eliminar sucursal"
          message={`¿Esta seguro de eliminar a ${edit?.name}?`}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </AdministrationLayout>
  )
}
export default Warehouses

export const getServerSideProps: GetServerSideProps = async ctx =>
  await authUserHeader(ctx)
