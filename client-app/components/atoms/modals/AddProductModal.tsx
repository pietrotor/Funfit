import { useForm } from 'react-hook-form'

import { Image, useDisclosure } from '@nextui-org/react'
import { useMemo, useState } from 'react'
import { MyModal } from './MyModal'
import { SearchProductModal } from './SearchProductsModal'
import Input from '../Input'
import { showSuccessToast } from '../Toast/toasts'
import Selector from '../InputSelector'

import ButtonComponent from '../Button'
import IconSelector from '../IconSelector'
import {
  CreateProductInput,
  Product,
  StatusEnum,
  useCreateComboMutation,
  useCreateProductMutation,
  useGetCategoriesLazyQuery
} from '@/graphql/graphql-types'

interface AddProductModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: () => void
  isCombo?: boolean
}

type SubProduct = Product & { stockRequirement: number }

export const AddProductModal = ({
  isOpen,
  onClose,
  onAdd,
  isCombo
}: AddProductModalProps) => {
  const { handleSubmit, watch, control, reset } = useForm<CreateProductInput>()
  const [subProducts, setSubProducts] = useState<SubProduct[]>([])
  const [createProduct, { loading }] = useCreateProductMutation()
  const [createCombo, { loading: loadingCombo }] = useCreateComboMutation({
    onError: error => {
      console.error(error)
      showSuccessToast('No se pudo crear el combo', 'error')
    }
  })
  const [getProducts, { data }] = useGetCategoriesLazyQuery({
    fetchPolicy: 'network-only',
    variables: {
      paginationInput: {}
    }
  })
  const productsDisclosure = useDisclosure()

  const earningPorcent = useMemo(() => {
    if (!watch('suggetedPrice') || !watch('cost')) return null
    const price = parseFloat(watch('suggetedPrice')?.toString())
    const cost = parseFloat(watch('cost')!.toString())

    return (
      (parseFloat(((price - cost) / price).toString()) as any).toFixed(4) * 100
    )
  }, [watch('suggetedPrice'), watch('cost')])

  const handleCreateCombo = (data: CreateProductInput) => {
    createCombo({
      variables: {
        createComboInput: {
          description: data.description,
          name: data.name,
          image: data.image,
          code: data.code,
          categoryId: (data as any).category,
          cost: parseFloat(data.cost as any),
          suggetedPrice: parseFloat(data.suggetedPrice as any),
          subProducts: subProducts.map(product => ({
            productId: product.id,
            stockRequirement: parseInt(product.stockRequirement as any)
          }))
        }
      },
      onCompleted: data => {
        if (data.createCombo?.status === StatusEnum.ERROR) {
          showSuccessToast(
            data.createCombo.message || 'Ocurrió un error',
            'error'
          )
        } else {
          showSuccessToast(
            data.createCombo?.message || 'Combo guardado correctamente',
            'success'
          )
          onClose()
          reset()
          onAdd()
        }
      }
    })
  }

  const onSubmit = (data: CreateProductInput) => {
    if (isCombo) {
      handleCreateCombo(data)
    } else {
      createProduct({
        variables: {
          createProductInput: {
            cost: parseFloat(watch('cost') as any),
            code: watch('code'),
            description: watch('description'),
            image: watch('image'),
            name: watch('name'),
            suggetedPrice: parseFloat(watch('suggetedPrice') as any),
            categoryId: (watch as any)('category') as any
          }
        },
        onCompleted: data => {
          if (data.createProduct?.status === StatusEnum.ERROR) {
            showSuccessToast(
              data.createProduct.message || 'Ocurrió un error',
              'error'
            )
          } else {
            showSuccessToast(
              data.createProduct?.message || 'Producto guardado correctamente',
              'success'
            )
            onClose()
            reset()
            onAdd()
          }
        }
      })
    }
  }

  const handleCancel = () => {
    reset()
    onClose()
  }

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
        handleCancel={handleCancel}
        title="Agregar producto"
        message="Ingrese los datos del nuevo producto"
        color="success"
        loading={loading || loadingCombo}
        isOpen={isOpen}
        onClose={onClose}
        control={control}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        reset={reset}
      >
        <div className="space-y-2 p-4 text-gray-500 md:p-8">
          <div className="grid grid-cols-2 gap-2 pb-2">
            <Input
              control={control}
              name="name"
              label="Nombre"
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
              name="suggetedPrice"
              label="Precio sugerido"
              type="text"
              rules={{
                required: {
                  value: true,
                  message: 'Este campo es obligatorio'
                },
                pattern: {
                  value: /^\d+(\.\d+)?$/,
                  message: 'Solo se permiten números'
                }
              }}
            />
            <Input
              control={control}
              name="cost"
              label="Costo"
              type="text"
              rules={{
                required: {
                  value: true,
                  message: 'Este campo es obligatorio'
                },
                pattern: {
                  value: /^\d+(\.\d+)?$/,
                  message: 'Solo se permiiten números'
                }
              }}
            />
            <Input
              name="code"
              control={control}
              label="Código"
              type="text"
              rules={{
                required: {
                  value: true,
                  message: 'Este campo es obligatorio'
                }
              }}
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
            options={
              data?.getCategories?.data?.map(category => ({
                label: category.name,
                value: category.id
              })) || [{ label: 'Cargando..', value: 'Cargando..' }]
            }
          />
          <Input
            control={control}
            name="description"
            label="Descripción"
            type="textArea"
          />
          {!!earningPorcent && (
            <p>
              Porcentaje de ganancia:{' '}
              <span className="font-bold">{earningPorcent}%</span>
            </p>
          )}
          {isCombo && (
            <p
              className="cursor-pointer text-right font-semibold text-secondary hover:underline"
              onClick={productsDisclosure.onOpen}
            >
              Agregar productos
            </p>
          )}
          <div className="space-y-3">
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
