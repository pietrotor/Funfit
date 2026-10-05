import IconSelector from '@/components/atoms/IconSelector'
import { TSalePaymentMethodData } from '@/components/atoms/modals/SaleModal'

type SalePaymentMethodProps = {
  setPayment: (payment: TSalePaymentMethodData) => void
}

function SalePaymentMethod({ setPayment }: SalePaymentMethodProps) {
  return (
    <section className="flex flex-col">
      <div className="flex items-center justify-center">
        <hr className="flex-grow border-b-1 border-gray-200" />
        <p className="text-thin mx-1 text-center text-gray-500">
          Método de pago
        </p>
        <hr className="flex-grow border-b-1 border-gray-200" />
      </div>

      <div className="grid grid-cols-3 gap-6 p-6 px-10 md:gap-10">
        <span
          className=" border-gray flex cursor-pointer flex-col items-center justify-center border-2 p-3 text-secondary/80 hover:border-secondary/40 hover:text-secondary"
          onClick={() =>
            setPayment({ paymentMethod: 'cash', cash: 0, change: 0 })
          }
        >
          <IconSelector name="Bill" width="w-8" />
          <h3 className="md:text-lg text-sm  font-semibold text-gray-500">Efectivo</h3>
        </span>
        <span
          className="border-gray flex cursor-pointer flex-col items-center justify-center border-2 p-3 text-secondary/80 hover:border-secondary/40 hover:text-secondary"
          onClick={() =>
            setPayment({ paymentMethod: 'card', cash: 0, change: 0 })
          }
        >
          <IconSelector name="Card" width="w-8" />
          <h3 className="md:text-lg text-sm font-semibold text-gray-500">Tarjeta</h3>
          <p className='md:text-xs text-tiny text-center'> 2% de descuento</p>
        </span>
        <span
          className="border-gray flex cursor-pointer flex-col items-center justify-center border-2 p-3 text-secondary/80 hover:border-secondary/40 hover:text-secondary"
          onClick={() =>
            setPayment({ paymentMethod: 'qr', cash: 0, change: 0 })
          }
        >
          <IconSelector name="Qr" width="w-8" />
          <h3 className="text-center md:text-lg text-xs  font-semibold text-gray-500">
            QR o transferencia
          </h3>
        </span>
        <span
          className="border-gray flex cursor-pointer flex-col items-center justify-center border-2 p-3 text-secondary/80 hover:border-secondary/40 hover:text-secondary"
          onClick={() =>
            setPayment({
              paymentMethod: 'pedidosya',
              cash: 0,
              change: 0,
              entersCash: false
            })
          }
        >
          <IconSelector name="Truck" width="w-8" />
          <h3 className="text-center md:text-lg text-xs font-semibold text-gray-500">
            PedidosYa
          </h3>
        </span>
        <span
          className="border-gray flex cursor-pointer flex-col items-center justify-center border-2 p-3 text-secondary/80 hover:border-secondary/40 hover:text-secondary"
          onClick={() =>
            setPayment({
              paymentMethod: 'other',
              cash: 0,
              change: 0,
              entersCash: false
            })
          }
        >
          <IconSelector name="Payment" width="w-8" />
          <h3 className="text-center md:text-lg text-xs font-semibold text-gray-500">
            Otros
          </h3>
        </span>
      </div>
    </section>
  )
}

export default SalePaymentMethod
