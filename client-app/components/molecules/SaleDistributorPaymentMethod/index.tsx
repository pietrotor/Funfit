import IconSelector from '@/components/atoms/IconSelector'
import { TDistributorSalePaymentMethodData } from '@/components/atoms/modals/SaleDistributorModal'
import { DistributorSalePaymentMethod } from '@/graphql/graphql-types'

type SalePaymentMethodProps = {
  setPayment: (payment: TDistributorSalePaymentMethodData) => void
  total: number
}

function SaleDistributorPaymentMethod({
  setPayment,
  total
}: SalePaymentMethodProps) {
  return (
    <section className="flex flex-col">
      <div className="flex items-center justify-center">
        <hr className="flex-grow border-b-1 border-gray-200" />
        <p className="text-thin mx-1 text-center text-gray-500">
          Método de pago
        </p>
        <hr className="flex-grow border-b-1 border-gray-200" />
      </div>

      <div className="grid grid-cols-2 gap-14 p-6 px-10">
        <span
          className=" border-gray flex cursor-pointer flex-col items-center justify-center border-2 p-3 text-secondary/80 hover:border-secondary/40 hover:text-secondary"
          onClick={() =>
            setPayment({
              paymentMethod: DistributorSalePaymentMethod.CASH,
              cash: total,
              balance: 0
            })
          }
        >
          <IconSelector name="Bill" width="w-8" />
          <h3 className="text-sm font-semibold  text-gray-500 md:text-lg">
            Contado
          </h3>
        </span>
        <span
          className="border-gray flex cursor-pointer flex-col items-center justify-center border-2 p-3 text-secondary/80 hover:border-secondary/40 hover:text-secondary"
          onClick={() =>
            setPayment({
              paymentMethod: DistributorSalePaymentMethod.CREDIT,
              cash: 0,
              balance: total
            })
          }
        >
          <IconSelector name="Recipe" width="w-8" />
          <h3 className="text-sm font-semibold text-gray-500 md:text-lg">
            Crédito
          </h3>
        </span>
      </div>
    </section>
  )
}

export default SaleDistributorPaymentMethod
