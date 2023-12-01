import AdministrationLayout from '@/components/templates/layouts'
import { AddUserModal } from '@/components/atoms/modals/AddUserModal'
import { Button, useDisclosure } from '@nextui-org/react'
import Table from '@/components/organisms/table/Table'
function CreateUserForm () {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const Users = [
    {
      name: 'Edwin',
      lastName: 'Garcia',
      Email: 'test@gmail.com',
      telephone: 78845465
    },
    {
      name: 'Edwin',
      lastName: 'Garcia',
      Email: 'test@gmail.com',
      telephone: 78845465
    },
    {
      name: 'Edwin',
      lastName: 'Garcia',
      Email: 'test@gmail.com',
      telephone: 78845465
    },
    {
      name: 'Edwin',
      lastName: 'Garcia',
      Email: 'test@gmail.com',
      telephone: 78845465
    }
  ]
  return (
    <AdministrationLayout>
      <Button onClick={onOpen}>open</Button>
      <div className='w-5/6 m-auto'>
        <Table
          titles={[
            { name: 'Usiario' },
            { name: 'Email' },
            { name: 'Telefono' }
          ]}
          items={(Users || [])?.map((user, idx) => {
            return {
              content: [
                <div key={idx} className='flex space-x-3'>
                  <div className='flex items-start flex-col'>
                    <p className='text-lg font-bold'>
                      {user.name
                        ? user.name + ' ' + user.lastName
                        : 'Sin Definir'}
                    </p>
                  </div>
                </div>,
                <div key={idx} className='text-md'>{user.Email}</div>,
                <p key={idx}>
                  {user.telephone ? user.telephone : 'Sin Definir'}
                </p>
              ]
            }
          })}
        />
      </div>
      <AddUserModal isOpen={isOpen} onClose={onClose} />
    </AdministrationLayout>
  )
}
export default CreateUserForm
