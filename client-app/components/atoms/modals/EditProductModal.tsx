import { useForm } from 'react-hook-form'
import { useEffect, useMemo, useState } from 'react'
import { Image, useDisclosure } from '@nextui-org/react'
import { MyModal } from './MyModal'
import { SearchProductModal } from './SearchProductsModal'
import Input from '../Input'
import Selector from '../InputSelector'
import ButtonComponent from '../Button'
import IconSelector from '../IconSelector'
import {
  Product,
  ProductTypeEnum,
  SubProducts,
  useGetCategoriesLazyQuery
} from '@/graphql/graphql-types'
import { TCategories } from '@/hooks/UseCategoryQuery'

type SubProduct = Product & { stockRequirement: number }
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
  subProducts?: SubProducts[]
}

interface EditProductModalProps {
  isOpen: boolean
  onClose: () => void
  values: TValueProductData
  handleUpdateProduct: (values: TValueProductData) => void
  isCombo?: boolean
}

export const EditProductModal = ({
  isOpen,
  onClose,
  values,
  handleUpdateProduct,
  isCombo
}: EditProductModalProps) => {
  const { handleSubmit, watch, control, reset } = useForm()
  const [subProducts, setSubProducts] = useState<SubProduct[]>([])
  const [getProducts, { data }] = useGetCategoriesLazyQuery({
    fetchPolicy: 'network-only',
    variables: {
      paginationInput: {}
    }
  })
  const productsDisclosure = useDisclosure()

  const onSubmit = () => {
    handleUpdateProduct({
      id: values.id,
      name: watch('name') === values.name ? undefined : watch('name'),
      description: watch('description'),
      cost: parseFloat(watch('cost')),
      code: watch('code') === values.code ? undefined : watch('code'),
      image: values.image,
      suggetedPrice: parseFloat(watch('suggetedPrice')),
      categoryId: watch('category'),
      type: watch('type'),
      subProducts: subProducts.map(product => ({
        productId: product.id,
        stockRequirement: parseInt(product.stockRequirement as any)
      }))
    })
  }
  const handleCancel = () => {
    onClose()
    reset()
  }
  useEffect(() => {
    if (!values) return
    reset({
      name: values?.name,
      description: values?.description,
      cost: values?.cost,
      code: values?.code,
      suggetedPrice: values?.suggetedPrice,
      category: values?.category?.id,
      type: values?.type
    })
    if (values?.subProducts) {
      setSubProducts(
        values?.subProducts?.map(
          product =>
            ({
              ...product.product,
              stockRequirement: product.stockRequirement
            }) as any
        ) || []
      )
    }
  }, [values])

  const earningPorcent = useMemo(() => {
    if (!watch('suggetedPrice') || !watch('cost')) return null
    const price = parseFloat(watch('suggetedPrice')?.toString())
    const cost = parseFloat(watch('cost')!.toString())

    return (
      (parseFloat(((price - cost) / price).toString()) as any).toFixed(4) * 100
    )
  }, [watch('suggetedPrice'), watch('cost')])
  const handleChangeProductQty = (id: string, qty: number) => {
    const updatedProudcts = subProducts.map(product => {
      if (product.id === id) {
        return {
          ...product,
          stockRequirement: qty
        }
      }
      return product
    })
    setSubProducts(updatedProudcts)
  }

  const onDelete = (id: string) => {
    const updatedProudcts = subProducts.filter(product => product.id !== id)
    setSubProducts(updatedProudcts)
  }
  return (
    <>
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
          {!!earningPorcent && (
            <p className="w-full text-left">
              Porcentaje de ganancia:{' '}
              <span className="font-bold">{earningPorcent}%</span>
            </p>
          )}
          {isCombo && (
            <p
              className="w-full cursor-pointer text-right font-semibold text-secondary hover:underline"
              onClick={productsDisclosure.onOpen}
            >
              Agregar productos
            </p>
          )}
          <div className="w-full space-y-3">
            {subProducts.map(product => (
              <div
                className="w-full cursor-pointer rounded-md bg-gray-100 p-3 transition-all duration-200 hover:bg-gray-200"
                key={product.id}
              >
                <div className="flex justify-between">
                  <div className="flex gap-5">
                    <Image
                      alt="image"
                      width={80}
                      src={
                        product.image === 'null' || !product.image
                          ? 'https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg'
                          : product.image
                      }
                    />
                    <div>
                      <p className="font-semibold">{product.name}</p>
                      <p className="text-xs font-thin text-gray-400">
                        {product.code}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      className="w-16 appearance-none rounded border-2 p-2 outline-none "
                      value={product.stockRequirement}
                      onChange={e =>
                        handleChangeProductQty(
                          product.id,
                          e.target.valueAsNumber
                        )
                      }
                    />
                    <ButtonComponent
                      onClick={() => onDelete(product.id)}
                      type="delete"
                      showTooltip
                      tooltipText="Eliminar"
                    >
                      <IconSelector
                        name="trash"
                        color="text-danger"
                        width="w-8"
                      />
                    </ButtonComponent>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </MyModal>
      <SearchProductModal
        isOpen={productsDisclosure.isOpen}
        alreadyAdd={subProducts.map(({ id }) => id)}
        onAdd={product =>
          setSubProducts(prevValues => [
            ...prevValues,
            {
              ...product,
              stockRequirement: 1
            }
          ])
        }
        onClose={productsDisclosure.onClose}
      />
    </>
  )
}
