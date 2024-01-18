import { useDisclosure } from '@nextui-org/react'
import { useState } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

import Table from '@/components/organisms/tableNext/Table'
import AdministrationLayout from '@/components/templates/layouts'
import { ConfirmModal } from '@/components/atoms/modals/ConfirmModal'
import {
  EditWarehouseModal,
  TValuesWarehouses
} from '@/components/atoms/modals/EditWarehouseModal'
import { showSuccessToast } from '@/components/atoms/Toast/toasts'
import IconSelector from '@/components/atoms/IconSelector'
import { AddWarehouseModal } from '@/components/atoms/modals/AddWarehouseModal'
import { authUserHeader } from '@/utils/verificationUser'
import {
  StatusEnum,
  useDeleteWarehouseMutation,
  useGetWarehousesQuery,
  useUpdateWarehouseMutation
} from '@/graphql/graphql-types'
import { PaginationInterfaceState } from '@/interfaces/paginationInterfaces'
import UseDebouncedValue from '@/hooks/UseDebouncedValue'
import ButtonComponent from '@/components/atoms/Button'
import { AdminButton } from '@/components/atoms/Button/AdminButton'

function Warehouses() {
  const [edit, setEdit] = useState<TValuesWarehouses>({})
  const [variables, setVariables] = useState<PaginationInterfaceState>({})
  const [filter, setFilter] = useState<string>('')
  const filtroDebounced = UseDebouncedValue(filter, 2000)
  const handleConfirmModal = useDisclosure()
  const handleEditModal = useDisclosure()
  const handleAddWarehouse = useDisclosure()
  const router = useRouter()

  const [UpdateWarehousesMutationVariables] = useUpdateWarehouseMutation()
  const [DeleteteWarehouseMutation] = useDeleteWarehouseMutation()

  const { loading, data, refetch } = useGetWarehousesQuery({
    variables: {
      paginationInput: {
        rows: 5,
        filter: filtroDebounced
      }
    },
    fetchPolicy: 'network-only',
    onCompleted: data => {
      setVariables({
        totalPages: data.getWarehouses?.totalPages || 1,
        rows: data.getWarehouses?.rows || 5,
        filter: filtroDebounced,
        currentPage: data.getWarehouses?.currentPage || 1,
        totalRecords: data.getWarehouses?.totalRecords || 1
      })
    }
  })

  const handleSendUpdateWarehouse = async (values: TValuesWarehouses) => {
    await UpdateWarehousesMutationVariables({
      variables: {
        updateWarehouseInput: {
          address: values.address,
          description: values.description,
          id: values.id,
          name: values.name
        }
      },
      onCompleted: data => {
        showSuccessToast('Usuario actualizado', 'success')
        refetch()
        handleEditModal.onClose()
      },
      onError: error => {
        showSuccessToast('ocurrio un error', 'error')
        console.log(error)
      }
    })
    console.log(values)
  }

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
          Administración de Almacenes
        </h3>
        <AdminButton
          onClick={handleAddWarehouse.onOpen}
          color="secondary"
          text='Agregar nuevo Almacén'
          iconName='Bussines'
        />
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
            { name: 'Descripción' },
            { name: 'Calle' },
            { name: 'Acciones' }
          ]}
          items={(data?.getWarehouses?.data || []).map((warehouse, idx) => ({
            content: [
              <h3 key={idx} className="text-sm">
                {' '}
                {idx + 1}
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
              <div
                key={idx}
                className="flex justify-center space-x-1"
              >
                <ButtonComponent
                  onClick={() => router.push(`/administration-panel/warehouses/${warehouse.id}`)}
                  type="edit"
                  showTooltip
                  tooltipText="Editar"
                  className='px-3'
                >
                  <IconSelector name="eye" color="text-primary" width="w-8" />
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

        <AddWarehouseModal
          isOpen={handleAddWarehouse.isOpen}
          onClose={handleAddWarehouse.onClose}
          onAddWarehouse={refetch}
        />

        <EditWarehouseModal
          isOpen={handleEditModal.isOpen}
          onClose={handleEditModal.onClose}
          values={edit}
          handleSendUpdateWarehouse={handleSendUpdateWarehouse}
        />

        <ConfirmModal
          isOpen={handleConfirmModal.isOpen}
          onClose={handleConfirmModal.onClose}
          onCancel={handleConfirmModal.onClose}
          title="Eliminar almacén"
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
