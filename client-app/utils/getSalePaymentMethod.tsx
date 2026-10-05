import IconSelector from '@/components/atoms/IconSelector'
import { PaymentMethodEnum } from '@/graphql/graphql-types'

export const getSalePaymentMethod = (paymentMethod: PaymentMethodEnum) => {
  switch (paymentMethod) {
    case PaymentMethodEnum.CARD:
      return {
        icon: <IconSelector name="CreditCard" />,
        text: 'Tarjeta'
      }
    case PaymentMethodEnum.QR_TRANSFER:
      return {
        icon: <IconSelector name="QrCode" />,
        text: 'QR'
      }
    case PaymentMethodEnum.PEDIDOS_YA:
      return {
        icon: <IconSelector name="Truck" />,
        text: 'PedidosYa'
      }
    case PaymentMethodEnum.OTHER:
      return {
        icon: <IconSelector name="Payment" />,
        text: 'Otros'
      }
    case PaymentMethodEnum.CASH:
    default:
      return {
        icon: <IconSelector name="Cash" />,
        text: 'Efectivo'
      }
  }
}
