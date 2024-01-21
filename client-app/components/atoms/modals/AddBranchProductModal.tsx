import { useForm } from 'react-hook-form'
import { Checkbox } from '@nextui-org/react'

import { useState } from 'react'
import { useRouter } from 'next/router'
import { MyModal } from './MyModal'
import { TValueProductData } from './EditProductModal'
import Input from '../Input'
import ComboInput from '../ComboInput'
import UseDebouncedValue from '@/hooks/UseDebouncedValue'
import { useGetProductsLazyQuery } from '@/graphql/graphql-types'
import { useCreateBranchProductQuery } from '@/hooks/UseBranchQuery'

interface AddBranchProductModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: () => void
}

export const AddBranchProductModal = ({
  isOpen,
  onClose,
  onAdd
}: AddBranchProductModalProps) => {
  const { handleCreateBranchProduct } = useCreateBranchProductQuery()
  const { handleSubmit, control, watch, reset } = useForm()
  const [filterProduct] = useState<string>('')
  const [productsData, setProductsData] = useState<TValueProductData>()
  const [isVisibleMenu, setIsVisibleMenu] = useState<boolean>(true)
  const [isVisibleWeb, setIsVisibleWeb] = useState<boolean>(true)
  const router = useRouter()
  const { branchId } = router.query
  const valueFilterProduct = UseDebouncedValue(filterProduct, 500)
  const [getProducts, { data, loading }] = useGetProductsLazyQuery({
    fetchPolicy: 'network-only',
    variables: {
      paginationInput: {
        filter: valueFilterProduct
      }
    }
  })

  const onSubmit = () => {
    handleCreateBranchProduct({
      branchId: branchId as string,
      productId: productsData?.id,
      price: parseFloat(watch('price')),
      isVisibleOnMenu: isVisibleMenu,
      isVisibleOnWeb: isVisibleWeb
    })
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
      title="Agregar Producto a la sucursal"
      message="Agrega un nuevo producto a la sucursal"
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
        <div className="mb-4 flex flex-col space-y-4">
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
              })) || [{ label: 'Cargando..', value: 'Cargando..' }]
            }
          />
          <Input
            control={control}
            name="price"
            label="Precio del producto"
            placeholder="Bs."
            type="text"
            rules={{
              required: {
                value: true,
                message: 'Este campo es obligatorio'
              },
              pattern: {
                value: /^[0-9]+$/i,
                message: 'Solo se permiten números'
              }
            }}
          />
          <div className="flex space-x-5">
            <Checkbox
              name="isVisibleMenu"
              size="sm"
              defaultSelected
              isSelected={watch('isVisibleMenu')}
              onValueChange={setIsVisibleMenu}
            >
              Es Visible en el Menú
            </Checkbox>
            <Checkbox
              name="isVisibleWeb"
              size="sm"
              defaultSelected
              isSelected={watch('isVisibleWeb')}
              onValueChange={setIsVisibleWeb}
            >
              Es Visible en la Web
            </Checkbox>
          </div>
        </div>
      </div>
    </MyModal>
  )
}
