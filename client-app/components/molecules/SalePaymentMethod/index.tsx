import { ReactNode } from 'react'
import { Banknote, CircleDollarSign, QrCode } from 'lucide-react'
import clsx from 'clsx'
import VendisLogo from '@/components/atoms/VendisLogo'
import {
  CardBrands,
  PedidosYaLogo
} from '@/components/atoms/paymentBrands'
import { TSalePaymentMethodData } from '@/components/atoms/modals/SaleModal'
import {
  CARD_FEE_RATE,
  formatFeeRate,
  VENDIS_FEE_RATE
} from '@/utils/paymentFees'

type SalePaymentMethodProps = {
  setPayment: (payment: TSalePaymentMethodData) => void
}

type MethodTileProps = {
  label: string
  hint?: string
  onClick: () => void
  children: ReactNode
}

function MethodTile({ label, hint, onClick, children }: MethodTileProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-[96px] flex-col items-center justify-center gap-2 rounded-2xl border border-stone-200 bg-white px-2 py-3 text-center transition-colors hover:border-secondary hover:bg-secondary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:min-h-[108px] sm:px-3 sm:py-4"
    >
      <span className="flex h-10 items-center justify-center">{children}</span>
      <span>
        <span className="block text-sm font-semibold text-tertiary">{label}</span>
        {hint && (
          <span className="mt-0.5 block text-[11px] font-medium text-secondary-darken">
            {hint}
          </span>
        )}
      </span>
    </button>
  )
}

function SalePaymentMethod({ setPayment }: SalePaymentMethodProps) {
  return (
    <section className="px-4 pb-2 pt-1 md:px-6">
      <div className="mb-4 flex items-center gap-3">
        <span className="h-px flex-1 bg-stone-200" />
        <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">
          Método de pago
        </p>
        <span className="h-px flex-1 bg-stone-200" />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <MethodTile
          label="Efectivo"
          onClick={() =>
            setPayment({ paymentMethod: 'cash', cash: 0, change: 0 })
          }
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/25 text-secondary-darken">
            <Banknote className="h-5 w-5" strokeWidth={1.75} />
          </span>
        </MethodTile>

        <MethodTile
          label="Tarjeta"
          hint={`${formatFeeRate(CARD_FEE_RATE)} de descuento`}
          onClick={() =>
            setPayment({ paymentMethod: 'card', cash: 0, change: 0 })
          }
        >
          <CardBrands className="h-8" />
        </MethodTile>

        <MethodTile
          label="QR o transferencia"
          onClick={() =>
            setPayment({ paymentMethod: 'qr', cash: 0, change: 0 })
          }
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-100 text-stone-600">
            <QrCode className="h-5 w-5" strokeWidth={1.75} />
          </span>
        </MethodTile>

        <MethodTile
          label="Vendis"
          hint={`${formatFeeRate(VENDIS_FEE_RATE)} de descuento`}
          onClick={() =>
            setPayment({ paymentMethod: 'vendis', cash: 0, change: 0 })
          }
        >
          <VendisLogo className="h-8" />
        </MethodTile>

        <MethodTile
          label="PedidosYa"
          onClick={() =>
            setPayment({
              paymentMethod: 'pedidosya',
              cash: 0,
              change: 0,
              entersCash: false
            })
          }
        >
          <PedidosYaLogo className="h-9" />
        </MethodTile>

        <MethodTile
          label="Otros"
          onClick={() =>
            setPayment({
              paymentMethod: 'other',
              cash: 0,
              change: 0,
              entersCash: false
            })
          }
        >
          <span
            className={clsx(
              'flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary-600'
            )}
          >
            <CircleDollarSign className="h-5 w-5" strokeWidth={1.75} />
          </span>
        </MethodTile>
      </div>
    </section>
  )
}

export default SalePaymentMethod
