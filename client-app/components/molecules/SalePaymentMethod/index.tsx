import IconSelector from '@/components/atoms/IconSelector'

type SalePaymentMethodProps = {
  currentStep: number
  setCurrentStep: (step: number) => void
}

function SalePaymentMethod({
  currentStep,
  setCurrentStep
}: SalePaymentMethodProps) {
  return (
    <section className="flex flex-col p-4">
      <div className="flex items-center justify-center">
        <hr />
        <h3 className="text-gray-500">Método de pago</h3>
        <hr />
      </div>
      <div className="grid grid-cols-3 gap-10 p-4">
        <span
          className="border-gray flex cursor-pointer flex-col items-center justify-center border-2 p-3 text-secondary hover:text-primary"
          onClick={() => setCurrentStep(2)}
        >
          <IconSelector name="Bill" width="w-8" />
          <h3 className="text-gray-500">Efectivo</h3>
        </span>
        <span
          className="border-gray flex cursor-pointer flex-col items-center justify-center border-2 p-3 text-secondary hover:text-primary"
          onClick={() => setCurrentStep(3)}
        >
          <IconSelector name="Card" width="w-8" />
          <h3 className="text-gray-500">Tarjeta</h3>
        </span>
        <span
          className="border-gray flex cursor-pointer flex-col items-center justify-center border-2 p-3 text-secondary hover:text-primary"
          onClick={() => setCurrentStep(4)}
        >
          <IconSelector name="Qr" width="w-8" />
          <h3 className="text-gray-500">Pago por QR</h3>
        </span>
        <span
          className="border-gray flex cursor-pointer flex-col items-center justify-center border-2 p-3 text-secondary hover:text-primary"
          onClick={() => setCurrentStep(5)}
        >
          <IconSelector name="Payment" width="w-8" />
          <h3 className="text-gray-500">Combinado</h3>
        </span>
      </div>
    </section>
  )
}

export default SalePaymentMethod
