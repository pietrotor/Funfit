import { Button, useDisclosure } from '@nextui-org/react'
import { useState } from 'react'
import { GetServerSideProps } from 'next'

import Table from '@/components/organisms/tableNext/Table'
import AdministrationLayout from '@/components/templates/layouts'
import { ConfirmModal } from '@/components/atoms/modals/ConfirmModal'
import { EditWarehouseModal, TValuesWarehouses } from '@/components/atoms/modals/EditWarehouseModal'
import { showSuccessToast } from '@/components/atoms/Toast/toasts'
import IconSelector from '@/components/atoms/IconSelector'
import { AddWarehouseModal } from '@/components/atoms/modals/AddWarehouseModal'
import { authUserHeader } from '@/utils/verificationUser'
import { StatusEnum, useDeleteWarehouseMutation, useGetWarehousesQuery, useUpdateWarehouseMutation } from '@/graphql/graphql-types'
import { PaginationInterfaceState } from '@/interfaces/paginationInterfaces'
import UseDebouncedValue from '@/hooks/UseDebouncedValue'

function Warehouses() {
  const [edit, setEdit] = useState <TValuesWarehouses>({})
  const [variables, setVariables] = useState<PaginationInterfaceState>({ rows: 5, filter: '', currentPage: 1 })
  const [filter, setFilter] = useState<string>('')
  const filtroDebounced = UseDebouncedValue(filter, 2000)
  const handleConfirmModal = useDisclosure()
  const handleEditModal = useDisclosure()
  const handleAddWarehouse = useDisclosure()

  const [UpdateWarehousesMutationVariables] = useUpdateWarehouseMutation()
  const [DeleteteWarehouseMutation] = useDeleteWarehouseMutation()

  const { loading, data, refetch } = useGetWarehousesQuery({
    variables: {
      paginationInput: {
        page: variables?.currentPage,
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
    const warehouse = data?.getWarehouses?.data?.find(warehouse => warehouse.id === idWarehouse)
    setEdit(warehouse as TValuesWarehouses)

    handleEditModal.onOpen()
  }

  const handleChangeRow = (row: number) => {
    setVariables({ ...variables, rows: row, currentPage: 1 })
  }

  const handleDeleteWarehouse = (WarehouseId: number) => {
    const warehouse = data?.getWarehouses?.data?.find(warehouse => warehouse.id === WarehouseId)
    setEdit(warehouse as TValuesWarehouses)

    handleConfirmModal.onOpen()
  }

  const handleConfirmDelete = () => {
    DeleteteWarehouseMutation(
      {
        variables: {
          deleteWarehouseId: edit.id
        },
        onCompleted: data => {
          if (data.deleteWarehouse?.status === StatusEnum.ERROR) {
            showSuccessToast(data?.deleteWarehouse?.message || 'error al eliminar', 'error')
            handleConfirmModal.onClose()
          } else {
            showSuccessToast(data.deleteWarehouse?.message || 'El Warehouse ha sido eliminado correctamente', 'success')
            refetch()
            handleConfirmModal.onClose()
          }
        }
      }
    )

    handleConfirmModal.onClose()
  }

  return <AdministrationLayout>
      <div className="m-auto w-5/6 mt-16 ">
      <h3 className='text-center font-extrabold text-2xl text-gray-500 '>Administración de Almacénes</h3>
        <Button onClick={handleAddWarehouse.onOpen} color="secondary" className="float-right text-white font-extrabold my-4">
          <IconSelector name="Bussines"/>
          Agregar nuevo Almacén
        </Button>
        <Table
         onChangeRow={row => handleChangeRow(row)}
         tableName='Almacenes'
         onChangePage={page => setVariables({ ...variables, currentPage: page }) }
         itemsPerPage={variables?.rows }
         currentPage={variables?.currentPage }
         totalPages={ variables?.totalPages }
         isLoading ={loading}
         enablePagination={true}
         onSearch={ value => setFilter(value) }
         totalItems={variables?.totalRecords }
          titles={[
            { name: '#' },
            { name: 'Nombre' },
            { name: 'Descripcion' },
            { name: 'Calle' },
            { name: 'Acciones' }
          ]}
          items={ (data?.getWarehouses?.data || []).map((warehouse, idx) => ({
            content: [<h3 key={idx} className='text-sm'> {(idx + 1)}</h3>,
            <div key={idx} className='text-sm'>{warehouse.name }</div>,
            <div key={idx} className='text-sm text-left'>{warehouse.description}</div>,
            <div key={idx} className='text-sm text-left'>{warehouse.address}</div>,
            <div key={idx} className="flex space-x-3 w-3/4 ms-auto">
          <Button
            onClick={() => handleUpdateWarehouse(warehouse.id)}
            color="default"
            className="w-1/2"
          >
            <IconSelector name='edit'/>
            Editar
          </Button>
          <Button onClick={() => handleDeleteWarehouse(warehouse.id)} color="danger" className="w-1/2">
            <IconSelector name='trash'/>
            Eliminar
          </Button>
        </div>
            ]
          })) }
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
        title={`Seguro que quiere eliminar a ${edit?.name} ?`}
        onConfirm={handleConfirmDelete}
      />
    </div>
  </AdministrationLayout>
}
export default Warehouses

export const getServerSideProps: GetServerSideProps = async (ctx) => await authUserHeader(ctx)
