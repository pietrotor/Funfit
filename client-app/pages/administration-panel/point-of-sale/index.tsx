import { useEffect, useState } from 'react'
import { Pagination, Spinner, useDisclosure } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { SearchX, ShoppingBag } from 'lucide-react'
import PointOfSaleCard from '@/components/molecules/Card/PointOfSaleCard'
import AdministrationLayout from '@/components/templates/layouts'
import SalesReceipt from '@/components/organisms/SalesReceipt'
import { TProductBranchData } from '@/interfaces/TData'
import { useAppSelector } from '@/store/index'
import ResponsiveSaleModal from '@/components/atoms/modals/ResponsiveSaleModal'
import { authUserHeader } from '@/utils/verificationUser'
import { formatBs } from '@/utils/formatBs'

import Search from '@/components/molecules/Search'
import EmptyState from '@/components/molecules/EmptyState'
import { useGetBranchProductPOSQuery } from '@/hooks/UseBranchQuery'
import { addProductQuantity } from '@/utils/pointOfSale'

export type TPointOfSaleData = {
  products: TProductBranchData[]
  subTotal: number
  total: number
  discount: number
  orderId: string | null
}
interface PointOfSaleProps {
  user: any
}

function PointOfSale({ user }: PointOfSaleProps) {
  const router = useRouter()
  const { data: dataPassed } = router.query
  const parsedData = dataPassed ? JSON.parse(dataPassed as string) : null
  const branchId = useAppSelector(state => state.branchReducer.currentBranch.id)
  const { loading, data, setFilter, setVariables, variables, refetch } =
    useGetBranchProductPOSQuery(branchId)
  const [selectedProducts, setSelectedProducts] = useState<TPointOfSaleData>(
    parsedData || { products: [], subTotal: 0, total: 0, discount: 0 }
  )

  const handleResponsiveSaleModal = useDisclosure()

  const handleSelected = (id: string) => {
    const branchProduct = data?.getBranchProductsPaginated?.data?.find(
      item => item.productId === id
    )
    if (!branchProduct) return

    setSelectedProducts(prevProducts =>
      addProductQuantity(prevProducts, branchProduct as TProductBranchData)
    )
  }

  useEffect(() => {
    const { data: dataPassed } = router.query
    const parsedData = dataPassed ? JSON.parse(dataPassed as string) : null
    setSelectedProducts(
      parsedData || {
        products: [],
        subTotal: 0,
        total: 0,
        discount: 0,
        orderId: null
      }
    )
  }, [router.query])

  useEffect(() => {
    const branchProducts = data?.getBranchProductsPaginated?.data
    if (!branchProducts?.length) return

    setSelectedProducts(prevProducts => {
      if (!prevProducts?.products?.length) return prevProducts

      let hasChanges = false
      const products = prevProducts.products.map(product => {
        const branchProduct = branchProducts.find(
          item => item.productId === product.productId
        )
        if (!branchProduct || branchProduct.stock === product.stock) {
          return product
        }
        hasChanges = true
        return { ...product, stock: branchProduct.stock }
      })

      return hasChanges ? { ...prevProducts, products } : prevProducts
    })
  }, [data])

  const itemCount = selectedProducts.products?.length || 0

  return (
    <AdministrationLayout
      user={user}
      profileButton={false}
      containerClassName="!m-0 !max-w-none !p-0 h-[100dvh]"
    >
      <section className="flex h-[100dvh] w-full flex-col md:flex-row">
        <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-[#FFF8EE] px-3 pb-24 pt-14 md:px-5 md:pb-4 md:pt-4 lg:pt-5">
          <div className="mb-3 flex items-end justify-between gap-3">
            <div className="hidden md:block">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-secondary-darken">
                Punto de venta
              </p>
              <h1 className="font-amsipro text-2xl font-bold tracking-tight text-tertiary">
                Productos
              </h1>
            </div>
            <div className="w-full md:max-w-sm">
              <Search setFilter={setFilter} />
            </div>
          </div>

          {loading && (
            <div className="flex flex-1 items-center justify-center">
              <Spinner label="Cargando productos..." color="primary" />
            </div>
          )}

          {!loading && !data?.getBranchProductsPaginated?.data?.length && (
            <EmptyState
              icon={SearchX}
              title="Sin productos"
              description="No se encontraron productos para esta búsqueda."
            />
          )}

          {!loading && !!data?.getBranchProductsPaginated?.data?.length && (
            <div className="min-h-0 flex-1 overflow-y-auto pr-1">
              <div className="grid grid-cols-2 gap-3 pb-3 md:grid-cols-2 md:gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {data.getBranchProductsPaginated.data.map(item => (
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
                    selectedProducts={selectedProducts}
                    setSelectedProducts={setSelectedProducts}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-center pt-2">
            <Pagination
              color="primary"
              size="sm"
              isCompact
              showControls
              total={variables?.totalPages || 1}
              page={variables?.currentPage || 1}
              onChange={page => {
                setVariables({ ...variables, currentPage: page })
              }}
            />
          </div>
        </div>

        <aside className="hidden h-[100dvh] w-[340px] shrink-0 border-l border-secondary/30 shadow-[-12px_0_30px_-24px_rgba(122,148,32,0.5)] md:flex lg:w-[400px]">
          <SalesReceipt
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
            refetch={refetch}
          />
        </aside>

        <button
          type="button"
          onClick={handleResponsiveSaleModal.onOpen}
          className="fixed inset-x-3 bottom-3 z-30 flex items-center justify-between rounded-2xl bg-primary-600 px-4 py-3 text-white shadow-[0_12px_30px_-12px_rgba(224,108,0,0.8)] md:hidden"
        >
          <span className="flex items-center gap-2 text-sm font-semibold">
            <ShoppingBag className="h-4 w-4" strokeWidth={1.75} />
            Ver ticket
            {itemCount > 0 && (
              <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-bold text-tertiary">
                {itemCount}
              </span>
            )}
          </span>
          <span className="num text-sm font-semibold">
            {formatBs(selectedProducts.total)}
          </span>
        </button>
      </section>
      <ResponsiveSaleModal
        isOpen={handleResponsiveSaleModal.isOpen}
        onClose={handleResponsiveSaleModal.onClose}
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
        refetch={refetch}
      />
    </AdministrationLayout>
  )
}

export default PointOfSale
export const getServerSideProps: GetServerSideProps = async ctx =>
  await authUserHeader(ctx)
