import { useState } from 'react'
import PointOfSaleCard from '@/components/molecules/Card/PointOfSaleCard'
import Search from '@/components/molecules/Search'
import AdministrationLayout from '@/components/templates/layouts'
import SalesReceipt from '@/components/organisms/SalesReceipt'
import { useGetBranchProductPOSQuery } from '@/hooks/UseBranchQuery'
import { TProductBranchData } from '@/interfaces/TData'
import { useAppSelector } from '@/store/index'

export type TPointOfSaleData = {
  products: TProductBranchData[]
  subTotal: number
  total: number
  discount: number
}

function PointOfSale() {
  const branchId = useAppSelector(state => state.branchReducer.currentBranch.id)
  const { loading, data } = useGetBranchProductPOSQuery(branchId)
  const [selectedProducts, setSelectedProducts] = useState<TPointOfSaleData>()

  const handleSelected = (id: string) => {
    const existingProduct = selectedProducts?.products?.find(
      item => item.productId === id
    )

    if (existingProduct) {
      setSelectedProducts((prevProducts: TPointOfSaleData | undefined) => {
        return {
          products: [
            ...(prevProducts?.products ?? []).filter(
              item => item.productId !== id
            ),
            {
              ...existingProduct,
              quantity: existingProduct?.quantity! + 1,
              total: existingProduct.quantity! * existingProduct.price
            }
          ],
          subTotal: (prevProducts?.subTotal || 0) + existingProduct.price,
          total: (prevProducts?.total || 0) + existingProduct.price,
          discount: 0
        }
      })
    } else {
      const newProduct = data?.getBranchProductsPaginated?.data?.find(
        item => item.productId === id
      )

      if (newProduct) {
        setSelectedProducts((prevProducts: TPointOfSaleData | undefined) => {
          return {
            products: [
              ...(prevProducts?.products ?? []),
              { ...(newProduct as TProductBranchData), quantity: 1, total: newProduct.price }
            ],
            subTotal: (prevProducts?.subTotal || 0) + newProduct.price,
            total: (prevProducts?.total || 0) + newProduct.price,
            discount: 0
          }
        })
      }
    }
  }

  return (
    <AdministrationLayout>
      <section className="flex h-full w-full ">
        <div className="w-2/3 border-1 border-secondary/30 bg-secondary/10 p-4">
          <div className="flex w-full">
            <Search onChange={() => {}} />
          </div>
          <div className="grid grid-cols-3 gap-4 p-4">
            {data?.getBranchProductsPaginated?.data?.map(item => (
              <PointOfSaleCard
                key={item.id}
                product={item as TProductBranchData}
                isLoading={loading}
                handleSelected={() => handleSelected(item.productId)}
              />
            ))}
          </div>
        </div>
        <div className="h-full w-1/3">
          <SalesReceipt
            selectedProducts={
              selectedProducts || {
                products: [],
                subTotal: 0,
                total: 0,
                discount: 0
              }
            }
            setSelectedProducts={setSelectedProducts}
          />
        </div>
      </section>
    </AdministrationLayout>
  )
}

export default PointOfSale
