import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { MyModal } from './MyModal'
import Input from '../Input'
import Selector from '../InputSelector'
import {
  ProductTypeEnum,
  useGetCategoriesLazyQuery
} from '@/graphql/graphql-types'
import { TCategories } from '@/hooks/UseCategoryQuery'
export type TValueProductData = {
  id?: any
  name?: string
  description?: string
  cost?: number
  suggetedPrice?: number
  image?: string
  code?: string
  internalCode?: string
  warehouses?: string[]
  categoryId?: string
  category?: TCategories
  type?: ProductTypeEnum
}
interface EditProductModalProps {
  isOpen: boolean
  onClose: () => void
  values: TValueProductData
  handleSendUpdateUser: (values: TValueProductData) => void
}

export const EditProductModal = ({
  isOpen,
  onClose,
  values,
  handleSendUpdateUser
}: EditProductModalProps) => {
  const { handleSubmit, watch, control, reset } = useForm()
  const [getProducts, { data }] = useGetCategoriesLazyQuery({
    fetchPolicy: 'network-only',
    variables: {
      paginationInput: {}
    }
  })
  const onSubmit = () => {
    handleSendUpdateUser({
      id: values.id,
      name: watch('name') === values.name ? undefined : watch('name'),
      description: watch('description'),
      cost: parseFloat(watch('cost')),
      code: watch('code') === values.code ? undefined : watch('code'),
      image: values.image,
      suggetedPrice: parseFloat(watch('suggetedPrice')),
      categoryId: watch('category')
    })
  }
  const handleCancel = () => {
    onClose()
    reset()
  }
  useEffect(() => {
    reset({
      name: values?.name,
      description: values?.description,
      cost: values?.cost,
      code: values?.code,
      suggetedPrice: values?.suggetedPrice,
      category: values?.category?.id
    })
  }, [values])
  return (
    <MyModal
      title="Editar producto"
      message="Ingrese los datos del producto"
      handleCancel={handleCancel}
      color="warning"
      isOpen={isOpen}
      size="2xl"
      onClose={onClose}
      hideCloseButton={false}
      control={control}
      loading={false}
      onSubmit={onSubmit}
      reset={reset}
      handleSubmit={handleSubmit}
    >
      <div className=" m-auto flex w-5/6 flex-col items-center space-y-3 pb-9 text-gray-500">
        <div className="grid w-full grid-cols-2 gap-3 ">
          <Input
            control={control}
            name="name"
            label="Nombre"
            placeholder="Nombre"
            type="text"
            defaultValue={values?.name}
            rules={{
              required: {
                value: true,
                message: 'Este campo es obligatorio'
              }
            }}
          />
          <Input
            control={control}
            name="suggetedPrice"
            label="Precio sugerido"
            defaultValue={values?.suggetedPrice?.toString()}
            placeholder="Precio sugerido"
            type="text"
            rules={{
              required: {
                value: true,
                message: 'Este campo es obligatorio'
              }
            }}
          />
          <Input
            control={control}
            defaultValue={values?.cost?.toString()}
            name="cost"
            label="Costo"
            placeholder="Costo"
            type="text"
            rules={{
              pattern: {
                value: /^\d+(\.\d+)?$/,
                message: 'Solo se permiten números'
              }
            }}
          />
          <Input
            defaultValue={values?.code}
            name="code"
            control={control}
            label="Código"
            placeholder="Código"
            type="text"
          />
        </div>
        <Selector
          control={control}
          name="category"
          label="Categoría"
          placeholder="Categoría"
          rules={{
            required: {
              value: true,
              message: 'Este campo es obligatorio'
            }
          }}
          onClick={getProducts}
          defaultValue={values?.category?.id}
          options={
            data?.getCategories?.data?.map(category => ({
              label: category.name,
              value: category.id
            })) || [
              {
                label: values?.category?.name || 'Cargando..',
                value: values?.category?.id
              }
            ]
          }
        />

        <Input
          defaultValue={values?.description}
          control={control}
          name="description"
          label="Descripción"
          placeholder="Descripción"
          type="textArea"
        />

        {/* <DropZone /> */}
      </div>
    </MyModal>
  )
}
