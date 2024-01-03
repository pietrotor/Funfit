import { useForm } from 'react-hook-form'
import { Button, Checkbox } from '@nextui-org/react'

import { useState } from 'react'
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
  const { handleSubmit, control, watch } = useForm()
  const [filterProduct] = useState<string>('')
  const [productsData, setProductsData] = useState<TValueProductData>()
  const valueFilterProduct = UseDebouncedValue(filterProduct, 500)
  const [getProducts, { data }] = useGetProductsLazyQuery({
    fetchPolicy: 'network-only',
    variables: {
      paginationInput: {
        filter: valueFilterProduct
      }
    }
  })

  const onSubmit = () => {
    handleCreateBranchProduct({
      branchId: '6595544d0aa5406c5d1a72ae',
      productId: productsData?.id,
      price: parseFloat(watch('price')),
      isVisibleOnMenu: watch('isVisibleMenu'),
      isVisibleOnWeb: watch('isVisibleWeb')
    })
  }

  const handleCancel = () => {
    /*
    reset()
    onClose()
    */
  }

  return (
    <MyModal isOpen={isOpen} onClose={onClose}>
      <section>
        <h1 className="mt-5 text-center text-3xl font-bold text-gray-500">
          Agregar Producto a la sucursal
        </h1>
        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          className="p-4 text-gray-500 md:p-8"
        >
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
              <Checkbox name="isVisibleMenu" defaultSelected size="sm">
                Es Visible en el Menú
              </Checkbox>
              <Checkbox name="isVisibleWeb" defaultSelected size="sm">
                Es Visible en la Web
              </Checkbox>
            </div>
          </div>
          <div className="grid h-12 grid-cols-2 gap-3 ">
            <Button
              type="submit"
              color="secondary"
              className="h-full text-lg font-bold"
            >
              Agregar
            </Button>
            <Button
              variant="flat"
              color="danger"
              className="h-full text-lg font-bold"
              onClick={handleCancel}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </section>
    </MyModal>
  )
}
