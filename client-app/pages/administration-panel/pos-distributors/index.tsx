import { GetServerSideProps } from 'next'
import { useEffect, useMemo, useState } from 'react'
import { Spinner, useDisclosure } from '@nextui-org/react'
import { useRouter } from 'next/router'
import Decimal from 'decimal.js'
import { authUserHeader } from '@/utils/verificationUser'
import ButtonComponent from '@/components/atoms/Button'
import AdministrationLayout from '@/components/templates/layouts'
import Search from '@/components/molecules/Search'
import { TpointOfSaleDistributor } from '@/interfaces/TData'
import DistributorSaleProductCard from '@/components/molecules/Card/DistributorSaleProductCard'
import SalesReceipt from '@/components/organisms/SalesReceipt'
import { SelectPOSDistributorModal } from '@/components/atoms/modals/SelectPOSDistributorModal'
import {
  DistributorSaleProduct,
  useGetDistributorSaleProductsLazyQuery
} from '@/graphql/graphql-types'

interface PointOfSaleProps {
  user: any
}

type TDistributorProductSaleProduct = DistributorSaleProduct & {
  quantity?: number
  total?: number
}

export type TPointOfSaleData = {
  products: TDistributorProductSaleProduct[]
  subTotal: number
  total: number
  discount: number
}

function PointOfSaleDistributors({ user }: PointOfSaleProps) {
  const router = useRouter()
  const { data: dataPassed } = router.query
  const parsedData = dataPassed ? JSON.parse(dataPassed as string) : null
  const [filter, setFilter] = useState('')
  const [getProducts, { loading, data, refetch }] =
    useGetDistributorSaleProductsLazyQuery({
      fetchPolicy: 'network-only'
    })
  const [selectedProducts, setSelectedProducts] = useState<TPointOfSaleData>(
    parsedData || { products: [], subTotal: 0, total: 0, discount: 0 }
  )
  const [selectedDistributors, setSelectedDistributors] =
    useState<TpointOfSaleDistributor>({} as TpointOfSaleDistributor)

  const handleResponsiveSaleModal = useDisclosure()
  const handleSelectWarehouseModal = useDisclosure()

  const products = useMemo(() => {
    if (!filter) return data?.getDistributorSaleProducts?.data || []

    return (
      data?.getDistributorSaleProducts?.data?.filter(
        item =>
          item.product?.name?.toLowerCase().includes(filter.toLowerCase()) ||
          item.product?.code?.toLowerCase().includes(filter.toLowerCase())
      ) || []
    )
  }, [data?.getDistributorSaleProducts?.data, filter])

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
              total: new Decimal(existingProduct.price)
                .mul((existingProduct.quantity || 1) + 1)
                .toNumber()
            }
          ],
          subTotal: new Decimal(existingProduct.price)
            .plus(prevProducts?.subTotal || 0)
            .toNumber(),
          total: new Decimal(existingProduct.price)
            .plus(prevProducts?.total || 0)
            .toNumber(),
          discount: 0
        }
      })
    } else {
      const newProduct = data?.getDistributorSaleProducts?.data?.find(
        item => item.productId === id
      )

      if (newProduct) {
        setSelectedProducts((prevProducts: TPointOfSaleData | undefined) => {
          return {
            products: [
              ...(prevProducts?.products ?? []),
              {
                ...(newProduct as DistributorSaleProduct),
                quantity: 1,
                total: newProduct.price
              }
            ],
            subTotal: new Decimal(newProduct.price)
              .plus(prevProducts?.subTotal || 0)
              .toNumber(),
            total: new Decimal(newProduct.price)
              .plus(prevProducts?.total || 0)
              .toNumber(),
            discount: 0
          }
        })
      }
    }
  }

  useEffect(() => {
    handleSelectWarehouseModal.onOpen()
  }, [])

  useEffect(() => {
    const { data: dataPassed } = router.query
    const parsedData = dataPassed ? JSON.parse(dataPassed as string) : null
    setSelectedProducts(
      parsedData || { products: [], subTotal: 0, total: 0, discount: 0 }
    )
  }, [router.query])

  return (
    <AdministrationLayout
      user={user}
      profileButton={false}
      containerClassName="!p-0 !pl-2"
    >
      <section className="flex h-full w-full flex-col md:flex-row">
        <div className="w-full border-1 border-secondary/30 bg-secondary/10  p-4 md:w-2/3">
          <div className="flex w-full">
            <Search setFilter={value => setFilter(value)} />
          </div>
          {loading && (
            <div className="flex h-[90vh] items-center justify-center overflow-y-auto scrollbar-hide ">
              <Spinner label="Cargando..." color="primary" />
            </div>
          )}
          <div className="grid max-h-[90vh] grid-cols-2 gap-3 overflow-y-auto scrollbar-hide md:gap-4 md:p-4 xl:grid-cols-3 ">
            {!loading &&
              products.map(item => (
                <DistributorSaleProductCard
                  key={item.productId}
                  product={item as any}
                  quantity={
                    selectedProducts?.products?.find(
                      product => product.productId === item.productId
                    )?.quantity || 0
                  }
                  isLoading={loading}
                  handleSelected={() => handleSelected(item.productId)}
                  selectedProducts={selectedProducts as any}
                  setSelectedProducts={setSelectedProducts as any}
                />
              ))}
          </div>
          <ButtonComponent
            className="mt-4 block w-full bg-secondary font-extrabold text-white md:hidden"
            onClick={handleResponsiveSaleModal.onOpen}
          >
            Finalizar venta
          </ButtonComponent>
        </div>
        <div className="h-full w-full md:block md:w-1/3">
          <SalesReceipt
            selectedProducts={selectedProducts as any}
            setSelectedProducts={setSelectedProducts as any}
            selectedDistributors={selectedDistributors}
            isDistributorSale
            refetch={() => {
              refetch()
              setTimeout(() => {
                router.reload()
              }, 1500)
            }}
          />
        </div>
      </section>
      <SelectPOSDistributorModal
        isOpen={handleSelectWarehouseModal.isOpen}
        onClose={handleSelectWarehouseModal.onClose}
        selectedDistributor={selectedDistributors}
        setSelectDistributor={setSelectedDistributors}
        getProduct={() =>
          getProducts({
            variables: {
              priceListId: selectedDistributors.priceListId!,
              warehouseId: selectedDistributors.warehouse!
            }
          })
        }
      />
    </AdministrationLayout>
  )
}

export default PointOfSaleDistributors

export const getServerSideProps: GetServerSideProps = async ctx =>
  await authUserHeader(ctx)
