import { Button, useDisclosure } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import AdministrationLayout from '@/components/templates/layouts'
import { AddUserModal } from '@/components/atoms/modals/AddUserModal'
import Table from '@/components/organisms/table/Table'
import {
  useGetUsersLazyQuery,
  useUpdateUserMutation
} from '@/graphql/graphql-types'
import IconSelector from '@/components/atoms/IconSelector'
import { EditModal, TValue } from '@/components/atoms/modals/EditModal'

function CreateUserForm() {
  const [GetUsersQuery, { data }] = useGetUsersLazyQuery()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const handleEditModal = useDisclosure()
  const [edit, setEdit] = useState<TValue>({
    id: '',
    name: '',
    lastName: '',
    email: '',
    phone: ''
  })
  const [UpdateUserMutationVariables] = useUpdateUserMutation()

  useEffect(() => {
    GetUsersQuery({
      variables: {
        paginationInput: {}
      },
      onCompleted: data => {
        console.log(data)
      }
    })
  }, [])

  const handleSendUpdateUser = async (values: TValue) => {
    const { data } = await UpdateUserMutationVariables({
      variables: {
        updateUserInput: {
          id: values.id,
          name: values.name,
          lastName: values.lastName,
          email: values.email,
          phone: values.phone
        }
      }
    })
    console.log(data)
  }

  const handleUpdateUser = (id: string) => {
    const user = data?.getUsers?.data?.find(user => user.id === id)
    setEdit(user as TValue)
    console.log(edit)
    handleEditModal.onOpen()
  }

  return (
    <AdministrationLayout>
      <h1 className="mb-10 mt-10 text-center text-4xl font-bold">Usuarios</h1>
      <div className="m-auto w-5/6 ">
        <Button onClick={onOpen} color="secondary" className="float-right my-4">
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
          items={(data?.getUsers?.data || [])?.map((user, idx) => {
            return {
              content: [
                <p key={idx} className="text-lg">
                  {idx + 1}
                </p>,
                <div key={idx} className="flex space-x-3">
                  <div className="flex flex-col items-start">
                    <p className="text-lg font-bold">
                      {user.name && user.lastName
                        ? user.name + ' ' + user.lastName
                        : 'Sin Definir'}
                    </p>
                  </div>
                </div>,
                <div key={idx} className="text-lg">
                  {user.email}
                </div>,
                <p key={idx} className="text-lg">
                  {user.phone ? user.phone : 'Sin Definir'}
                </p>,
                <div key={idx} className="flex space-x-3">
                  <Button
                    onClick={() => handleUpdateUser(user.id)}
                    color="secondary"
                    className="w-1/2"
                  >
                    Editar
                  </Button>
                  <Button color="danger" className="w-1/2">
                    Eliminar
                  </Button>
                </div>
              ]
            }
          })}
        />
      </div>
      <EditModal
        isOpen={handleEditModal.isOpen}
        onClose={handleEditModal.onClose}
        values={edit}
        handleSendUpdateUser={handleSendUpdateUser}
      />
      <AddUserModal isOpen={isOpen} onClose={onClose} />
    </AdministrationLayout>
  )
}
export default CreateUserForm
