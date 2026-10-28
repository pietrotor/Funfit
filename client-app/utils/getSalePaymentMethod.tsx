import { Banknote, CircleDollarSign, QrCode } from 'lucide-react'
import VendisLogo from '@/components/atoms/VendisLogo'
import { CardBrands, PedidosYaLogo } from '@/components/atoms/paymentBrands'
import { PaymentMethodEnum } from '@/graphql/graphql-types'

export const getSalePaymentMethod = (paymentMethod: PaymentMethodEnum) => {
  switch (paymentMethod) {
    case PaymentMethodEnum.CARD:
      return {
        icon: <CardBrands className="h-5" />,
        text: 'Tarjeta'
      }
    case PaymentMethodEnum.QR_TRANSFER:
      return {
        icon: <QrCode className="h-4 w-4" strokeWidth={1.75} />,
        text: 'QR'
      }
    case PaymentMethodEnum.VENDIS:
      return {
        icon: <VendisLogo className="h-4" />,
        text: 'Vendis'
      }
    case PaymentMethodEnum.PEDIDOS_YA:
      return {
        icon: <PedidosYaLogo className="h-4" />,
        text: 'PedidosYa'
      }
    case PaymentMethodEnum.OTHER:
      return {
        icon: <CircleDollarSign className="h-4 w-4" strokeWidth={1.75} />,
        text: 'Otros'
      }
    case PaymentMethodEnum.CASH:
    default:
      return {
        icon: <Banknote className="h-4 w-4" strokeWidth={1.75} />,
        text: 'Efectivo'
      }
  }
}
