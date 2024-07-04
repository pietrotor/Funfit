import { Button, useDisclosure } from '@nextui-org/react'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import OrderStatus from '../OrderStatus'
import ButtonComponent from '@/components/atoms/Button'
import DateConverter from '@/components/atoms/DateConverter'
import IconSelector from '@/components/atoms/IconSelector'
import Table from '@/components/organisms/tableNext/Table'
import {
  useCustomAcceptOrder,
  useCustomGetOrdersPaginated
} from '@/hooks/UseOrderQuery'
import { useAppSelector } from '@/store/index'
import ProductListModal from '@/components/atoms/modals/ProductListModal'
import { TSaleProduct } from '@/interfaces/TData'
import OrderDetailsModal from '@/components/atoms/modals/OrderDetails'
import CancelOrderModal from '@/components/atoms/modals/CancelOrderModal'
import {
  DeliveryMethodEnum,
  OrderStatusEnum,
  StatusEnum,
  useDeliverOrderMutation
} from '@/graphql/graphql-types'
import { showSuccessToast } from '@/components/atoms/Toast/toasts'

interface OrdersProps {
  orderStatus: OrderStatusEnum | undefined
}
export type TOrderDetails = {
  client: string
  paymentMethod: string
  deliveryMethod: string
  details: string
  number?: string
  address?: {
    mapUrl: string
    detail: string
  }
}

export type TOrderSelected = {
  type: string
  id: string
}

