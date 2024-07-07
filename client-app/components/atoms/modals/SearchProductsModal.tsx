import { useState } from 'react'
import { Image, Spinner } from '@nextui-org/react'
import { MyModal } from './MyModal'
import { SearchInput } from '@/components/molecules/SearchInput/SearchInput'
import UseDebouncedValue from '@/hooks/UseDebouncedValue'
import {
  Product,
  ProductTypeEnum,
  useGetProductsQuery
} from '@/graphql/graphql-types'

interface SearchProductModalProps {
  alreadyAdd: string[]
  isOpen: boolean
  onClose: () => void
  onAdd: (product: Product) => void
}

const SearchProductModal = ({
  isOpen,
  onAdd,
  onClose,
  alreadyAdd
}: SearchProductModalProps) => {
  const [filter, setFilter] = useState<string>('')
  const filterProudcts = UseDebouncedValue(filter, 800)

  const { data: dataProducts, loading } = useGetProductsQuery({
    variables: {
      paginationInput: {
        filter: filterProudcts
      },
      type: ProductTypeEnum.SIMPLE
    }
  })
  return (
    <MyModal
      handleCancel={onClose}
      title="Agregar producto"
      message="Ingrese los datos del nuevo producto"
      color="success"
      isOpen={isOpen}
      onClose={onClose}
      isForm={false}
    >
      <div className="space-y-3 px-5">
        <SearchInput onSearch={value => setFilter(value)} />
        {loading && (
          <div className="flex justify-center">
            <Spinner />
          </div>
        )}
        <div className="max-h-[70vh] space-y-5 overflow-y-auto">
          {(dataProducts?.getProducts?.data || [])
            .filter(product => !alreadyAdd.includes(product.id))
            .map(product => (
              <div
                className="w-full cursor-pointer rounded-md bg-gray-100 p-3 transition-all duration-200 hover:bg-gray-200"
                key={product.id}
                onClick={() => {
                  onAdd(product as Product)
                  onClose()
                }}
              >
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
              </div>
            ))}
        </div>
      </div>
    </MyModal>
  )
}

export { SearchProductModal }
