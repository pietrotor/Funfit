import { Button, Chip, useDisclosure } from '@nextui-org/react'
import { useState } from 'react'
// import { useRouter } from 'next/router'
import ButtonComponent from '@/components/atoms/Button'
import DateConverter from '@/components/atoms/DateConverter'
import IconSelector from '@/components/atoms/IconSelector'
import Table from '@/components/organisms/tableNext/Table'
import {
  useCustomGetOrdersPaginated
} from '@/hooks/UseOrderQuery'
import { useAppSelector } from '@/store/index'
import ProductListModal from '@/components/atoms/modals/ProductListModal'
import { TSaleProduct } from '@/interfaces/TData'

interface OrdersProps {
  ordersAcepted: boolean | undefined
}

const Orders = ({ ordersAcepted }: OrdersProps) => {
  // const { handleAcceptOrder } = useCustomAcceptOrder()
  const handleProductsListModal = useDisclosure()
  const [products, setProducts] = useState<TSaleProduct[]>([])
  // const router = useRouter()
  const currentBranch = useAppSelector(
    state => state.branchReducer.currentBranch
  )
  const { data, loading, setFilter, setVariables, variables } =
    useCustomGetOrdersPaginated(currentBranch.id, false)

  const handleChangeRow = (row: number) => {
    console.log(row)
    setVariables({ ...variables, rows: row, currentPage: 1 })
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
          { name: 'Tipo de pago' },
          { name: 'Tipo de envío' },
          { name: 'Estado del pedido' },
          { name: 'Fecha de orden' },
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
            <div key={idx} className=" flex justify-center  ">
              {orders.products.length > 3 ? (
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
                  <p
                    key={idx}
                    className="m-auto mt-1 w-fit rounded-full bg-blue-100 px-2 py-1 text-sm font-semibold text-blue-600"
                  >
                    {product.product?.name}
                  </p>
                ))
              )}
            </div>,
            <div key={idx} className="text-left text-sm">
              {orders.paymentMethod === 'CASH' ? 'Efectivo' : orders.paymentMethod === 'CARD' ? 'Tarjeta' : 'Transferencia'}
            </div>,
            <div key={idx} className="text-left text-sm">
              {orders.deliveryMethod === 'PICKUP' ? 'Recojo en sucursal' : 'Envío a domicilio'}
            </div>,
            <Chip
              key={idx}
              variant="flat"
              className="text-center text-sm"
              color={orders.orderAcepted ? 'secondary' : 'danger'}
            >
              {orders.orderAcepted ? 'Aceptada' : 'Pendiente'}
            </Chip>,
            <div key={idx} className="w-[6rem] text-xs md:w-full">
              <DateConverter showTime dateString={orders.date} />
            </div>,
            <div key={idx} className="text-center text-sm">
              Bs. {orders.subTotal}
            </div>,
            <div key={idx} className="text-center text-sm">
              Bs. {orders.total}
            </div>,
            !orders.orderAcepted ? (
              <div key={idx} className="space-x-2">
                <ButtonComponent
                  showTooltip
                  tooltipText="Aceptar pedido"
                  type="eye"
                  isIconOnly
                >
                  <IconSelector name="checked" color="text-secondary" />
                </ButtonComponent>
                <ButtonComponent
                  showTooltip
                  tooltipText="Rechazar pedido"
                  type="delete"
                  onClick={() => console.log('Rechazar pedido')}
                  isIconOnly
                >
                  <IconSelector name="close" color="text-danger" />
                </ButtonComponent>
              </div>
            ) : (
              <Button key={idx} color="danger" variant="flat">
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
    </>
  )
}

export default Orders
