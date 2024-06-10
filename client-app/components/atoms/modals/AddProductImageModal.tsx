import { useForm } from 'react-hook-form'

import { MyModal } from './MyModal'
import { TValueProductData } from './EditProductModal'
import { DropZone } from '@/components/molecules/DropZone'

import {
  StatusEnum,
  useUpdateProductMutation,
  useUploadFileMutation
} from '@/graphql/graphql-types'
import { showSuccessToast } from '../Toast/toasts'

interface AddProductImageProps {
  isOpen: boolean
  onClose: () => void
  onAdd: () => void
  values: TValueProductData
}

export const AddProductImageModal = ({
  isOpen,
  onClose,
  onAdd,
  values
}: AddProductImageProps) => {
  const { handleSubmit, watch, control, reset, setValue } = useForm<{
    file: File
  }>()

  const [uploadFile, { loading }] = useUploadFileMutation()
  const [updateProduct, { loading: loadingProduct }] =
    useUpdateProductMutation()

  const onSubmit = () => {
    if (watch('file')) {
      uploadFile({
        variables: {
          fileInput: {
            file: watch('file'),
            productId: values.id
          }
        },
        onCompleted({ uploadFile }) {
          if (uploadFile?.status !== StatusEnum.OK) {
            return showSuccessToast(
              uploadFile?.message || 'No se pudo subir la imagen',
              'error'
            )
          }
          onAdd()
          onClose()
          return showSuccessToast(uploadFile?.message || '', 'success')
        },
        onError(error) {
          console.error(error)
          showSuccessToast('No se pudo subir la imagen', 'error')
        }
      })
    } else if (values.image) {
      updateProduct({
        variables: {
          updateProductInput: {
            id: values.id,
            image: null
          }
        },
        onCompleted({ updateProduct }) {
          if (updateProduct?.status !== StatusEnum.OK) {
            return showSuccessToast(
              updateProduct?.message || 'No se pudo eliminar la imagen',
              'error'
            )
          }
          onAdd()
          onClose()
          return showSuccessToast(updateProduct?.message || '', 'success')
        },
        onError(error) {
          console.error(error)
          showSuccessToast('No se pudo eliminar la imagen', 'error')
        }
      })
    }
  }

  const handleCancel = () => {
    reset()
    onClose()
  }

  return (
    <MyModal
      handleCancel={handleCancel}
      title="Agregar imagen al producto"
      message="Seleccione una imagen para el producto"
      color="success"
      loading={loading || loadingProduct}
      isOpen={isOpen}
      onClose={onClose}
      control={control}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      reset={reset}
    >
      <div className="space-y-2 p-4 text-gray-500 md:p-8">
        <DropZone
          onChange={file => setValue('file', file as any)}
          value={watch('file') || values?.image}
        />
      </div>
    </MyModal>
  )
}
