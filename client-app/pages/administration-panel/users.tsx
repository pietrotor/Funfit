import { useState } from 'react'

import { Button, useDisclosure } from '@nextui-org/react'

import AdministrationLayout from '@/components/templates/layouts'
import { AddUserModal } from '@/components/atoms/modals/AddUserModal'
import IconSelector from '@/components/atoms/IconSelector'
import { EditModal, TValueUserData } from '@/components/atoms/modals/EditModal'
import { showSuccessToast } from '@/components/atoms/Toast/toasts'

import {
  useGetUsersQuery,
  useUpdateUserMutation
} from '@/graphql/graphql-types'
import { ConfirmModal } from '@/components/atoms/modals/ConfirmModal'
import Table from '@/components/organisms/tableNext/Table'
import UseDebouncedValue from '@/hooks/UseDebouncedValue'
import { PaginationInterfaceState } from '@/interfaces/paginationInterfaces'

function CreateUserForm() {
  const handleAddUser = useDisclosure()
  const handleEditModal = useDisclosure()
  const handleDeleteModal = useDisclosure()
  const [filter, setFilter] = useState<string>('')
  const [variables, setVariables] = useState<PaginationInterfaceState>({})
  const filtroDebounced = UseDebouncedValue(filter, 2000)

  const [edit, setEdit] = useState<TValueUserData>({})

  const { loading, data, refetch } = useGetUsersQuery({
    variables: {
      paginationInput: {
        page: variables?.currentPage,
        rows: variables?.rows,
        filter: variables?.filter
      }
    },
    fetchPolicy: 'network-only',
    onCompleted: data => {
      setVariables({
        totalPages: data.getUsers?.totalPages || 1,
        rows: data.getUsers?.rows || 5,
        filter: filtroDebounced,
        currentPage: data.getUsers?.currentPage || 1,
        totalRecords: data.getUsers?.totalRecords || 1
      })
    }
  })

  const [UpdateUserMutationVariables] = useUpdateUserMutation()

  const handleSendUpdateUser = async (values: TValueUserData) => {
    try {
      await UpdateUserMutationVariables({
        variables: {
          updateUserInput: {
            id: values.id,
            name: values.name,
            lastName: values.lastName,
            email: values.email,
            phone: values.phone
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
    } catch (error) {
      console.log(error)
      showSuccessToast('ocurrio un error', 'error')
    }
  }

  const handleUpdateUser = (id: string) => {
    const user = data?.getUsers?.data?.find(user => user.id === id)
    setEdit(user as TValueUserData)
    handleEditModal.onOpen()
  }
  const handleChangeRow = (row: number) => {
    setVariables({ ...variables, rows: row, currentPage: 1 })
  }
  const handleDeleteUser = (id: string) => {
    const user = data?.getUsers?.data?.find(user => user.id === id)
    setEdit(user as TValueUserData)
    handleDeleteModal.onOpen()
  }
  const handleConfirmDeleteUser = () => {
    console.log('confirm')
    handleAddUser.onClose()
  }

  return (
    <AdministrationLayout>
      <div className="m-auto w-5/6 mt-16 ">
        <Button onClick={handleAddUser.onOpen} color="secondary" className="float-right my-4">
          Agregar nuevo usuario
          <IconSelector name="addUser" />
        </Button>
        <Table
          titles={[
            { name: 'Id' },
            { name: 'Usuario' },
            { name: 'Email' },
            { name: 'Telefono' },
            { name: 'Acciones' }
          ]}
          items={ (data?.getUsers?.data || []).map((user, idx) => ({
            content: [idx + 1, user.name + ' ' + user.lastName, user.email, user.phone, <div key={idx} className="flex space-x-3">
          <Button
            onClick={() => handleUpdateUser(user.id)}
            color="secondary"
            className="w-1/2"
          >
            Editar
          </Button>
          <Button onClick={() => handleDeleteUser(user.id)} color="danger" className="w-1/2">
            Eliminar
          </Button>
        </div>
            ]
          })) }
          onChangeRow={row => handleChangeRow(row)}
          tableName='Usuarios'
          onChangePage={page => setVariables({ ...variables, currentPage: page }) }
          itemsPerPage={variables?.rows }
          currentPage={variables?.currentPage }
          totalPages={ variables?.totalPages }
          isLoading ={loading}
          enablePagination={true}
          onSearch={ value => setFilter(value) }
          totalItems={variables?.totalRecords }
        />
      </div>
      <EditModal
        isOpen={handleEditModal.isOpen}
        onClose={handleEditModal.onClose}
        values={edit}
        handleSendUpdateUser={handleSendUpdateUser}
      />
      <ConfirmModal
        onClose={handleDeleteModal.onClose}
        onConfirm={ () => console.log()}
        isOpen={handleDeleteModal.isOpen}
        title={'Mensaje de confirmacion'}
        message={`Seguro que quiere eliminar a ${edit.name} ?`}
        onCancel={ handleDeleteModal.onClose }/>
      <AddUserModal
      onAddUser={refetch}
      isOpen={handleAddUser.isOpen}
      onClose={handleConfirmDeleteUser }
      />
    </AdministrationLayout>
  )
}
export default CreateUserForm
