import { useEffect, useState } from 'react'
import { Pagination, Spinner, useDisclosure } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import PointOfSaleCard from '@/components/molecules/Card/PointOfSaleCard'
import AdministrationLayout from '@/components/templates/layouts'
import SalesReceipt from '@/components/organisms/SalesReceipt'
import { TProductBranchData } from '@/interfaces/TData'
import { useAppSelector } from '@/store/index'
import ResponsiveSaleModal from '@/components/atoms/modals/ResponsiveSaleModal'
import ButtonComponent from '@/components/atoms/Button'
import { authUserHeader } from '@/utils/verificationUser'

import Search from '@/components/molecules/Search'
import { useGetBranchProductPOSQuery } from '@/hooks/UseBranchQuery'

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
  const { loading, data, setFilter, setVariables, variables } =
    useGetBranchProductPOSQuery(branchId)
  const [selectedProducts, setSelectedProducts] = useState<TPointOfSaleData>(
    parsedData || { products: [], subTotal: 0, total: 0, discount: 0 }
  )

  const handleResponsiveSaleModal = useDisclosure()

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
    if (selectedProducts && selectedProducts.products.length > 0) {
      selectedProducts.products.forEach(product => {
        product.stock = data?.getBranchProductsPaginated?.data?.find(
          item => item.productId === product.productId
        )?.stock
      })
    }
    console.log(selectedProducts)
  }, [selectedProducts])

  return (
    <AdministrationLayout user={user} profileButton={false}>
      <section className="flex h-full w-full ">
        <div className="flex w-2/3 flex-col  items-center border-1 border-secondary/30 bg-secondary/10 p-4">
          <div className="flex w-full">
            <Search setFilter={setFilter} />
          </div>
          {loading && (
            <div className="flex h-[90vh] items-center justify-center overflow-y-auto scrollbar-hide ">
              <Spinner label="Cargando..." color="primary" />
            </div>
          )}
          <div className="grid max-h-[90vh] grid-cols-2 gap-3 overflow-y-auto scrollbar-hide md:grid-cols-3 md:gap-4 md:p-4 ">
            {!loading &&
              data?.getBranchProductsPaginated?.data?.map(item => (
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
          <Pagination
            color="secondary"
            size='lg'
            isCompact
            showControls
            total={variables?.totalPages || 1}
            page={variables?.currentPage || 1}
            onChange={page => {
              setVariables({ ...variables, currentPage: page })
            }}
          />
          <ButtonComponent
            className="mt-4 block w-full bg-secondary font-extrabold text-white md:hidden"
            onClick={handleResponsiveSaleModal.onOpen}
          >
            Finalizar venta
          </ButtonComponent>
        </div>
        <div className="hidden h-full md:block md:w-1/3">
          <SalesReceipt
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
          />
        </div>
      </section>
      <ResponsiveSaleModal
        isOpen={handleResponsiveSaleModal.isOpen}
        onClose={handleResponsiveSaleModal.onClose}
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
      />
    </AdministrationLayout>
  )
}

export default PointOfSale
export const getServerSideProps: GetServerSideProps = async ctx =>
  await authUserHeader(ctx)
