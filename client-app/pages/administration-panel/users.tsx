import { GetServerSideProps } from 'next'
import { useState } from 'react'
import { useDisclosure } from '@nextui-org/react'

import AdministrationLayout from '@/components/templates/layouts'
import { AddUserModal } from '@/components/atoms/modals/AddUserModal'
import IconSelector from '@/components/atoms/IconSelector'
import { EditModal, TValueUserData } from '@/components/atoms/modals/EditModal'
import { showSuccessToast } from '@/components/atoms/Toast/toasts'

import {
  StatusEnum,
  useGetUsersQuery,
  useUpdateUserMutation
} from '@/graphql/graphql-types'
import Table from '@/components/organisms/tableNext/Table'
import UseDebouncedValue from '@/hooks/UseDebouncedValue'
import { PaginationInterfaceState } from '@/interfaces/paginationInterfaces'
import { authUserHeader } from '@/utils/verificationUser'
import ButtonComponent from '@/components/atoms/Button'
import { AdminButton } from '@/components/atoms/Button/AdminButton'
import { ConfirmModal } from '@/components/atoms/modals/ConfirmModal'

interface ICreateUserForm {
  user: any
}

function CreateUserForm({ user }: ICreateUserForm) {
  const handleAddUser = useDisclosure()
  const handleEditModal = useDisclosure()
  const handleDeleteModal = useDisclosure()
  const [filter, setFilter] = useState<string>('')
  const [variables, setVariables] = useState<PaginationInterfaceState>({
    rows: 5,
    filter: '',
    currentPage: 1
  })
  const filtroDebounced = UseDebouncedValue(filter, 2000)

  const [edit, setEdit] = useState<TValueUserData>({})

  const [UpdateUserMutationVariables] = useUpdateUserMutation()

  const { loading, data, refetch } = useGetUsersQuery({
    variables: {
      paginationInput: {
        page: variables?.currentPage,
        rows: variables?.rows,
        filter: filtroDebounced
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

  const handleSendUpdateUser = async (values: TValueUserData) => {
    try {
      await UpdateUserMutationVariables({
        variables: {
          updateUserInput: {
            id: values.id,
            name: values.name,
            lastName: values.lastName,
            email: values.email,
            phone: values.phone,
            roleId: values.roleId
          }
        },
        onCompleted: data => {
          showSuccessToast('Usuario actualizado', 'success')
          refetch()
          handleEditModal.onClose()
        },
        onError: error => {
          showSuccessToast('ocurrió un error', 'error')
          console.log(error)
        }
      })
    } catch (error) {
      console.log(error)
      showSuccessToast('ocurrió un error', 'error')
    }
  }

  const handleUpdateUser = (id: string) => {
    const user = data?.getUsers?.data?.find(user => user.id === id)
    setEdit(user as TValueUserData)
    console.log(edit)
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
    UpdateUserMutationVariables({
      variables: {
        updateUserInput: {
          id: edit.id
        },
        deleteInput: true
      },
      onCompleted: data => {
        if (data?.updateUser?.status === StatusEnum.ERROR) {
          showSuccessToast(
            data.updateUser.message || 'Error al eliminar el usuario',
            'error'
          )
          handleDeleteModal.onClose()
        } else {
          showSuccessToast(
            data.updateUser?.message || 'Usuario eliminado correctamente',
            'success'
          )
          refetch()
          handleDeleteModal.onClose()
        }
      },
      onError: error => {
        showSuccessToast('ocurrio un error', 'error')
        console.log(error)
      }
    })
  }

  return (
    <AdministrationLayout user={user}>
      <div className="m-auto mt-6 w-5/6 ">
        <h3 className="text-center text-4xl font-extrabold text-gray-500 ">
          Administración de usuarios
        </h3>
        <AdminButton
          onClick={handleAddUser.onOpen}
          color="secondary"
          iconName="addUser"
          text="Agregar nuevo usuario"
        />
        <Table
          titles={[
            { name: '#' },
            { name: 'Usuario' },
            { name: 'Email' },
            { name: 'Teléfono' },
            { name: 'Rol' },
            { name: 'Acciones' }
          ]}
          items={(data?.getUsers?.data || []).map((user, idx) => ({
            content: [
              <h3 key={idx} className="text-sm">
                {((variables?.currentPage || 0) - 1) * (variables?.rows || 0) +
                  idx +
                  1}
              </h3>,
              <div key={idx} className="text-left text-sm">
                {user.name + ' ' + user.lastName}
              </div>,
              <div key={idx} className="text-left text-sm">
                {user.email}
              </div>,
              <div key={idx} className="text-sm">
                {user.phone}
              </div>,
              <div key={idx}>
                <p className="m-auto w-fit rounded-full bg-secondary px-3 py-1 font-bold text-white">
                  {user.roleInfo?.name}
                </p>
              </div>,
              <div key={idx} className="flex justify-center space-x-1">
                <ButtonComponent
                  onClick={() => handleUpdateUser(user.id)}
                  type="edit"
                  showTooltip
                  tooltipText="Editar"
                >
                  <IconSelector name="edit" color="text-primary" width="w-8" />
                </ButtonComponent>
                <ButtonComponent
                  onClick={() => handleDeleteUser(user.id)}
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
          tableName="USUARIOS"
          onChangePage={page =>
            setVariables({ ...variables, currentPage: page })
          }
          itemsPerPage={variables?.rows}
          currentPage={variables?.currentPage}
          totalPages={variables?.totalPages}
          isLoading={loading}
          enablePagination={true}
          onSearch={value => {
            setFilter(value)
            setVariables({ ...variables, currentPage: 1 })
          }}
          totalItems={variables?.totalRecords}
        />
      </div>

      <EditModal
        isOpen={handleEditModal.isOpen}
        onClose={handleEditModal.onClose}
        values={edit}
        handleSendUpdateUser={handleSendUpdateUser}
      />

      <ConfirmModal
        cancelText="Cancelar"
        color="error"
        confirmText="Eliminar"
        name="trash"
        onClose={handleDeleteModal.onClose}
        onConfirm={handleConfirmDeleteUser}
        isOpen={handleDeleteModal.isOpen}
        title={'Mensaje de confirmación'}
        message={`¿Esta seguro de eliminar a ${edit.name} ?`}
      />

      <AddUserModal
        onAddUser={refetch}
        isOpen={handleAddUser.isOpen}
        onClose={handleAddUser.onClose}
      />
    </AdministrationLayout>
  )
}
export default CreateUserForm

export const getServerSideProps: GetServerSideProps = async ctx =>
  await authUserHeader(ctx)
