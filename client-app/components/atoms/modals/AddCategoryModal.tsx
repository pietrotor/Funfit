import { useForm } from 'react-hook-form'
import { MyModal } from './MyModal'
import Input from '../Input'
import { UseCustomCreateCategoryMutation } from '@/hooks/UseCategoryQuery'

type AddCategoryModalProps = {
  isOpen: boolean
  onClose: () => void
  onAdd: () => void
}

export const AddCategoryModal = ({
  isOpen,
  onClose,
  onAdd
}: AddCategoryModalProps) => {
  const { handleCreateCategory, loading } = UseCustomCreateCategoryMutation()
  const { handleSubmit, control, watch, reset } = useForm()
  const onSubmit = () => {
    handleCreateCategory(watch('name'))
    reset()
    onClose()
    onAdd()
  }

  const handleCancel = () => {
    reset()
    onClose()
  }

  return (
    <MyModal
      title="Agregar Categoría de producto"
      message="Agrega una nueva categoría de producto"
      color="success"
      loading={loading}
      handleCancel={handleCancel}
      control={control}
      reset={reset}
      handleSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
    >
      <div className="p-4 text-gray-500 md:p-8">
        <Input
          label="Nombre"
          name="name"
          control={control}
          isRequired
          rules={{
            required: {
              value: true,
              message: 'El nombre es requerido'
            },
            pattern: {
              value: /^[A-Za-z\s]+$/,
              message: 'El nombre no debe contener caracteres especiales'
            }
          }}
        />
      </div>
    </MyModal>
  )
}
