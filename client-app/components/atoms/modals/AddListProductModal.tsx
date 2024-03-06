import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { MyModal } from './MyModal'

import { showSuccessToast } from '../Toast/toasts'
import Input from '../Input'
import ComboInput from '../ComboInput'
import {
  StatusEnum,
  useCreatePriceMutation,
  useGetProductsLazyQuery
} from '@/graphql/graphql-types'
import UseDebouncedValue from '@/hooks/UseDebouncedValue'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  onAddPrice: () => void
}

export const AddListProductModal = ({
  isOpen,
  onClose,
  onAddPrice
}: ModalProps) => {
  const router = useRouter()
  const { priceListId } = router.query
  const { handleSubmit, control, reset, watch } = useForm()
  const [filterProduct, setFilterProduct] = useState<string>('')
  const [productId, setProductId] = useState()
  const valueFilterProduct = UseDebouncedValue(filterProduct, 500)

  const [getProducts, { data }] = useGetProductsLazyQuery({
    fetchPolicy: 'network-only',
    variables: {
      paginationInput: {
        filter: valueFilterProduct
      }
    },
    onCompleted: data => {
      console.log(data, 'data')
    },
    onError: error => {
      console.log(error, 'error')
      showSuccessToast('Error al obtener los productos', 'error')
    }
  })

  const [createPrice, { loading }] = useCreatePriceMutation({
    onError(error) {
      showSuccessToast('Error al crear el precio', 'error')
      console.log('🚀 ~ onError ~ error:', error)
    }
  })

  console.log(watch())

  const onSubmit = () => {
    createPrice({
      variables: {
        createPriceInput: {
          price: parseFloat(watch('price')),
          priceListId: priceListId!,
          productId
        }
      },
      onCompleted(data) {
        if (data.createPrice?.status !== StatusEnum.OK) {
          return showSuccessToast(data.createPrice?.message!, 'error')
        }
        showSuccessToast(data.createPrice?.message!, 'success')
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
      title="Agregar producto a la lista de precio"
      message="Ingrese el producto y el precio para agregarlo a la lista de precio"
      color="success"
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
      <div className="grid grid-cols-2 items-center gap-5 p-5">
        <ComboInput
          rules={{
            required: {
              value: true,
              message: 'Este campo es requerido'
            }
          }}
          control={control}
          name="productId"
          onClick={getProducts}
          label="Producto"
          onChange={value => {
            setFilterProduct(value)
          }}
          onSelectionChange={value => {
            setProductId(value)
          }}
          options={
            data?.getProducts?.data?.map(product => ({
              label: product.name,
              value: product.id
            })) || []
          }
        />
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
