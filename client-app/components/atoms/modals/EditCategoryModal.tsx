import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { MyModal } from './MyModal'
import Input from '../Input'
import { TCategories, UseCustomeUpdateCategory } from '@/hooks/UseCategoryQuery'

interface EditCategoryModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: () => void
  values: TCategories
}

export const EditCategoryModal = ({
  isOpen,
  onClose,
  onAdd,
  values
}: EditCategoryModalProps) => {
  const { handleSubmit, watch, control, reset } = useForm()
  const { handleUpdateCategory } = UseCustomeUpdateCategory()

  const onSubmit = () => {
    handleUpdateCategory({
      id: values.id,
      name: watch('name')
    })
    onAdd()
    onClose()
  }
  useEffect(() => {
    reset({
      name: values.name
    })
  }, [values])
  return (
    <MyModal
      title="Editar usuario"
      message="Por favor ingrese los datos del usuario a editar"
      handleCancel={onClose}
      color="warning"
      loading={false}
      isOpen={isOpen}
      size="2xl"
      onClose={onClose}
      hideCloseButton={false}
      control={control}
      watch={watch}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
    >
      <div className=" m-auto flex w-5/6 flex-col items-center space-y-4 pb-9 text-gray-500">
        <Input
          control={control}
          name="name"
          type="text"
          placeholder="Nombre"
          label={'Nombre'}
          required={false}
          rules={{
            pattern: {
              value: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
              message: 'El nombre solo puede contener letras y espacios'
            }
          }}
          defaultValue={values.name}
        />
      </div>
    </MyModal>
  )
}
