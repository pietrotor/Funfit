import { Button, Chip, useDisclosure } from '@nextui-org/react'
import { useState } from 'react'
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

interface OrdersProps {
  ordersAcepted: boolean | undefined
  ordersRejected?: boolean
}
export type TOrderDetails = {
  client: string
  paymentMethod: string
  deliveryMethod: string
  details: string
}

export type TOrderSelected = {
  type: string
  id: string
}

const Orders = ({ ordersAcepted }: OrdersProps) => {
  const { handleAcceptOrder } = useCustomAcceptOrder()

  const handleProductsListModal = useDisclosure()
  const handleCancelOrderModal = useDisclosure()
  const handleOrderDetailsModal = useDisclosure()

  const [products, setProducts] = useState<TSaleProduct[]>([])
  const [orderDetails, setOrderDetails] = useState<TOrderDetails>()
  const [orderSelected, setOrderSelected] = useState<TOrderSelected>()

  const currentBranch = useAppSelector(
    state => state.branchReducer.currentBranch
  )
  const { data, loading, setFilter, setVariables, variables, refetch } =
    useCustomGetOrdersPaginated(currentBranch.id, ordersAcepted)

  const handleChangeRow = (row: number) => {
    console.log(row)
    setVariables({ ...variables, rows: row, currentPage: 1 })
  }

  const handleOrder = (id: string) => {
    const orderData = data?.getOrdersPaginated?.data?.find(
      order => order.id === id
    )
    if (orderData) {
      const dataToSend = {
        products: orderData.products.map(product => ({
          id: product.product?.id,
          branchId: product.branchProductId,
          productId: product.productId,
          price: product.price,
          isVisibleOnWeb: true,
          isVisibleOnMenu: true,
          quantity: product.qty,
          product: {
            id: product.product?.id || '',
            name: product.product?.name || '',
            description: product.product?.description || ''
          },
          stock: product.qty,
          total: product.total
        })),
        subTotal: orderData.subTotal,
        total: orderData.total,
        discount: orderData.discount
      }
      handleAcceptOrder(id, dataToSend)
    }
  }

  return (
    <>
      <Table
        tableName="PEDIDOS"
        isLoading={loading}
        currentPage={variables?.currentPage}
        totalItems={variables?.totalRecords}
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
          { name: 'Productos' },
          { name: 'Estado del pedido' },
          { name: 'Fecha de orden' },
          { name: 'Detalles' },
          { name: 'Subtotal' },
          { name: 'Total' },
          { name: 'Acciones' }
        ]}
        items={(data?.getOrdersPaginated?.data || []).map((orders, idx) => ({
          content: [
            <h3 key={idx} className="text-sm">
              {((variables?.currentPage || 0) - 1) * (variables?.rows || 0) +
                idx +
                1}
            </h3>,
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
            <Chip
              key={idx}
              variant="flat"
              className="text-center text-sm"
              color={
                orders.rejected ? 'danger' : orders.orderAcepted ? 'secondary' : 'warning'
              }
            >
              {orders.rejected ? 'Rechazado' : orders.orderAcepted ? 'Aceptado' : 'Pendiente'}
            </Chip>,
            <div key={idx} className="w-[6rem] text-xs md:w-full">
              <DateConverter showTime dateString={orders.date} />
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
                  details: orders.orderDetails || ''
                })
                handleOrderDetailsModal.onOpen()
              }}
            >
              <IconSelector name="eye" color="text-secondary" />
            </ButtonComponent>,
            <div key={idx} className="text-center text-sm">
              Bs. {orders.subTotal}
            </div>,
            <div key={idx} className="text-center text-sm">
              Bs. {orders.total}
            </div>,
            orders.rejected ? (
              <></>
            ) : !orders.orderAcepted ? (
              <div key={idx} className="space-x-2">
                <ButtonComponent
                  showTooltip
                  tooltipText="Aceptar pedido"
                  type="eye"
                  isIconOnly
                  onClick={() => handleOrder(orders.id)}
                >
                  <IconSelector name="checked" color="text-secondary" />
                </ButtonComponent>
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
                  <IconSelector name="close" color="text-danger" />
                </ButtonComponent>
              </div>
            ) : (
              <Button
                key={idx}
                color="danger"
                variant="flat"
                onClick={() => {
                  setOrderSelected({
                    type: 'cancel',
                    id: orders.id
                  })
                  handleCancelOrderModal.onOpen()
                }}
              >
                Cancelar
              </Button>
            )
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
            details: ''
          }
        }
      />
    </>
  )
}

export default Orders
