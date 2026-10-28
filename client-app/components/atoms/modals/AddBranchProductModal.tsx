import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Checkbox, Chip, Image, Spinner } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { MyModal } from './MyModal'
import Input from '../Input'
import {
  Product,
  ProductTypeEnum,
  useGetBranchProductsPaginatedQuery,
  useGetProductsQuery
} from '@/graphql/graphql-types'
import { useCreateBranchProductQuery } from '@/hooks/UseBranchQuery'
import { SearchInput } from '@/components/molecules/SearchInput/SearchInput'
import UseDebouncedValue from '@/hooks/UseDebouncedValue'

interface AddBranchProductModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: () => void
}

const PLACEHOLDER_IMAGE =
  'https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg'

const RESULTS_LIMIT = 30

type FormValues = {
  price: string
}

const getProductImage = (image?: string | null) =>
  image === 'null' || !image ? PLACEHOLDER_IMAGE : image

export const AddBranchProductModal = ({
  isOpen,
  onClose,
  onAdd
}: AddBranchProductModalProps) => {
  const { handleCreateBranchProduct, loading: loadingCreateBranchProduct } =
    useCreateBranchProductQuery()
  const { handleSubmit, control, reset, setValue } = useForm<FormValues>({
    defaultValues: { price: '' }
  })
  const [filter, setFilter] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isVisibleMenu, setIsVisibleMenu] = useState(true)
  const [isVisibleWeb, setIsVisibleWeb] = useState(true)
  const router = useRouter()
  const { branchId } = router.query
  const filterDebounced = UseDebouncedValue(filter, 500)

  const { data: productsData, loading: loadingProducts } = useGetProductsQuery({
    skip: !isOpen || !!selectedProduct,
    fetchPolicy: 'network-only',
    variables: {
      paginationInput: {
        filter: filterDebounced,
        rows: RESULTS_LIMIT,
        page: 1
      }
    }
  })

  const { data: branchProductData, loading: loadingBranchProducts } =
    useGetBranchProductsPaginatedQuery({
      skip: !isOpen || !branchId,
      fetchPolicy: 'network-only',
      variables: {
        branchId: branchId as string,
        paginationInput: {
          rows: 500,
          page: 1
        }
      }
    })

  const assignedProductIds = useMemo(() => {
    const ids = new Set<string>()
    branchProductData?.getBranchProductsPaginated?.data?.forEach(item => {
      if (item?.productId) ids.add(String(item.productId))
    })
    return ids
  }, [branchProductData])

  const products = productsData?.getProducts?.data || []
  const totalRecords = productsData?.getProducts?.totalRecords || 0

  const resetModalState = () => {
    setFilter('')
    setSelectedProduct(null)
    setIsVisibleMenu(true)
    setIsVisibleWeb(true)
    reset({ price: '' })
  }

  useEffect(() => {
    if (!isOpen) {
      resetModalState()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  const handleCancel = () => {
    resetModalState()
    onClose()
  }

  const handleSelectProduct = (product: Product) => {
    if (assignedProductIds.has(String(product.id))) return
    setSelectedProduct(product)
    const suggested =
      typeof product.suggetedPrice === 'number' && product.suggetedPrice > 0 ? String(product.suggetedPrice) : ''
    setValue('price', suggested, { shouldValidate: false })
  }

  const onSubmit = (values: FormValues) => {
    if (!selectedProduct?.id || !branchId) return
    handleCreateBranchProduct(
      {
        branchId: branchId as string,
        productId: selectedProduct.id,
        price: parseFloat(values.price),
        isVisibleOnMenu: isVisibleMenu,
        isVisibleOnWeb: isVisibleWeb
      },
      () => {
        resetModalState()
        onClose()
        onAdd()
      }
    )
  }

  return (
    <MyModal
      title="Agregar Producto a la sucursal"
      message={
        selectedProduct ? 'Confirma el precio y la visibilidad del producto' : 'Busca por nombre o código y selecciona un producto'
      }
      color="success"
      loading={loadingCreateBranchProduct}
      handleCancel={handleCancel}
      control={control}
      reset={reset}
      handleSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={handleCancel}
      onSubmit={onSubmit}
      size="2xl"
      scrollBehavior="inside"
      placement="center"
      successButtonDisabled={!selectedProduct || loadingCreateBranchProduct}
      hideSuccessButton={!selectedProduct}
    >
      <div className="px-3 pb-2 text-gray-600 sm:px-8">
        {selectedProduct ? (
          <div className="flex flex-col space-y-4">
            <div className="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3">
              <Image
                alt={selectedProduct.name}
                width={56}
                height={56}
                className="min-h-[56px] min-w-[56px] rounded-md object-cover"
                src={getProductImage(selectedProduct.image)}
              />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="line-clamp-2 text-left text-base font-semibold text-gray-900">
                    {selectedProduct.name}
                  </p>
                  {selectedProduct.type === ProductTypeEnum.COMBO && (
                    <Chip size="sm" color="secondary" variant="flat">
                      Combo
                    </Chip>
                  )}
                </div>
                <p className="text-left text-sm text-gray-500">
                  Código:{' '}
                  <span className="font-semibold text-gray-700">
                    {selectedProduct.code}
                  </span>
                </p>
              </div>
              <button
                type="button"
                className="shrink-0 rounded-md px-2 py-2 text-sm font-medium text-secondary hover:bg-secondary/10"
                onClick={() => {
                  setSelectedProduct(null)
                  setValue('price', '')
                }}
              >
                Cambiar
              </button>
            </div>

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
                  value: /^\d+(\.\d+)?$/,
                  message: 'Solo se permiten números'
                }
              }}
            />

            <div className="flex flex-col gap-3 sm:flex-row sm:space-x-5">
              <Checkbox
                size="sm"
                isSelected={isVisibleMenu}
                onValueChange={setIsVisibleMenu}
              >
                Es Visible en el Menú
              </Checkbox>
              <Checkbox
                size="sm"
                isSelected={isVisibleWeb}
                onValueChange={setIsVisibleWeb}
              >
                Es Visible en la Web
              </Checkbox>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="[&_input]:text-base">
              <SearchInput onSearch={setFilter} />
            </div>

            {(loadingProducts || loadingBranchProducts) && (
              <div className="flex justify-center py-6">
                <Spinner />
              </div>
            )}

            {!loadingProducts && products.length === 0 && (
              <p className="py-8 text-center text-sm text-gray-500">
                {filterDebounced ? 'No se encontraron productos con ese nombre o código' : 'Escribe para buscar productos del catálogo'}
              </p>
            )}

            {!loadingProducts && products.length > 0 && (
              <>
                {totalRecords > RESULTS_LIMIT && (
                  <p className="text-xs text-gray-500">
                    Mostrando {RESULTS_LIMIT} de {totalRecords}, afina la
                    búsqueda
                  </p>
                )}
                <div className="max-h-[min(55vh,420px)] space-y-2 overflow-y-auto pr-1">
                  {products.map(product => {
                    if (!product) return null
                    const isAssigned = assignedProductIds.has(
                      String(product.id)
                    )
                    return (
                      <button
                        type="button"
                        key={product.id}
                        disabled={isAssigned}
                        onClick={() => handleSelectProduct(product as Product)}
                        className={`flex min-h-[56px] w-full items-center gap-3 rounded-lg border p-3 text-left transition-colors ${
                          isAssigned ? 'cursor-not-allowed border-gray-100 bg-gray-50 opacity-60' : 'cursor-pointer border-gray-200 bg-white hover:border-secondary/40 hover:bg-secondary/5'
                        }`}
                      >
                        <Image
                          alt={product.name}
                          width={48}
                          height={48}
                          className="min-h-[48px] min-w-[48px] rounded-md object-cover"
                          src={getProductImage(product.image)}
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="line-clamp-2 text-sm font-semibold text-gray-900 sm:text-base">
                              {product.name}
                            </p>
                            {product.type === ProductTypeEnum.COMBO && (
                              <Chip size="sm" color="secondary" variant="flat">
                                Combo
                              </Chip>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 sm:text-sm">
                            Código:{' '}
                            <span className="font-semibold text-gray-700">
                              {product.code}
                            </span>
                          </p>
                        </div>
                        {isAssigned && (
                          <span className="shrink-0 rounded-full bg-gray-200 px-2 py-1 text-[11px] font-medium text-gray-600">
                            Ya en la sucursal
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </MyModal>
  )
}
