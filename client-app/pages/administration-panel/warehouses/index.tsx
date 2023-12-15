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

function Warehouses() {
  const [edit, setEdit] = useState <TValuesWarehouses>({})
  const handleConfirmModal = useDisclosure()
  const handleEditModal = useDisclosure()
  const handleAddWarehouse = useDisclosure()
  const data = [{
    id: 1,
    name: 'Almacen 1',
    description: 'Almacen 1',
    street: 'Calle 1'
  },
  {
    id: 2,
    name: 'Almacen 2',
    description: 'Almacen 2',
    street: 'Calle 2'
  },
  {
    id: 3,
    name: 'Almacen 3',
    description: 'Almacen 3',
    street: 'Calle 3'
  },
  {
    id: 4,
    name: 'Almacen 4',
    description: 'Almacen 4',
    street: 'Calle 4'
  },
  {
    id: 5,
    name: 'Almacen 5',
    description: 'Almacen 5',
    street: 'Calle 5'
  }]

  // const { loading, data, refetch } = useGetUsersQuery({
  //   variables: {
  //     paginationInput: {
  //       page: variables?.currentPage,
  //       rows: variables?.rows,
  //       filter: filtroDebounced
  //     }
  //   },
  //   fetchPolicy: 'network-only',
  //   onCompleted: data => {
  //     setVariables({
  //       totalPages: data.getUsers?.totalPages || 1,
  //       rows: data.getUsers?.rows || 5,
  //       filter: filtroDebounced,
  //       currentPage: data.getUsers?.currentPage || 1,
  //       totalRecords: data.getUsers?.totalRecords || 1
  //     })
  //   }
  // })

  const handleSendUpdateWarehouse = async (values: TValuesWarehouses) => {
    // await UpdateWarehouseMutationVariables({
    //   variables: {
    //     updateUserInput: {
    //       id: values.id,
    //       name: values.name,
    //       street: values.street,
    //       description: values.description,
    //     }
    //   },
    //   onCompleted: data => {
    showSuccessToast('Usuario actualizado', 'success')
    //     refetch()
    //     handleEditModal.onClose()
    //   },
    //   onError: error => {
    //     showSuccessToast('ocurrio un error', 'error')
    //     console.log(error)
    //   }
    // })
    console.log(values)
  }
  const handleUpdateWarehouse = (idWarehouse: number) => {
    // const warehouse = data.find(user => user.id === idWarehouse)
    // setEdit(warehouse as TValuesWarehouses)
    // delete the code behid this part
    setEdit({
      id: 1,
      name: 'Almacen 1',
      description: 'Almacen 1',
      street: 'Calle 1'
    })
    handleEditModal.onOpen()
  }

  // const handleChangeRow = (row: number) => {
  //   setVariables({ ...variables, rows: row, currentPage: 1 })
  // }

  const handleDeleteWarehouse = (WarehouseId: number) => {
    // const warehouse = data.find(user => user.id === WarehouseId)
    // setEdit(warehouse as TValuesWarehouses)
    // delete the code behid this part
    setEdit({
      id: 1,
      name: 'Almacen 1',
      description: 'Almacen 1',
      street: 'Calle 1'
    })
    handleConfirmModal.onOpen()
  }

  const handleConfirmDelete = () => {
    // DeleteteWarehouseMutation(
    //   {
    //     variables: {
    //       deleteWarehouseId: editWarehouse.id
    //     },
    //     onCompleted: data => {
    //       if (data.deleteWarehouse?.status === StatusEnum.ERROR) {
    //         showSuccessToast(data?.deleteWarehouse?.message || 'error al eliminar', 'error')
    //         handleConfirmDeleteWarehouse.onClose()
    //       } else {
    //         showSuccessToast(data.deleteWarehouse?.message || 'El Warehouse ha sido eliminado correctamente', 'success')
    //         refetch()
    //         handleConfirmDeleteWarehouse.onClose()
    //       }
    //     }
    //   }
    // )

    // delete the code behid this part
    setEdit({})
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
          tableName={'Almacenes'}
          titles={[
            { name: '#' },
            { name: 'Nombre' },
            { name: 'Descripcion' },
            { name: 'Calle' },
            { name: 'Acciones' }
          ]}
          items={ (data || []).map((warehouse, idx) => ({
            content: [<h3 key={idx} className='text-sm'> {(idx + 1)}</h3>,
            <div key={idx} className='text-sm'>{warehouse.name }</div>,
            <div key={idx} className='text-sm text-left'>{warehouse.description}</div>,
            <div key={idx} className='text-sm text-left'>{warehouse.street}</div>,
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
      onAddWarehouse={() => console.log('refech')}
      />

      <EditWarehouseModal
        isOpen={handleEditModal.isOpen}
        onClose={handleEditModal.onClose}
        // ---- look at this part -------------------------------
        values={edit as TValuesWarehouses}
        handleSendUpdateWarehouse={handleSendUpdateWarehouse}/>
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