const Orders = ({ orderStatus }: OrdersProps) => {
  const { handleAcceptOrder } = useCustomAcceptOrder()

  const handleProductsListModal = useDisclosure()
  const handleCancelOrderModal = useDisclosure()
  const handleOrderDetailsModal = useDisclosure()

  const [products, setProducts] = useState<TSaleProduct[]>([])
  const [orderDetails, setOrderDetails] = useState<TOrderDetails>()
  const [orderSelected, setOrderSelected] = useState<TOrderSelected>()

  const router = useRouter()

  const currentBranch = useAppSelector(
    state => state.branchReducer.currentBranch
  )
  const { data, loading, setFilter, setVariables, variables, refetch } =
    useCustomGetOrdersPaginated(currentBranch.id, orderStatus)

  const [deliverOrderMutation] = useDeliverOrderMutation({
    onError(error) {
      console.log('🚀 ~ onError ~ error:', error)
      showSuccessToast(
        'No se pudo mover el estado del pedido a entregado',
        'error'
      )
    }
  })

  const handleChangeRow = (row: number) => {
    console.log(row)
    setVariables({ ...variables, rows: row, currentPage: 1 })
  }

  const handleDeliverOrder = (orderId: string) => {
    deliverOrderMutation({
      variables: {
        orderId
      },
      onCompleted({ deliverOrder }) {
        if (deliverOrder?.status !== StatusEnum.OK) {
          return showSuccessToast(
            deliverOrder?.message ||
              'No se pudo mover el estado del pedido a entregado',
            'error'
          )
        }
        showSuccessToast(deliverOrder?.message || 'Orden entregada', 'success')
        refetch()
      }
    })
  }

  const handleOrder = (id: string) => {
    const orderData = data?.getOrdersPaginated?.data?.find(
      order => order.id === id
    )
    if (orderData) {
      const dataToSend = {
        products: orderData.products.map(product => ({
          id: product.branchProductId,
          branchId: orderData.branchId,
          productId: product.productId,
          price: product.price,
          isVisibleOnWeb: true,
          isVisibleOnMenu: true,
          quantity: product.qty,
          product: {
            id: product.branchProductId || '',
            name: product.product?.name || '',
            description: product.product?.description || '',
            branchProductId: product.branchProductId
          },
          stock: product.qty,
          total: product.total
        })),
        subTotal: orderData.subTotal,
        total: orderData.total,
        discount: orderData.discount,
        orderId: id
      }
      handleAcceptOrder(id, dataToSend)
    }
  }

  const handleReorder = (id: string) => {
    const orderData = data?.getOrdersPaginated?.data?.find(
      order => order.id === id
    )
    if (orderData) {
      const dataToSend = {
        products: orderData.products.map(product => ({
          id: product.branchProductId,
          branchId: orderData.branchId,
          productId: product.productId,
          price: product.price,
          isVisibleOnWeb: true,
          isVisibleOnMenu: true,
          quantity: product.qty,
          product: {
            id: product.branchProductId || '',
            name: product.product?.name || '',
            description: product.product?.description || '',
            branchProductId: product.branchProductId
          },
          stock: product.qty,
          total: product.total
        })),
        subTotal: orderData.subTotal,
        total: orderData.total,
        discount: orderData.discount,
        orderId: id
      }
      router.push({
        pathname: '/administration-panel/point-of-sale',
        query: { data: JSON.stringify(dataToSend) }
      })
    }
  }

  return (
    <>
      <div className="flex w-full justify-end">
        <Button
          color="primary"
          onClick={() => refetch()}
          className="w-fit !px-2"
          size="sm"
        >
          <IconSelector name="Refresh" />
        </Button>
      </div>
      <Table
        tableName="PEDIDOS"
        isLoading={loading}
        currentPage={variables?.currentPage}
        totalItems={data?.getOrdersPaginated?.totalRecords || 0}
        totalPages={variables?.totalPages}
        itemsPerPage={variables?.rows}
        enablePagination={true}
        onSearch={value => {
          setFilter(value)
          setVariables({ ...variables, filter: value, currentPage: 1 })
        }}
        onChangeRow={row => handleChangeRow(row)}
        onChangePage={page => setVariables({ ...variables, currentPage: page })}
        titles={[
          { name: '#' },
          { name: 'Código' },
          { name: 'Productos' },
          { name: 'Estado del pedido' },
          { name: 'Fecha de orden' },
          { name: 'Total' },
          { name: 'Detalle' },
          { name: 'Acciones' }
        ]}
        items={(data?.getOrdersPaginated?.data || []).map((orders, idx) => ({
          content: [
            <h3 key={idx} className="text-sm">
              {((variables?.currentPage || 0) - 1) * (variables?.rows || 0) +
                idx +
                1}
            </h3>,
            <div key={idx} className="text-left">
              <p className="font-bold">{orders.code}</p>
              {orders.saleId && (
                <Link
                  className="text-xs text-blue-500 hover:underline"
                  href={`/administration-panel/sales/${orders.saleId}`}
                >
                  Ver venta
                </Link>
              )}
            </div>,
            <div key={idx} className=" flex flex-col justify-center">
              {orders.products.length > 2 ? (
                <span
                  className="cursor-pointer text-sm text-blue-600 hover:underline"
                  onClick={() => {
                    setProducts(orders.products as TSaleProduct[])
                    handleProductsListModal.onOpen()
                  }}
                >
                  Ver productos
                </span>
              ) : (
                orders.products.map((product, idx) => (
                  <p key={idx} className="text-sm font-semibold text-gray-500">
                    {product.product?.name}
                  </p>
                ))
              )}
            </div>,
            <OrderStatus key={idx} status={orders.orderStatus} />,
            <div key={idx} className="w-[6rem] text-xs md:w-full">
              <DateConverter showTime dateString={orders.date} />
            </div>,
            <div key={idx} className="text-center text-sm">
              Bs. {orders.total}
            </div>,
            <ButtonComponent
              key={idx}
              showTooltip
              tooltipText="Ver detalles"
              type="eye"
              isIconOnly
              onClick={() => {
                setOrderDetails({
                  client: orders.customerInfo?.name || '',
                  paymentMethod: orders.paymentMethod || '',
                  deliveryMethod: orders.deliveryMethod || '',
                  details: orders.orderDetails || '',
                  number: orders.customerInfo?.phone || '',
                  address:
                    // eslint-disable-next-line multiline-ternary
                    orders.deliveryMethod === DeliveryMethodEnum.DELIVERY
                      ? {
                          mapUrl: `https://maps.google.com/?q=${orders.addressInfo?.latitude},${orders.addressInfo?.longitude}`,
                          detail: orders.addressInfo?.detail || ''
                        }
                      : undefined
                })
                handleOrderDetailsModal.onOpen()
              }}
            >
              <IconSelector name="eye" color="text-secondary" />
            </ButtonComponent>,
            <div className="flex justify-center gap-1" key={idx}>
              {orders.orderStatus === OrderStatusEnum.PENDING && (
                <ButtonComponent
                  showTooltip
                  tooltipText="Aceptar pedido"
                  type="eye"
                  isIconOnly
                  onClick={() => handleOrder(orders.id)}
                >
                  <IconSelector name="check" color="text-secondary" />
                </ButtonComponent>
              )}
              {orders.orderStatus === OrderStatusEnum.ACEPTED && (
                <ButtonComponent
                  showTooltip
                  tooltipText="Vender Pedido"
                  type="edit"
                  isIconOnly
                  onClick={() => handleReorder(orders.id)}
                >
                  <IconSelector name="cart" color="text-primary" />
                </ButtonComponent>
              )}
              {orders.orderStatus === OrderStatusEnum.SOLD && (
                <ButtonComponent
                  showTooltip
                  tooltipText="Entregar Pedido"
                  type="eye"
                  isIconOnly
                  onClick={() => handleDeliverOrder(orders.id)}
                >
                  <IconSelector name="Truck" color="text-secondary" />
                </ButtonComponent>
              )}
              {(orders.orderStatus === OrderStatusEnum.PENDING ||
                orders.orderStatus === OrderStatusEnum.ACEPTED) && (
                <ButtonComponent
                  showTooltip
                  tooltipText="Rechazar pedido"
                  type="delete"
                  onClick={() => {
                    setOrderSelected({
                      type: 'cancel',
                      id: orders.id
                    })
                    handleCancelOrderModal.onOpen()
                  }}
                  isIconOnly
                >
                  <IconSelector name="trash" color="text-danger" />
                </ButtonComponent>
              )}
            </div>
          ]
        }))}
      />
      <ProductListModal
        isOpen={handleProductsListModal.isOpen}
        onClose={handleProductsListModal.onClose}
        values={products || []}
        order
      />
      <CancelOrderModal
        isOpen={handleCancelOrderModal.isOpen}
        onClose={handleCancelOrderModal.onClose}
        onCancel={() => refetch()}
        order={orderSelected || { type: '', id: '' }}
      />
      <OrderDetailsModal
        isOpen={handleOrderDetailsModal.isOpen}
        onClose={handleOrderDetailsModal.onClose}
        details={
          orderDetails || {
            client: '',
            paymentMethod: '',
            deliveryMethod: '',
            details: '',
            number: ''
          }
        }
      />
    </>
  )
}

export default Orders
