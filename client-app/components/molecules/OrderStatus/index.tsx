import clsx from 'clsx'
import IconSelector, { TSvgNames } from '@/components/atoms/IconSelector'
import { OrderStatusEnum } from '@/graphql/graphql-types'

type OrderStatusProps = {
  status: OrderStatusEnum
}

const OrderStatus = ({ status }: OrderStatusProps) => {
  const ORDER_STYLES: Record<
    OrderStatusEnum,
    { icon: TSvgNames; className: HTMLElement['className']; label: string }
  > = {
    [OrderStatusEnum.PENDING]: {
      icon: 'Clock',
      className: 'text-yellow-400 border-yellow-400 bg-yellow-100',
      label: 'Pendiente'
    },
    [OrderStatusEnum.ACEPTED]: {
      icon: 'check',
      className: 'text-blue-400 border-blue-400 bg-blue-100',
      label: 'Aceptado'
    },
    [OrderStatusEnum.SOLD]: {
      icon: 'cart',
      className: 'text-orange-400 border-orange-400 bg-orange-100',
      label: 'Vendido'
    },
    [OrderStatusEnum.DELIVERED]: {
      icon: 'Truck',
      className: 'text-green-400 border-green-400 bg-green-100',
      label: 'Entregado'
    },
    [OrderStatusEnum.REJECTED]: {
      icon: 'close',
      className: 'text-red-400 border-red-400 bg-red-100',
      label: 'Rechazado'
    }
  }
  return (
    <div
      className={clsx(
        'm-auto flex w-fit items-center gap-1 rounded-[4px] border-2 px-2 py-1',
        ORDER_STYLES[status].className
      )}
    >
      <IconSelector name={ORDER_STYLES[status].icon} width="w-5" height="h-5" />
      <p className="font-bold text-inherit">{ORDER_STYLES[status].label}</p>
    </div>
  )
}

export default OrderStatus
