import { useEffect, useState } from 'react'
import { Spinner } from '@nextui-org/react'
import { useRouter } from 'next/router'
import PointOfSaleCard from '@/components/molecules/Card/PointOfSaleCard'
import AdministrationLayout from '@/components/templates/layouts'
import SalesReceipt from '@/components/organisms/SalesReceipt'
import { useGetBranchProductPOSQuery } from '@/hooks/UseBranchQuery'
import { TProductBranchData } from '@/interfaces/TData'
import { useAppSelector } from '@/store/index'
import { GetServerSideProps } from 'next'
import { authUserHeader } from '@/utils/verificationUser'

export type TPointOfSaleData = {
  products: TProductBranchData[]
  subTotal: number
  total: number
  discount: number
}
interface PointOfSaleProps {
  user: any
}

function PointOfSale({ user }: PointOfSaleProps) {
  const router = useRouter()
  const { data: dataPassed } = router.query
  const parsedData = dataPassed ? JSON.parse(dataPassed as string) : null
  const branchId = useAppSelector(state => state.branchReducer.currentBranch.id)
  const { loading, data } = useGetBranchProductPOSQuery(branchId)
  const [selectedProducts, setSelectedProducts] = useState<TPointOfSaleData>(
    parsedData || { products: [], subTotal: 0, total: 0, discount: 0 }
  )

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
              quantity: (existingProduct.quantity || 1) + 1,
              total:
                ((existingProduct.quantity || 1) + 1) * existingProduct.price
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
              {
                ...(newProduct as TProductBranchData),
                quantity: 1,
                total: newProduct.price
              }
            ],
            subTotal: (prevProducts?.subTotal || 0) + newProduct.price,
            total: (prevProducts?.total || 0) + newProduct.price,
            discount: 0
          }
        })
      }
    }
  }
  useEffect(() => {
    const { data: dataPassed } = router.query
    const parsedData = dataPassed ? JSON.parse(dataPassed as string) : null
    setSelectedProducts(
      parsedData || { products: [], subTotal: 0, total: 0, discount: 0 }
    )
  }, [router.query])

  useEffect(() => {
    const { data: dataPassed } = router.query
    const parsedData = dataPassed ? JSON.parse(dataPassed as string) : null
    setSelectedProducts(
      parsedData || { products: [], subTotal: 0, total: 0, discount: 0 }
    )
  }, [router.query])

  return (
    <AdministrationLayout user={user} profileButton={false}>
      <section className="flex h-full w-full ">
        <div className="w-2/3 border-1 border-secondary/30  bg-secondary/10 p-4">
          {/* <div className="flex w-full">
            <Search setFilter={setFilter} />
          </div> */}
          {loading && (
            <div className="flex h-[95vh] items-center justify-center overflow-y-auto scrollbar-hide ">
              <Spinner label="Cargando..." color="primary" />
            </div>
          )}
          <div className="grid max-h-[95vh] grid-cols-3 gap-4 overflow-y-auto p-4 scrollbar-hide ">
            {data?.getBranchProductsPaginated?.data?.map(item => (
              <PointOfSaleCard
                key={item.id}
                product={item as TProductBranchData}
                quantity={
                  selectedProducts?.products?.find(
                    product => product.productId === item.productId
                  )?.quantity || 0
                }
                isLoading={loading}
                handleSelected={() => handleSelected(item.productId)}
              />
            ))}
          </div>
        </div>
        <div className="h-full w-1/3">
          <SalesReceipt
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
          />
        </div>
      </section>
    </AdministrationLayout>
  )
}

export default PointOfSale
export const getServerSideProps: GetServerSideProps = async ctx =>
  await authUserHeader(ctx)
