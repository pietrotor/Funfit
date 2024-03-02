import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { MyModal } from './MyModal'

import { TValueProductData } from './EditProductModal'
import { showSuccessToast } from '../Toast/toasts'
import Input from '../Input'
import ComboInput from '../ComboInput'
import {
  useGetProductsLazyQuery
} from '@/graphql/graphql-types'
import UseDebouncedValue from '@/hooks/UseDebouncedValue'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  onAddWarehouse: () => void
}

export const AddListProductModal = ({
  isOpen,
  onClose,
  onAddWarehouse
}: ModalProps) => {
  const { handleSubmit, control, reset } = useForm()
  const [filterProduct, setFilterProduct] = useState<string>('')
  const [productsData, setProductsData] = useState<TValueProductData>()
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

  const onSubmit = () => {
    console.log('submit')
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
          name="product"
          onClick={getProducts}
          label="Producto"
          value={productsData?.name || ''}
          onChange={value => {
            setFilterProduct(value)
            setProductsData(
              data?.getProducts?.data?.find(
                product => product.name === value
              ) as TValueProductData
            )
          }}
          options={
            data?.getProducts?.data?.map(product => ({
              label: product.name,
              value: product.name
            })) || []
          }
        />
        <Input
          control={control}
          name="description"
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
