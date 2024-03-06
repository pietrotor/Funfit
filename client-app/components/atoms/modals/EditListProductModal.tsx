import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { MyModal } from './MyModal'

import { showSuccessToast } from '../Toast/toasts'
import Input from '../Input'
import {
  Price,
  StatusEnum,
  useUpdatePriceMutation
} from '@/graphql/graphql-types'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  onAddPrice: () => void
  data: Price | null
}

export const EditListProductModal = ({
  isOpen,
  onClose,
  onAddPrice,
  data: priceData
}: ModalProps) => {
  const { handleSubmit, control, reset, watch } = useForm()

  const [updatePrice, { loading }] = useUpdatePriceMutation({
    onError(error) {
      showSuccessToast('Error al crear el precio', 'error')
      console.log('🚀 ~ onError ~ error:', error)
    }
  })

  useEffect(() => {
    if (!priceData) return
    reset({ ...priceData, productId: priceData?.id })
  }, [priceData, reset])

  const onSubmit = () => {
    updatePrice({
      variables: {
        updatePriceInput: {
          id: priceData?.id,
          price: parseFloat(watch('price') as any),
          productId: priceData?.productId
        }
      },
      onCompleted(data) {
        if (data.updatePrice?.status !== StatusEnum.OK) {
          return showSuccessToast(data.updatePrice?.message!, 'error')
        }
        showSuccessToast(data.updatePrice?.message!, 'success')
        onAddPrice()
        onClose()
      }
    })
  }
  const handleCancel = () => {
    reset()
    onClose()
  }
  return (
    <MyModal
      title="Editar producto"
      message=""
      color="warning"
      handleCancel={handleCancel}
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
      loading={loading}
      control={control}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      reset={reset}
    >
      <div className="items-center gap-5 p-5">
        <Input
          control={control}
          name="price"
          type="text"
          label="Precio"
          rules={{
            required: { value: true, message: 'Este campo es obligatorio' }
          }}
        />
      </div>
    </MyModal>
  )
}
