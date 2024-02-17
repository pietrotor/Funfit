import { useForm } from 'react-hook-form'
import { MyModal } from './MyModal'
import Input from '../Input'
import { showSuccessToast } from '../Toast/toasts'
import {
  StatusEnum,
  useUpdateBranchProductMutation
} from '@/graphql/graphql-types'

type TUpdateBranchProduct = {
  id?: string
  price?: number
}

type UpdateBranchProductModalProps = {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
  data: TUpdateBranchProduct
}

function UpdateBranchProductModal({
  data,
  isOpen,
  onSuccess,
  onClose
}: UpdateBranchProductModalProps) {
  const { control, handleSubmit } = useForm<TUpdateBranchProduct>({
    defaultValues: {
      id: data.id
    }
  })

  const [updateBranchProductMutation, { loading }] =
    useUpdateBranchProductMutation({
      onError(error) {
        console.log('🚀 ~ onError ~ error:', error)
        showSuccessToast('Ocurrió un error al actualizar el precio', 'error')
      }
    })

  const onSubmit = handleSubmit(data => {
    updateBranchProductMutation({
      variables: {
        updateBranchProductInput: {
          id: data.id,
          price: data.price
        }
      },
      onCompleted(data) {
        if (data.updateBranchProduct?.status === StatusEnum.ERROR) {
          showSuccessToast('Ocurrió un error al actualizar el precio', 'error')
        } else {
          showSuccessToast(data.updateBranchProduct?.message || '', 'success')
          onSuccess?.()
          onClose()
        }
      }
    })
  })

  return (
    <MyModal
      title="Actualizar Precio"
      message=""
      isForm={false}
      onSubmit={onClose}
      isOpen={isOpen}
      color="secondary"
      handleCancel={onClose}
      onClose={onClose}
      handleSubmit={onSubmit}
      hideCloseButton={false}
      loading={loading}
      size={'xl'}
    >
      <div className="px-4 md:px-10">
        <Input
          control={control}
          name="price"
          valueAs="number"
          type="number"
          placeholder="10 Bs"
          label={'Precio'}
          defaultValue={data.price?.toString()}
          required={true}
          rules={{
            required: {
              value: true,
              message: 'Este campo es obligatorio'
            }
          }}
        />
      </div>
    </MyModal>
  )
}

export { UpdateBranchProductModal }
