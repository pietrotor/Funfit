import AdministrationLayout from '@/components/templates/layouts'
import { AddUserModal } from '@/components/atoms/modals/AddUserModal'
import { Button, useDisclosure } from '@nextui-org/react'
function CreateUserForm () {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <AdministrationLayout>
        <Button onClick={onOpen}>open</Button>
        <AddUserModal isOpen={isOpen} onClose={onClose} />
    </AdministrationLayout>
  )
}
export default CreateUserForm
